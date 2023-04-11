import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const createSupportSubmission = async (name: string, surname: string, email: string, description: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const response = await axios.post("http://localhost:8080/support/submissions", {
            name,
            surname,
            email,
            message: description,
        })

        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
