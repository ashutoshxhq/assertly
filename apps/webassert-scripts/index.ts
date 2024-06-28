import puppeteer, { Browser, Page } from 'puppeteer';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
  organization: 'org-aER1YmLRN8cGIeVSrMpziP2Q',
});

interface Action {
    name: string;
    parameters: {
        [key: string]: any;
    };
}

interface ExecutionContext {
    actions: Action[];
}

executeAction
async function executeAction(page: Page, action: Action){
    try {
        switch (action.name) {
            // Browser and Page Control
            case 'browser_newPage':
                return await page.browser().newPage();
            case 'page_goto':
                await page.goto(action.parameters.url, action.parameters.options);
                break;
            case 'browser_close':
                await page.browser().close();
                break;
            case 'page_setViewport':
                await page.setViewport(action.parameters.viewport);
                break;
            case 'page_emulate':
                await page.emulate(action.parameters.options);
                break;

            // Element Interaction
            case 'page_waitForSelector':
                await page.waitForSelector(action.parameters.selector, action.parameters.options);
                break;
            case 'page_querySelector':
                return await page.$(action.parameters.selector);
            case 'page_querySelectorAll':
                return await page.$$(action.parameters.selector);
            case 'page_click':
                await page.click(action.parameters.selector, action.parameters.options);
                break;
            case 'page_focus':
                await page.focus(action.parameters.selector);
                break;
            case 'page_hover':
                await page.hover(action.parameters.selector);
                break;
            case 'page_type':
                await page.type(action.parameters.selector, action.parameters.text, action.parameters.options);
                break;
            case 'page_select':
                await page.select(action.parameters.selector, ...action.parameters.values);
                break;

            // Keyboard and Mouse Simulation
            case 'page_keyboard_press':
                await page.keyboard.press(action.parameters.key, action.parameters.options);
                break;
            case 'page_keyboard_type':
                await page.keyboard.type(action.parameters.text, action.parameters.options);
                break;
            case 'page_keyboard_down':
                await page.keyboard.down(action.parameters.key, action.parameters.options);
                break;
            case 'page_keyboard_up':
                await page.keyboard.up(action.parameters.key);
                break;
            case 'page_mouse_click':
                await page.mouse.click(action.parameters.x, action.parameters.y, action.parameters.options);
                break;
            case 'page_mouse_down':
                await page.mouse.down(action.parameters.options);
                break;
            case 'page_mouse_up':
                await page.mouse.up(action.parameters.options);
                break;
            case 'page_mouse_move':
                await page.mouse.move(action.parameters.x, action.parameters.y, action.parameters.options);
                break;
            case 'page_mouse_wheel':
                await page.mouse.wheel(action.parameters.options);
                break;

            // Utility Functions
            case 'page_screenshot':
                return await page.screenshot(action.parameters.options);
            case 'page_evaluate':
                return await page.evaluate(action.parameters.pageFunction, ...action.parameters.args);
            case 'page_evaluateHandle':
                return await page.evaluateHandle(action.parameters.pageFunction, ...action.parameters.args);
            case 'page_waitForFunction':
                await page.waitForFunction(action.parameters.pageFunction, action.parameters.options, ...action.parameters.args);
            case 'page_waitForNavigation':
                await page.waitForNavigation(action.parameters.options);
                break;
            case 'page_addScriptTag':
                await page.addScriptTag(action.parameters.options);
                break;
            case 'page_addStyleTag':
                await page.addStyleTag(action.parameters.options);
                break;
            case 'page_setJavaScriptEnabled':
                await page.setJavaScriptEnabled(action.parameters.enabled);
                break;
            case 'page_cookies':
                return await page.cookies(...action.parameters.urls);
            case 'page_setUserAgent':
                await page.setUserAgent(action.parameters.userAgent);
                break;
            case 'page_frames':
                return page.frames();
            case 'page_setContent':
                await page.setContent(action.parameters.html);
                break;
            case 'page_accessibility_snapshot':
                return await page.accessibility.snapshot(action.parameters.options);
                break;
            case 'page_waitForFileChooser':
                await page.waitForFileChooser(action.parameters.options);
                break;
            case 'page_touchscreen_tap':
                await page.touchscreen.tap(action.parameters.x, action.parameters.y);
                break;
            case 'page_queryObjects':
                return await page.queryObjects(action.parameters.prototypeHandle);
            case 'page_coverage_startCSSCoverage':
                await page.coverage.startCSSCoverage(action.parameters.options);
                break;
            case 'page_coverage_startJSCoverage':
                await page.coverage.startJSCoverage(action.parameters.options);
                break;
            case 'page_keyboard_sendCharacter':
                await page.keyboard.sendCharacter(action.parameters.char);
                break;
            case 'browser_pages':
                return await page.browser().pages();
            case 'page_on':
                page.on(action.parameters.event, action.parameters.function);
                break;
            case 'page_tracing_start':
                await page.tracing.start(action.parameters.options);
                break;
            case 'page_tracing_stop':
                await page.tracing.stop();
                break;
            case 'page_url':
                return page.url();
            case 'page_viewport':
                return page.viewport();
            case 'page_title':
                return await page.title();
            case 'browser_version':
                return page.browser().version();
            default:
                console.error(`Unsupported action type: ${action.name}`);
                return false;
        }
        return true;
    } catch (error) {
        console.error(`Error handling action ${action.name}: ${error}`);
        return false;
    }
}


