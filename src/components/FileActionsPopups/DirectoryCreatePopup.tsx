import React, { useRef } from "react"
import { createDirectory } from "../../services/CreateDirectoryService"

interface DirectoryCreatePopupProps {
    parenDirectoryUuid: string | undefined
    closePopup: () => void
    directoryCreateCallback: () => void
}

const DirectoryCreatePopup: React.FC<DirectoryCreatePopupProps> = ({ parenDirectoryUuid, closePopup, directoryCreateCallback }) => {
    const directoryNameInputRev = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        if (!directoryNameInputRev.current) {
            return
        }

        await createDirectory(directoryNameInputRev.current.value, parenDirectoryUuid)
        directoryCreateCallback()
        closePopup()
    }

    return (
        <div className="file-upload-popup">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <label htmlFor="directoryName">Nazwa folderu: </label>
                <input
                    type="text"
                    ref={directoryNameInputRev}
                />
                <button onClick={() => closePopup()}>Cancel</button>
                <button type="submit">Apply</button>
            </form>
        </div>
    )
}

export default DirectoryCreatePopup
