import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const sendPasswordResetLink = async (userEmail: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const response = await axios.post(`http://localhost:8080/users/passwordReset`, {
            userEmail,
        })

        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const resetUserPassword = async (token: string, newPassword: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const response = await axios.post(`http://localhost:8080/users/passwordReset/confirm`, {
            token,
            newPassword,
        })

        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
