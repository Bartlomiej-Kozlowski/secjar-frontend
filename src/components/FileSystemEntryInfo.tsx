import React, { useState } from "react"
import { useLocation } from "react-router"
import { patchFile } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import formatFileContentType from "../utils/FormatFileContentType"
import { formatFileSize } from "../utils/FormatFileSizeUtil"
import DoubleClickEditText from "./DoubleClickEditText"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup?: () => void
    openFileMovePopup?: (targetFileUuid: string) => void
    openFileSharePopup?: (targetFileUuid: string) => void
    openDirectoryCreatePopup?: (targetDirUuid: string) => void
    setFileUploadDirectory?: (param: string) => void
    handleFileDelete: (fileUuid: string, instantDelete: boolean) => void
    handleFileFavoriteToggle: (fileUuid: string, isFavorite: boolean) => void
    handleFileSystemEntryDownload: (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => void
    handleFileSystemEntryRestore: (fileSystemEntryUuid: string) => void
}

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({
    fileSystemEntryInfoDTO,
    openFileInputPopup,
    openFileMovePopup,
    openFileSharePopup,
    openDirectoryCreatePopup,
    setFileUploadDirectory,
    handleFileDelete,
    handleFileFavoriteToggle,
    handleFileSystemEntryDownload,
    handleFileSystemEntryRestore,
}) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 6 //number of collumns in the table

    const location = useLocation()

    const { sizeValue, sizeUnit } = formatFileSize(fileSystemEntryInfoDTO.size)

    const { contentType, isDirectory } = formatFileContentType(fileSystemEntryInfoDTO.contentType)

    const handleNameChange = (name: string) => {
        patchFile(fileSystemEntryInfoDTO.uuid, undefined, undefined, name)
    }

    return (
        <>
            <tr
                className={fileSystemEntryInfoDTO.parent != null || isDirectory ? "directory" : ""}
                key={fileSystemEntryInfoDTO.uuid}
            >
                <td>
                    <DoubleClickEditText
                        value={fileSystemEntryInfoDTO.name}
                        onBlurCallback={handleNameChange}
                    />
                </td>
                <td>{contentType}</td>
                <td>{fileSystemEntryInfoDTO.user}</td>
                <td>
                    {sizeValue} {sizeUnit}
                </td>
                <td>{new Date(fileSystemEntryInfoDTO.uploadDate).toLocaleDateString()}</td>
                <td
                    onClick={() => {
                        handleFileFavoriteToggle(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.favorite)
                    }}
                >
                    {fileSystemEntryInfoDTO.favorite ? "★" : "☆"}
                </td>
                <td>
                    <button
                        onClick={() => {
                            handleFileSystemEntryDownload(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.name, contentType)
                        }}
                    >
                        Download
                    </button>
                    <button
                        onClick={() => {
                            handleFileDelete(fileSystemEntryInfoDTO.uuid, location.pathname === "/home/deleted")
                        }}
                    >
                        Delete
                    </button>
                    {location.pathname === "/home/deleted" && (
                        <button
                            onClick={() => {
                                handleFileSystemEntryRestore(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Restore
                        </button>
                    )}
                    {openFileMovePopup && (
                        <button
                            onClick={() => {
                                openFileMovePopup(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Move
                        </button>
                    )}
                    {openFileSharePopup && (
                        <button
                            onClick={() => {
                                openFileSharePopup(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Share
                        </button>
                    )}
                    {isDirectory && openDirectoryCreatePopup && (
                        <button
                            onClick={() => {
                                openDirectoryCreatePopup(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Create Directory
                        </button>
                    )}
                    {isDirectory && openFileInputPopup && setFileUploadDirectory && (
                        <button
                            onClick={() => {
                                openFileInputPopup()
                                setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Upload here
                        </button>
                    )}
                </td>
            </tr>
            {isDirectory && (
                <>
                    <tr
                        className="directory"
                        key={fileSystemEntryInfoDTO.uuid + "dir"}
                    >
                        <td
                            colSpan={colSpan}
                            onClick={() => {
                                setShowFileArray(!showFileArray)
                            }}
                        >
                            {showFileArray ? "▼" : "►"}
                        </td>
                    </tr>
                    {showFileArray && (
                        <>
                            {fileSystemEntryInfoDTO.children.map((fileSystemEntryInfo) => {
                                return (
                                    <FileSystemEntryInfo
                                        fileSystemEntryInfoDTO={fileSystemEntryInfo}
                                        openFileInputPopup={openFileInputPopup}
                                        openFileMovePopup={openFileMovePopup}
                                        openFileSharePopup={openFileSharePopup}
                                        openDirectoryCreatePopup={openDirectoryCreatePopup}
                                        setFileUploadDirectory={setFileUploadDirectory}
                                        handleFileDelete={handleFileDelete}
                                        handleFileFavoriteToggle={handleFileFavoriteToggle}
                                        handleFileSystemEntryDownload={handleFileSystemEntryDownload}
                                        handleFileSystemEntryRestore={handleFileSystemEntryRestore}
                                    />
                                )
                            })}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default FileSystemEntryInfo
