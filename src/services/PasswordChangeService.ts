import axios, { AxiosError } from "axios"
import jwt_decode from "jwt-decode"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<GeneralApiResponseDTO<string>> => {
    try {
        const token = localStorage.getItem("jwt")
        if (token) {
            const jwt = jwt_decode(token) as { userUuid: string }
            const response = await axios.post(
                `http://localhost:8080/users/${jwt.userUuid}/changePassword`,
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return { data: response.data.message }
        }
        return { data: "Błąd w autoryzacji, proszę ponownie spróbować się zalogować." }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { data: data.error, error: data.status }
    }
}
