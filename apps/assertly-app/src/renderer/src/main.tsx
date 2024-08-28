import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import './App.css'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import PublicLayout from './PublicLayout'
import SettingsLayout from './pages/Settings/SettingsLayout'
import TestSpec from './pages/TestSpecs/TestSpec/TestSpec'
import PrivateLayout from './PrivateLayout'
import ApplicationWithSidebarLayout from './ApplicationWithSidebarLayout'
import AppLayout from './AppLayout'
import TestRuns from './pages/TestRuns/TestRuns'
import Explore from './pages/Explore/Explore'
import Knowledge from './pages/Knowledge/Knowledge'
import TestSpecs from './pages/TestSpecs/TestSpecs'
import SessionRecordings from './pages/SessionRecordings/SessionRecordings'
import Account from './pages/Projects/Settings/Account/Account'
import TeamMembers from './pages/Projects/Settings/TeamMembers/TeamMembers'
import Integrations from './pages/Projects/Settings/Integrations/Integrations'
import Environments from './pages/Environments/Environments'
import TestSuits from './pages/TestSuits/TestSuits'
import Analytics from './pages/Analytics/Analytics'

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
                element: <Navigate to="tests" />
              },
              {
                path: '/dashboard',
                element: <Explore />
              },
              {
                path: '/tests',
                element: <TestSpecs />
              },
              {
                path: '/test-suits',
                element: <TestSuits />
              },
              {
                path: '/runs',
                element: <TestRuns />
              },
              {
                path: '/analytics',
                element: <Analytics />
              },
              {
                path: '/session-recordings',
                element: <SessionRecordings />
              },
              {
                path: '/environments',
                element: <Environments />
              },
              {
                path: '/knowledge',
                element: <Knowledge />
              },
              {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                  {
                    path: 'account',
                    element: <Account />
                  },
                  {
                    path: 'team-members',
                    element: <TeamMembers />
                  },
                  {
                    path: 'integrations',
                    element: <Integrations />
                  }
                ]
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
