import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const login = async (username: string, password: string, mfaToken?: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const response = await axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
            mfaToken: mfaToken,
        })

        localStorage.setItem("jwt", response.data.accessToken)

        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const logout = () => {
    localStorage.removeItem("jwt")
}

export const sendMFAToken = async (username: string, password: string): Promise<GeneralApiResponseDTO<{ isUsingMFA: boolean }>> => {
    try {
        const response = await axios.post("http://localhost:8080/send2FATokenIfEnabled", {
            username: username,
            password: password,
        })

        return { data: { isUsingMFA: response.data.isUsingMFA } }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
