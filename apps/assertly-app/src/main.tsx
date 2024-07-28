import React from "react";
import ReactDOM from "react-dom/client";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import "./globals.css";
import "./App.css";
import Account from "./pages/Settings/Account/Account";
import Integrations from "./pages/Settings/Integrations/Integrations";
import TeamMembers from "./pages/Settings/TeamMembers/TeamMembers";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import PublicLayout from "./PublicLayout";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import TestSpec from "./pages/Applications/TestSpecs/TestSpec/TestSpec";
import PrivateLayout from "./PrivateLayout";
import ApplicationWithSidebarLayout from "./ApplicationWithSidebarLayout";
import AppLayout from "./AppLayout";
import Applications from "./pages/Applications/Applications";
import Application from "./pages/Applications/Application";
import TestRuns from "./pages/TestRuns/TestRuns";
import Explore from "./pages/Explore/Explore";
import Knowledge from "./pages/Knowledge/Knowledge";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <PrivateLayout />,
                children: [
                    {
                        path: "/",
                        element: <ApplicationWithSidebarLayout />,
                        children: [
                            {
                                path: "/",
                                element: <Navigate to="applications" />,
                            },
                            {
                                path: "/explore",
                                element: <Explore />,
                            },
                            {
                                path: "/applications",
                                element: <Applications />,
                            },
                            {
                                path: "/applications/:applicationId",
                                element: <Application />,
                            },
                            {
                                path: "/runs",
                                element: <TestRuns />,
                            },
                            {
                                path: "/knowledge",
                                element: <Knowledge />,
                            },
                            {
                                path: "settings",
                                element: <SettingsLayout />,
                                children: [
                                    {
                                        path: "account",
                                        element: <Account />,
                                    },
                                    {
                                        path: "team-members",
                                        element: <TeamMembers />,
                                    },
                                    {
                                        path: "integrations",
                                        element: <Integrations />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: "specs/:specId",
                        element: <TestSpec />,
                    },
                ],
            },
            {
                path: "/auth/",
                element: <PublicLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "register",
                        element: <Register />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
