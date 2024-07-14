import React from "react";
import ReactDOM from "react-dom/client";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import "./globals.css";
import "./App.css";
import TestSpecs from "./pages/TestSpecs/TestSpecs";
import TestRuns from "./pages/TestRuns/TestRuns";
import Account from "./pages/Settings/Account/Account";
import Integrations from "./pages/Settings/Integrations/Integrations";
import TeamMembers from "./pages/Settings/TeamMembers/TeamMembers";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import PublicLayout from "./PublicLayout";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import Artifacts from "./pages/Artifacts/Artifacts";
import ApiKeys from "./pages/ApiKeys/ApiKeys";
import UserFlows from "./pages/UserFlows/UserFlows";
import TestSpec from "./pages/TestSpecs/TestSpec/TestSpec";
import PrivateLayout from "./PrivateLayout";
import ApplicationWithSidebarLayout from "./ApplicationWithSidebarLayout";

const router = createBrowserRouter([
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
                        element: <Navigate to="specs" />,
                    },
                    {
                        path: "specs",
                        element: <TestSpecs />,
                    },
                    {
                        path: "runs",
                        element: <TestRuns />,
                    },
                    {
                        path: "user-flows",
                        element: <UserFlows />,
                    },
                    {
                        path: "artifacts",
                        element: <Artifacts />,
                    },
                    {
                        path: "api-keys",
                        element: <ApiKeys />,
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
                path: "specs/:specid",
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
