import React from "react"
import MimeType from "./MimeType"

interface MimeTypeListProps {
    mimeTypes: Array<string>
    handleMimeTypeDelete: (typeName: string) => void
}

const MimeTypeList: React.FC<MimeTypeListProps> = ({ mimeTypes, handleMimeTypeDelete }) => {
    return (
        <div>
            <ul>
                {mimeTypes.map((mimeType) => {
                    return (
                        <MimeType
                            mimeType={mimeType}
                            handleMimeTypeDelete={handleMimeTypeDelete}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default MimeTypeList