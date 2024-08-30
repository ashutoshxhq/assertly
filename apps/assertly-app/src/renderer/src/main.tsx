import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import './App.css'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import PublicLayout from './PublicLayout'
import TestSpec from './pages/TestSpecs/TestSpec/TestSpec'
import PrivateLayout from './PrivateLayout'
import ApplicationWithSidebarLayout from './ApplicationWithSidebarLayout'
import AppLayout from './AppLayout'
import TestRuns from './pages/TestRuns/TestRuns'
import Explore from './pages/Explore/Explore'
import Knowledge from './pages/Knowledge/Knowledge'
import TestSpecs from './pages/TestSpecs/TestSpecs'
import SessionRecordings from './pages/SessionRecordings/SessionRecordings'
import Environments from './pages/Environments/Environments'
import TestSuits from './pages/TestSuits/TestSuits'
import Analytics from './pages/Analytics/Analytics'
import ProjectSettingsLayout from './pages/Projects/Settings/ProjectSettingsLayout'
import SettingsLayout from './pages/Settings/SettingsLayout'
import Projects from './pages/Projects/Projects'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <PrivateLayout />,
        children: [
          {
            path: '/',
            element: <ApplicationWithSidebarLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to="projects" />
              },
              {
                path: '/projects',
                element: <Projects />
              },
              {
                path: 'projects/:projectId/dashboard',
                element: <Explore />
              },
              {
                path: 'projects/:projectId/tests',
                element: <TestSpecs />
              },
              {
                path: 'projects/:projectId/test-suits',
                element: <TestSuits />
              },
              {
                path: 'projects/:projectId/runs',
                element: <TestRuns />
              },
              {
                path: 'projects/:projectId/analytics',
                element: <Analytics />
              },
              {
                path: 'projects/:projectId/session-recordings',
                element: <SessionRecordings />
              },
              {
                path: 'projects/:projectId/environments',
                element: <Environments />
              },
              {
                path: 'projects/:projectId/knowledge',
                element: <Knowledge />
              },

              {
                path: 'projects/:projectId/settings',
                element: <ProjectSettingsLayout />,
                children: [
                  {
                    path: '',
                    element: <ProjectSettingsLayout />
                  },
                  {
                    path: 'api-keys',
                    element: <ProjectSettingsLayout />
                  },
                  {
                    path: 'notifications',
                    element: <ProjectSettingsLayout />
                  }
                ]
              },
              {
                path: 'settings',
                element: <SettingsLayout />,
                children: []
              }
            ]
          },
          {
            path: 'specs/:specId',
            element: <TestSpec />
          }
        ]
      },
      {
        path: '/auth/',
        element: <PublicLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
