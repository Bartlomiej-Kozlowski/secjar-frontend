import React, { useEffect } from "react"
import { Link, Navigate, Outlet, useOutlet } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../../contexts/IsLoggedInContext"
import UsernamesUuidsMapProvider from "../../contexts/UsernamesUuidsMapContext"
import "../../css/UserPanelPage.css"
import { getFileSystemEntriesInfo } from "../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../ts/interfaces/FileSystemEntryInfoDTO"

export type fileSystemEntriesInfoListContextType = { fileSystemEntriesInfoList: FileSystemEntryInfoDTO[]; refreshFileSystemEntriesInfoList: () => void }

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const outlet = useOutlet()

    const [fileSystemEntriesInfoList, setFileSystemEntriesInfoList] = React.useState<FileSystemEntryInfoDTO[]>([])

    const refreshFileSystemEntriesInfoList = async () => {
        const response = await getFileSystemEntriesInfo()
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfoList(
                response.data.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                })
            )
        }
        //TODO: function to load only uploaded and updated files after refresh??
    }

    useEffect(() => {
        refreshFileSystemEntriesInfoList()
    }, [])

    return (
        <div className="user-panel-page-container">
            <h1>User Panel Page</h1>
            {isUserLoggedIn ? (
                <>
                    <nav>
                        <Link to={"uploaded"}>Przesłane pliki</Link>
                        <Link to={"favorite"}>Ulubione pliki</Link>
                        <Link to={"deleted"}>Usunięte pliki</Link>
                        <Link to={"shared"}>Udostępnione pliki</Link>
                        <Link to={"settings"}>Ustawienia</Link>
                    </nav>

                    <UsernamesUuidsMapProvider>
                        {outlet ? <Outlet context={{ fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList }} /> : <Navigate to={"uploaded"} />}
                    </UsernamesUuidsMapProvider>
                </>
            ) : (
                <h2>
                    You need to <Link to={"/login"}>login</Link> first
                </h2>
            )}
        </div>
    )
}

export default UserPanelPage
