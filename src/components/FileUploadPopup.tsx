import React, { useState } from "react"
import { fileUpload } from "../services/FileSystemEntryInfoService"
import "../css/FileUploadPopup.css"

interface FileUploadPopupProps {
    uuid: string | null
    setFileUploadCardVisible: (param: boolean) => void
    fileRefreshFunction: () => void
}

const FileUploadPopup: React.FC<FileUploadPopupProps> = (props) => {
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)

    const uploadFile = async () => {
        const response = await fileUpload(fileToUpload, false, props.uuid)
        props.fileRefreshFunction()
    }

    let closing = false

    return (
        <div className="file-upload-popup">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    if (closing) {
                        props.setFileUploadCardVisible(false)
                    } else {
                        uploadFile()
                    }
                }}
            >
                <input type="file" onChange={(e) => setFileToUpload(e.target.files ? e.target.files[0] : null)} />
                <input type="submit" />
                <button type="submit" onClick={() => props.setFileUploadCardVisible(false)}>
                    Close
                </button>
            </form>
        </div>
    )
}

export default FileUploadPopup