async function runTest(executionContext: ExecutionContext) {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();

    for (const action of executionContext.actions) {
        console.log(await executeAction(page, action));
    }

    await browser.close();
}

// Example usage
const testInstructions: ExecutionContext = {
    actions: [
        {
            "name": "page_goto",
            "parameters": {
                "url": "https://www.google.com",
                "options": {
                    "waitUntil": "networkidle2"
                }
            }
        },
        {
            "name": "page_type",
            "parameters": {
                "selector": "textarea[name='q']",
                "text": "OpenAI",
                "options": {
                    "delay": 100
                }
            }
        },
        {
            "name": "page_keyboard_press",
            "parameters": {
                "key": "Enter"
            }
        },
        {
            "name": "page_waitForNavigation",
            "parameters": {}
        },
        {
            "name": "page_screenshot",
            "parameters": {
                options: { path: 'search_results.png' }
            }
        },
    ]
};




runTest(testInstructions).then(() => console.log('Test completed successfully.')).catch(err => console.error(err));

const main = async () => {
    const functions = [
        {
          "type": "function",
          "function": {
            "name": "page_goto",
            "description": "Navigates to a URL.",
            "parameters": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "description": "The URL to navigate page to."
                },
                "options": {
                  "type": "object",
                  "description": "Navigation parameters (optional).",
                  "properties": {
                    "waitUntil": {
                      "type": "string",
                      "enum": ["load", "domcontentloaded", "networkidle0", "networkidle2"],
                      "description": "When to consider navigation succeeded."
                    },
                    "timeout": {
                      "type": "integer",
                      "description": "Maximum navigation time in milliseconds."
                    }
                  }
                }
              },
              "required": ["url"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_click",
            "description": "Simulates a mouse click on a selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element to click."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the click action.",
                  "properties": {
                    "button": {
                      "type": "string",
                      "enum": ["left", "right", "middle"],
                      "description": "Which button to click."
                    },
                    "clickCount": {
                      "type": "integer",
                      "description": "Number of times to click on the element."
                    },
                    "delay": {
                      "type": "integer",
                      "description": "Time to wait between mousedown and mouseup in milliseconds."
                    }
                  }
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_waitForSelector",
            "description": "Waits for an element matching the selector to appear in the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector of an element to wait for."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the wait conditions.",
                  "properties": {
                    "visible": {
                      "type": "boolean",
                      "description": "Wait for the element to be visible."
                    },
                    "hidden": {
                      "type": "boolean",
                      "description": "Wait for the element to be hidden."
                    },
                    "timeout": {
                      "type": "integer",
                      "description": "Maximum time to wait in milliseconds."
                    }
                  }
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "browser_newPage",
            "description": "Creates a new page in the default browser context."
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_goto",
            "description": "Navigates to a URL.",
            "parameters": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "description": "The URL to navigate page to."
                },
                "options": {
                  "type": "object",
                  "description": "Navigation parameters (optional).",
                  "properties": {
                    "waitUntil": {
                      "type": "string",
                      "enum": ["load", "domcontentloaded", "networkidle0", "networkidle2"],
                      "description": "When to consider navigation succeeded."
                    },
                    "timeout": {
                      "type": "integer",
                      "description": "Maximum navigation time in milliseconds."
                    }
                  }
                }
              },
              "required": ["url"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "browser_close",
            "description": "Closes the browser and all of its pages (if any were opened)."
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_setViewport",
            "description": "Sets the viewport of the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "viewport": {
                  "type": "object",
                  "description": "Viewport parameters such as width and height.",
                  "properties": {
                    "width": {
                      "type": "integer",
                      "description": "Viewport width in pixels."
                    },
                    "height": {
                      "type": "integer",
                      "description": "Viewport height in pixels."
                    },
                    "deviceScaleFactor": {
                      "type": "number",
                      "description": "Specify device scale factor (can be thought of as dpr)."
                    },
                    "isMobile": {
                      "type": "boolean",
                      "description": "Whether the meta viewport tag is set to mobile."
                    },
                    "hasTouch": {
                      "type": "boolean",
                      "description": "Specifies whether the page supports touch events."
                    },
                    "isLandscape": {
                      "type": "boolean",
                      "description": "Specifies whether the page is in landscape mode."
                    }
                  },
                  "required": ["width", "height"]
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_emulate",
            "description": "Emulates the specified device settings on the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Device emulation options including userAgent and viewport.",
                  "properties": {
                    "userAgent": {
                      "type": "string",
                      "description": "User agent string to emulate."
                    },
                    "viewport": {
                      "type": "object",
                      "description": "Viewport parameters such as width and height."
                    }
                  }
                }
              },
              "required": ["options"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_waitForSelector",
            "description": "Waits for an element matching the selector to appear in the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector of an element to wait for."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the wait conditions.",
                  "properties": {
                    "visible": {
                      "type": "boolean",
                      "description": "Wait for the element to be visible."
                    },
                    "hidden": {
                      "type": "boolean",
                      "description": "Wait for the element to be hidden."
                    },
                    "timeout": {
                      "type": "integer",
                      "description": "Maximum time to wait in milliseconds."
                    }
                  }
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_querySelector",
            "description": "Runs document.querySelector within the page and returns the first element matching the selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element."
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_querySelectorAll",
            "description": "Runs document.querySelectorAll within the page and returns all elements matching the selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for elements."
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_click",
            "description": "Simulates a mouse click on a selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element to click."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the click action.",
                  "properties": {
                    "button": {
                      "type": "string",
                      "enum": ["left", "right", "middle"],
                      "description": "Which button to click."
                    },
                    "clickCount": {
                      "type": "integer",
                      "description": "Number of times to click on the element."
                    },
                    "delay": {
                      "type": "integer",
                      "description": "Time to wait between mousedown and mouseup in milliseconds."
                    }
                  }
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_focus",
            "description": "Focuses the first element that matches the selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element to focus."
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_hover",
            "description": "Moves the mouse over the center of the element matching the selector.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element to hover over."
                }
              },
              "required": ["selector"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_type",
            "description": "Types text into a focusable element.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for element to type into."
                },
                "text": {
                  "type": "string",
                  "description": "Text to be typed into the element."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the typing action.",
                  "properties": {
                    "delay": {
                      "type": "integer",
                      "description": "Time to wait between key presses in milliseconds."
                    }
                  }
                }
              },
              "required": ["selector", "text"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_select",
            "description": "Selects <option> elements within a <select> element.",
            "parameters": {
              "type": "object",
              "properties": {
                "selector": {
                  "type": "string",
                  "description": "A selector to search for <select> element."
                },
                "values": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Values of the options to select."
                }
              },
              "required": ["selector", "values"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_keyboard_press",
            "description": "Simulates the pressing of a key on the keyboard.",
            "parameters": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "description": "Name of the key to press."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the key press action."
                }
              },
              "required": ["key"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_keyboard_type",
            "description": "Types text through the keyboard_",
            "parameters": {
              "type": "object",
              "properties": {
                "text": {
                  "type": "string",
                  "description": "Text to type via the keyboard_"
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the typing action.",
                  "properties": {
                    "delay": {
                      "type": "integer",
                      "description": "Time to wait between key presses in milliseconds."
                    }
                  }
                }
              },
              "required": ["text"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_keyboard_down",
            "description": "Simulates a key press down event on the keyboard_",
            "parameters": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "description": "Name of the key to hold down."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the key down action."
                }
              },
              "required": ["key"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_keyboard_up",
            "description": "Simulates a key release event on the keyboard_",
            "parameters": {
              "type": "object",
              "properties": {
                "key": {
                  "type": "string",
                  "description": "Name of the key to release."
                }
              },
              "required": ["key"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_mouse_click",
            "description": "Simulates a mouse click event at the specified coordinates.",
            "parameters": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "integer",
                  "description": "The x-coordinate where the click will occur."
                },
                "y": {
                  "type": "integer",
                  "description": "The y-coordinate where the click will occur."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the click action.",
                  "properties": {
                    "button": {
                      "type": "string",
                      "enum": ["left", "right", "middle"],
                      "description": "Which button to click."
                    },
                    "clickCount": {
                      "type": "integer",
                      "description": "Number of times to click at the location."
                    },
                    "delay": {
                      "type": "integer",
                      "description": "Time to wait between mousedown and mouseup in milliseconds."
                    }
                  }
                }
              },
              "required": ["x", "y"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_mouse_down",
            "description": "Simulates a mouse button down event at the current mouse location.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the mouse down action.",
                  "properties": {
                    "button": {
                      "type": "string",
                      "enum": ["left", "right", "middle"],
                      "description": "Which button to hold down."
                    },
                    "clickCount": {
                      "type": "integer",
                      "description": "Number of times to trigger the button down."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_mouse_up",
            "description": "Simulates a mouse button release event at the current mouse location.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the mouse up action."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_mouse_move",
            "description": "Moves the mouse to the specified coordinates.",
            "parameters": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "integer",
                  "description": "The x-coordinate to move the mouse to."
                },
                "y": {
                  "type": "integer",
                  "description": "The y-coordinate to move the mouse to."
                },
                "options": {
                  "type": "object",
                  "description": "Options to modify the mouse move action.",
                  "properties": {
                    "steps": {
                      "type": "integer",
                      "description": "The number of steps in the move."
                    }
                  }
                }
              },
              "required": ["x", "y"]
            }
          }
        },  
        {
          "type": "function",
          "function": {
            "name": "page_mouse_wheel",
            "description": "Simulates a mouse wheel scroll at the current mouse location.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the wheel action.",
                  "properties": {
                    "deltaX": {
                      "type": "integer",
                      "description": "The horizontal scroll amount."
                    },
                    "deltaY": {
                      "type": "integer",
                      "description": "The vertical scroll amount."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_screenshot",
            "description": "Takes a screenshot of the current page_",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Screenshot options such as format and quality.",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["jpeg", "png"],
                      "description": "Type of the screenshot."
                    },
                    "quality": {
                      "type": "integer",
                      "description": "Quality of the image, applicable only to jpeg."
                    },
                    "fullPage": {
                      "type": "boolean",
                      "description": "When true, takes a screenshot of the full scrollable page_"
                    },
                    "clip": {
                      "type": "object",
                      "description": "An object which specifies clipping region of the page_"
                    },
                    "omitBackground": {
                      "type": "boolean",
                      "description": "Hides default white background and allows capturing screenshots with transparency."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_waitForNavigation",
            "description": "Waits for the page to navigate to a new URL or reload.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the navigation waiting behavior.",
                  "properties": {
                    "waitUntil": {
                      "type": "string",
                      "enum": ["load", "domcontentloaded", "networkidle0", "networkidle2"],
                      "description": "When to consider navigation succeeded."
                    },
                    "timeout": {
                      "type": "integer",
                      "description": "Maximum navigation time in milliseconds."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_addScriptTag",
            "description": "Adds a <script> tag to the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Script tag options such as URL or content.",
                  "properties": {
                    "url": {
                      "type": "string",
                      "description": "URL of the external script to add."
                    },
                    "content": {
                      "type": "string",
                      "description": "Script content to add."
                    },
                    "type": {
                      "type": "string",
                      "description": "Type of the script tag."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_addStyleTag",
            "description": "Adds a <style> tag to the page or links an external CSS file.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Style tag options such as URL or content.",
                  "properties": {
                    "url": {
                      "type": "string",
                      "description": "URL of the external CSS to add."
                    },
                    "content": {
                      "type": "string",
                      "description": "CSS content to add."
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_setJavaScriptEnabled",
            "description": "Enables or disables JavaScript execution in the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "enabled": {
                  "type": "boolean",
                  "description": "True to enable JavaScript, false to disable."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_cookies",
            "description": "Returns the cookies visible to the current page_",
            "parameters": {
              "type": "object",
              "properties": {
                "urls": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "URLs for which cookies are visible."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_setUserAgent",
            "description": "Sets the user agent of the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "userAgent": {
                  "type": "string",
                  "description": "User agent string to be used in the page_"
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_frames",
            "description": "Returns an array of all frames attached to the page"
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_setContent",
            "description": "Sets the HTML content of the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "html": {
                  "type": "string",
                  "description": "HTML content to set in the page_"
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_accessibility_snapshot",
            "description": "Captures the current accessibility tree of the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options for the accessibility snapshot."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_waitForFileChooser",
            "description": "Waits for the file chooser dialog to open.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the wait condition."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_touchscreen_tap",
            "description": "Simulates a tap on the touchscreen at the specified coordinates.",
            "parameters": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "integer",
                  "description": "The x-coordinate where the tap will occur."
                },
                "y": {
                  "type": "integer",
                  "description": "The y-coordinate where the tap will occur."
                }
              },
              "required": ["x", "y"]
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_queryObjects",
            "description": "Returns all objects that share a prototype with the given handle.",
            "parameters": {
              "type": "object",
              "properties": {
                "prototypeHandle": {
                  "type": "object",
                  "description": "A handle to the prototype object to query for."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_coverage_startCSSCoverage",
            "description": "Starts gathering CSS usage data.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify CSS coverage tracking."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_coverage_startJSCoverage",
            "description": "Starts gathering JavaScript usage data.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify JS coverage tracking."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_keyboard_sendCharacter",
            "description": "Sends a single character to the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "char": {
                  "type": "string",
                  "description": "Character to send to the page_"
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "browser_pages",
            "description": "Returns an array of all open pages in the browser_"
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_on",
            "description": "Adds an event listener to the page_",
            "parameters": {
              "type": "object",
              "properties": {
                "event": {
                  "type": "string",
                  "description": "Event type to listen for."
                },
                "function": {
                  "type": "string",
                  "description": "Callback function that executes when the event occurs."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_tracing_start",
            "description": "Starts a trace recording.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to modify the trace recording settings."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_tracing_stop",
            "description": "Stops a trace recording.",
            "parameters": {
              "type": "object",
              "properties": {
                "options": {
                  "type": "object",
                  "description": "Options to finalize the trace recording."
                }
              }
            }
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_url",
            "description": "Returns the URL of the current page_"
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_viewport",
            "description": "Returns the viewport settings of the page_"
          }
        },
        {
          "type": "function",
          "function": {
            "name": "page_title",
            "description": "Returns the title of the current page_"
          }
        },
        {
          "type": "function",
          "function": {
            "name": "browser_version",
            "description": "Returns the version of the browser."
          }
        }
    ];

    const systemmessage = `You are a bot designed to automate web interactions based on user commands using Puppeteer. You understand natural language instructions and execute web actions dynamically, streamlining web tasks without requiring users to write code.

Key Features:

Natural Language Processing: You parse user instructions, identifying actions like navigating, clicking, or filling out forms, along with any necessary parameters such as URLs or credentials.

Dynamic Action Execution: Based on the user's commands, you map these instructions to specific Puppeteer actions. This can include opening web pages, interacting with elements, or managing sessions.

You aim to empower users by automating routine web tasks, making their digital interactions more efficient and less prone to errors.

Follow the steps to convert user instruction to actions:
Understand User Intent:
Use natural language processing (NLP) to parse and understand the user’s commands or queries.
You can use a simple keyword-based approach or integrate more sophisticated machine learning models to interpret the intent and parameters of the instructions.

Map Intent to Actions:
Define a set of actions that Puppeteer can perform from the list of actions, like navigating to a page, clicking buttons, filling out forms, etc.
Map the parsed user instructions to these predefined Puppeteer actions and trigger those actions`
    const completion = await openai.chat.completions.create({
      tools: [...functions] as any[],
      model: "gpt-4o",
      messages: [{ role: "system", content: systemmessage }, 
        {role: "user", content: "navigate to google.com, sleect the textarea and type richpanel and then select the link which says richpanel"}],
    });

    console.log(JSON.stringify(completion.choices[0], null, 0))
}

// main()