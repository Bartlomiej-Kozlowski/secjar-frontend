import React from "react"

interface MimeTypeProps {
    mimeType: string
    handleMimeTypeDelete: (typeName: string) => void
}

const MimeType: React.FC<MimeTypeProps> = ({ mimeType, handleMimeTypeDelete }) => {
    return (
        <li className="container">
            {mimeType}
            <button
                onClick={() => {
                    handleMimeTypeDelete(mimeType);
                }}
            >
                Delete
            </button>
        </li>
    )
}

export default MimeType