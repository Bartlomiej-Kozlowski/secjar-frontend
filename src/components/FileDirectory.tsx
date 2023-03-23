import React, { useState } from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfoList from "./FileSystemEntryInfoList"

interface FileDirectoryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    setFileUploadCardVisible: (param: boolean) => void
    setFileUploadDirectory: (param: string) => void
}

const FileDirectory: React.FC<FileDirectoryProps> = ({ fileSystemEntryInfoDTO, setFileUploadCardVisible, setFileUploadDirectory }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 4 //number of collumns in the table

    return (
        <>
            <tr className="directory" key={fileSystemEntryInfoDTO.id}>
                <td>{fileSystemEntryInfoDTO.name}</td>
                <td>Directory</td>
                <td>{fileSystemEntryInfoDTO.uuid}</td>
                <td>
                    <button
                        onClick={() => {
                            setFileUploadCardVisible(true)
                            setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                        }}
                    >
                        Upload here
                    </button>
                </td>
            </tr>
            {showFileArray ? (
                <td
                    className="directory"
                    colSpan={colSpan}
                    onClick={() => {
                        setShowFileArray(!showFileArray)
                    }}
                >
                    ▼
                    <FileSystemEntryInfoList fileSystemEntriesInfoDTO={fileSystemEntryInfoDTO.children} setFileUploadCardVisible={setFileUploadCardVisible} setFileUploadDirectory={setFileUploadDirectory} />
                </td>
            ) : (
                <td
                    className="directory"
                    colSpan={colSpan}
                    onClick={() => {
                        setShowFileArray(!showFileArray)
                    }}
                >
                    ►
                </td>
            )}
        </>
    )
}

export default FileDirectory
