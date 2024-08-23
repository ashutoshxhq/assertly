import { app, shell, BrowserWindow, ipcMain, Menu, PopupOptions, WebContentsView } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { chromium, Page } from 'playwright-core'
import http from 'http'
import portfinder from 'portfinder'
import { v4 as uuidv4 } from 'uuid'
import { Browser } from 'playwright'

type BrowserInfo = {
  Browser: string
  'Protocol-Version': string
  'User-Agent': string
  'V8-Version': string
  'WebKit-Version': string
  webSocketDebuggerUrl: string
}

let mainWindow: BrowserWindow
let previewWindow: WebContentsView | null = null

const initialize = async (port = 0): Promise<void> => {
  if (app.isReady()) {
    throw new Error('Must be called at startup before the electron app is ready.')
  }

  const actualPort = port === 0 ? await portfinder.getPortPromise() : port
  app.commandLine.appendSwitch('remote-debugging-port', `${actualPort}`)
  app.commandLine.appendSwitch('remote-debugging-address', '127.0.0.1')

  const electronMajor = parseInt(app.getVersion().split('.')[0], 10)
  if (electronMajor >= 7) {
    app.commandLine.appendSwitch('enable-features', 'NetworkService')
  }
}

const readJson = async (port: string): Promise<BrowserInfo> =>
  new Promise((resolve, reject) => {
    let json = ''
    const request = http.request(
      {
        host: '127.0.0.1',
        path: '/json/version',
        port
      },
      (response) => {
        response.on('error', reject)
        response.on('data', (chunk: Buffer) => {
          json += chunk.toString()
        })
        response.on('end', () => resolve(JSON.parse(json)))
      }
    )
    request.on('error', reject)
    request.end()
  })

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    titleBarStyle: 'hidden',
    backgroundColor: '#2e2c29',
    trafficLightPosition: { x: 10, y: 10 }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  setupPlaywright().catch((e) => console.error(e))
}

const createPreviewWindow = (): void => {
  if (previewWindow) return

  previewWindow = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  mainWindow.contentView.addChildView(previewWindow)

  setupContextMenu(mainWindow, previewWindow)
  updatePreviewWindowBounds(mainWindow, previewWindow)

  mainWindow.on('resize', () => {
    if (previewWindow) {
      updatePreviewWindowBounds(mainWindow, previewWindow)
    }
  })

  previewWindow.webContents.loadURL('about:blank')
}

const removePreviewWindow = (): void => {
  if (previewWindow) {
    mainWindow.contentView.removeChildView(previewWindow)
    previewWindow = null
  }
}

const togglePreviewWindow = (show: boolean): void => {
  if (show) {
    createPreviewWindow()
  } else {
    removePreviewWindow()
  }
}

const setupContextMenu = (mainWindow: BrowserWindow, previewWindow: WebContentsView): void => {
  let rightClickPosition: { x: number; y: number } | null = null

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Inspect Element',
      click: (): void => {
        if (rightClickPosition) {
          previewWindow.webContents.inspectElement(rightClickPosition.x, rightClickPosition.y)
        }
      }
    }
  ])

  previewWindow.webContents.on('context-menu', (_, params) => {
    rightClickPosition = { x: params.x, y: params.y }
    const previewBounds = previewWindow.getBounds()
    const popupOptions: PopupOptions = {
      window: mainWindow,
      x: previewBounds.x + params.x,
      y: previewBounds.y + params.y
    }
    contextMenu.popup(popupOptions)
  })
}

const updatePreviewWindowBounds = (mainWindow: BrowserWindow, previewWindow: WebContentsView): void => {
  const { width, height } = mainWindow.getBounds()
  const desiredWidth = 1512
  const desiredHeight = 982
  const scaleFactor = Math.min((width * 2) / 3 / desiredWidth, height / desiredHeight)

  previewWindow.setBounds({ x: width / 3, y: 0, width: (width * 2) / 3, height })
  previewWindow.webContents.setZoomFactor(scaleFactor)
}

const setupPlaywright = async (): Promise<void> => {
  try {
    const port = app.commandLine.getSwitchValue('remote-debugging-port')
    if (!port) {
      throw new Error('The electron application was not setup to listen on a port. Was `initialize` called at startup?')
    }

    const json: BrowserInfo = await readJson(port)

    if (!json.webSocketDebuggerUrl) {
      throw new Error('The electron application was not setup to listen on a port. Was `initialize` called at startup?')
    }

    const browser = await chromium.connectOverCDP(json.webSocketDebuggerUrl)
    // Find the page that corresponds to our previewWindow
    if (!previewWindow) {
      throw new Error('Preview window not found')
    }

    const playwrightPage = await getPlaywrightPage(browser, previewWindow)

    if (playwrightPage) {
      // Now you can use playwrightPage to control the WebContentsView
      await playwrightPage.goto('https://www.google.com')
      await playwrightPage.waitForTimeout(5000)
      await playwrightPage.goto('https://richpanel.com')
    } else {
      console.error('Failed to find the preview window page')
    }
    console.log('Playwright setup complete')
  } catch (e) {
    console.error('Error in setupPlaywright:', e)
  }
}

const getPlaywrightPage = async (browser: Browser, window: WebContentsView): Promise<Page | null> => {
  const guid = uuidv4()
  await window.webContents.executeJavaScript(`window.playwright = "${guid}"`)
  const pages = browser.contexts()[0].pages()
  const guids = await Promise.all(
    pages.map(async (testPage: Page) => {
      try {
        return await testPage.evaluate('window.playwright')
      } catch {
        return undefined
      }
    })
  )
  const index = guids.findIndex((testGuid) => testGuid === guid)
  await window.webContents.executeJavaScript('delete window.playwright')
  return pages[index] || null
}

initialize()
  .then(() => {
    app.whenReady().then(() => {
      electronApp.setAppUserModelId('com.electron')

      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      ipcMain.on('toggle-preview', (_, show: boolean) => {
        togglePreviewWindow(show)
      })

      createWindow()

      app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })
  })
  .catch((error) => {
    console.error('Failed to initialize:', error)
    app.quit()
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', async () => {
  if (previewWindow) {
    const browser = await chromium.connectOverCDP(app.commandLine.getSwitchValue('remote-debugging-port'))
    const page = await getPlaywrightPage(browser, previewWindow)
    if (page) {
      await page.context().browser()?.close()
    }
  }
})
