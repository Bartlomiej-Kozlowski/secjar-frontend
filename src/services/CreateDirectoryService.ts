import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const createDirectory = async (directoryName: string, parentDirectoryUuid?: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const response = await axios.post(
            "http://localhost:8080/fileSystemEntries",
            {
                directoryName,
                parentDirectoryUuid,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        )
        return { data: response.data.fileSystemEntryInfoList }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
