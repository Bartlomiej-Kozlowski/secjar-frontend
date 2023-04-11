import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import IsLoggedInProvider from "./contexts/IsLoggedInContext"
import AccountActivationPage from "./pages/AccountActivationPage"
import EmailConfirmationPage from "./pages/AccountEmailConfirmPage"
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage"
import DashboardTab from "./pages/AdminPanelPage/Tabs/DashboardTab"
import DiskManagementTab from "./pages/AdminPanelPage/Tabs/DiskManagementTab"
import SubmissionManagementTab from "./pages/AdminPanelPage/Tabs/SubmissionManagementTab"
import UserManagementTab from "./pages/AdminPanelPage/Tabs/UserManagementTab"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import ConfirmPasswordReset from "./pages/PasswordResetPages/ConfirmPasswordResetPage"
import PasswordResetPage from "./pages/PasswordResetPages/PasswordResetPage"
import RootPage from "./pages/RootPage"
import SupportPage from "./pages/SupportPage"
import DeletedFilesTab from "./pages/UserPanelPage/Tabs/DeletedFilesTab"
import FavoriteFilesTab from "./pages/UserPanelPage/Tabs/FavoriteFilesTab"
import SharedFilesTab from "./pages/UserPanelPage/Tabs/SharedFilesTab"
import UploadedFilesTab from "./pages/UserPanelPage/Tabs/UploadedFilesTab"
import UserSettingsTab from "./pages/UserPanelPage/Tabs/UserSettingsTab"
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
            {
                path: "/home",
                element: <UserPanelPage />,
                children: [
                    {
                        path: "uploaded",
                        element: <UploadedFilesTab />,
                    },
                    {
                        path: "favorite",
                        element: <FavoriteFilesTab />,
                    },
                    {
                        path: "deleted",
                        element: <DeletedFilesTab />,
                    },
                    {
                        path: "shared",
                        element: <SharedFilesTab />,
                    },
                    {
                        path: "settings",
                        element: <UserSettingsTab />,
                    },
                ],
            },
            {
                path: "/adminPanel",
                element: <AdminPanelPage />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardTab />,
                    },
                    {
                        path: "disk",
                        element: <DiskManagementTab />,
                    },
                    {
                        path: "supportSubmissions",
                        element: <SubmissionManagementTab />,
                    },
                    {
                        path: "users",
                        element: <UserManagementTab />,
                    },
                ],
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/support",
        element: <SupportPage />,
    },
    {
        path: "/passwordReset",
        element: <PasswordResetPage />,
    },
    {
        path: "/passwordReset/confirm",
        element: <ConfirmPasswordReset />,
    },
    {
        path: "/activateAccount",
        element: <AccountActivationPage />,
    },
    {
        path: "/confirmEmail",
        element: <EmailConfirmationPage />,
    },
])

const App: React.FC = () => {
    return (
        <IsLoggedInProvider>
            <RouterProvider router={router} />
        </IsLoggedInProvider>
    )
}

export default App
