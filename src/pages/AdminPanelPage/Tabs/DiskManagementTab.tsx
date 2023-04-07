import React, {useEffect} from "react"
import DiskInfo from "../../../components/DiskManagement/DiskInfo"
import DiskInfoDTO from "../../../ts/interfaces/DiskInfoDTO"
import {editDiskInfo, getDiskInfo} from "../../../services/DiskManagementService"
import {useNavigate} from "react-router-dom"
import Mime from 'mime-types-no-nodejs';

const DiskManagementTab: React.FC = () => {
    const navigate = useNavigate()
    const [diskInfo, setDiskInfo] = React.useState<DiskInfoDTO | null>(null)
    const [statusMessage, setStatusMessage] = React.useState<string | null>(null)

    useEffect(() => {
        refreshDiskInfo()
    }, [])

    const refreshDiskInfo = async () => {
        const response = await getDiskInfo()
        if (response.data) {
            setDiskInfo(response.data)
        } else {
            if (response.error == 401){
                navigate("/login")
            }
        }
    }

    const handleMaxUserSessionTimeEdit = async (value: number) => {
        if (diskInfo){
            const updatedDiskInfo = {
                maxUserSessionTime: value,
                disallowedMimeTypes: diskInfo.disallowedMimeTypes,
            } as DiskInfoDTO
            const response = await editDiskInfo(updatedDiskInfo)
            setStatusMessage("")
            if (response.error){
                if (response.error == 400){
                    setStatusMessage("Wartość musi mieścić się w zakresie od 0 do 60 minut.")
                }else {
                    setStatusMessage("Wystąpił nieoczekiwany błąd.")
                }
            }
            refreshDiskInfo()
        }
    }

    const handleMimeTypeAdd = async (typeName: string) => {
        if (typeName==""){
            setStatusMessage("Nie podano żadnej wartości")
            return
        }else if (Mime.extension(typeName) == undefined){
            setStatusMessage("Podany typ nie istnieje. Sprawdź czy nie została popełniona literówka.")
            return
        }
        if (diskInfo){
            if (diskInfo.disallowedMimeTypes.findIndex((value) => value == typeName) == -1){
                const updatedMimeTypes = diskInfo.disallowedMimeTypes.concat(typeName)
                const updatedDiskInfo = {
                    maxUserSessionTime: diskInfo.maxUserSessionTime,
                    disallowedMimeTypes: updatedMimeTypes,
                } as DiskInfoDTO
                const response = await editDiskInfo(updatedDiskInfo)
                setStatusMessage("")
                if (response.error){
                    setStatusMessage("Wystąpił nieoczekiwany błąd.")
                }
                refreshDiskInfo()
            }else{
                setStatusMessage("Podany typ już znajduje się na liście.")
            }
        }
    }

    const handleMimeTypeDelete = async (typeName: string) => {
        if (diskInfo){
            const updatedMimeTypes = diskInfo.disallowedMimeTypes.filter((value) => {
                return value != typeName
            })
            const updatedDiskInfo = {
                maxUserSessionTime: diskInfo.maxUserSessionTime,
                disallowedMimeTypes: updatedMimeTypes,
            } as DiskInfoDTO
            const response = await editDiskInfo(updatedDiskInfo)
            setStatusMessage("")
            if (response.error){
                setStatusMessage("Wystąpił nieoczekiwany błąd.")
            }
            refreshDiskInfo()
        }
    }

    return (
        <div>
            <h2>Dysk</h2>
            <DiskInfo
                diskInfoDTO={diskInfo}
                handleMimeTypeAdd={handleMimeTypeAdd}
                handleMaxUserSessionTimeEdit={handleMaxUserSessionTimeEdit}
                handleMimeTypeDelete={handleMimeTypeDelete}
            />
            <div className="error">{statusMessage}</div>
        </div>
    )
}

export default DiskManagementTab