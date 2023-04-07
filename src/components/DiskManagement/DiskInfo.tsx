import React, {useEffect} from "react"
import DiskInfoDTO from "../../ts/interfaces/DiskInfoDTO"
import MimeTypeList from "./MimeTypeList"

interface DiskInfoProps {
    diskInfoDTO: DiskInfoDTO | null
    handleMaxUserSessionTimeEdit: (value: number) => void
    handleMimeTypeDelete: (typeName: string) => void
    handleMimeTypeAdd: (typeName: string) => void
}

const DiskInfo: React.FC<DiskInfoProps> = ({ diskInfoDTO, handleMaxUserSessionTimeEdit, handleMimeTypeDelete, handleMimeTypeAdd }) => {
    const [isMaxUserSessionTimeEdited, setIsMaxUserSessionTimeEdited] = React.useState(false)
    const [maxUserSessionTime, setMaxUserSessionTime] = React.useState<number | null>(null)
    const [mimeTypeAddValue, setMimeTypeAddValue] = React.useState<string | null>(null)

    const maxUserSessionTimeMinutes = maxUserSessionTime && Math.round(maxUserSessionTime / 60_000) || 0

    useEffect(() => {
        if (diskInfoDTO){
            setMaxUserSessionTime(diskInfoDTO.maxUserSessionTime)
        }
    }, [isMaxUserSessionTimeEdited, diskInfoDTO])

    const handleSubmit = () => {
        if (maxUserSessionTime != null) {
            handleMaxUserSessionTimeEdit(maxUserSessionTime)
            setIsMaxUserSessionTimeEdited(false)
        }
    }

    return (
        <div>
            <div>
                Maksymalny czas trwania sesji użytkownika:
                {isMaxUserSessionTimeEdited ? (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <input
                            type="number"
                            value={maxUserSessionTimeMinutes}
                            onChange={(e) => {
                                setMaxUserSessionTime(parseInt(e.target.value) * 60_000)
                            }}
                        />
                        <input type="submit"/>
                        <button
                            onClick={() => {
                                setIsMaxUserSessionTimeEdited(false)
                            }}
                        >
                            Anuluj
                        </button>
                    </form>
                ) : (
                    <>
                        {maxUserSessionTimeMinutes} minut
                        <button
                            onClick={() => {
                                setIsMaxUserSessionTimeEdited(true)
                            }}
                        >
                            Edytuj
                        </button>
                    </>
                )}
            </div>
            <div>Niedozwolone typy MIME:<br />
                <MimeTypeList
                    mimeTypes={diskInfoDTO && diskInfoDTO.disallowedMimeTypes || []}
                    handleMimeTypeDelete={handleMimeTypeDelete}
                />
                Dodaj typ:
                <input
                    type="text"
                    onChange={(e) => {
                        e.target && setMimeTypeAddValue(e.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        handleMimeTypeAdd(mimeTypeAddValue || "")
                    }}
                >
                    Dodaj
                </button>
            </div>
        </div>
    )
}

export default DiskInfo
