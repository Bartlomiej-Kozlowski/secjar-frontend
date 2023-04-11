import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetUserPassword } from "../../services/PasswordResetService"

const ConfirmPasswordReset: React.FC = () => {
    const [statusMessage, setStatusMessage] = React.useState<string>("")
    const newPasswordInputRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const handleSubmit = async () => {
        if (!token) {
            setStatusMessage("Link jest niepoprawny")
            return
        }

        if (!newPasswordInputRef.current) {
            return
        }

        const response = await resetUserPassword(token, newPasswordInputRef.current.value)

        if (response.data) {
            setStatusMessage("Hasło zostało zmienione")
        } else {
            setStatusMessage("Coś poszło nie tak")
        }
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <label htmlFor="newPassword">Nowe hasło: </label>
                <input
                    ref={newPasswordInputRef}
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    required
                />
                <input type="submit" />
            </form>

            {statusMessage && <p>{statusMessage}</p>}
            <button onClick={() => navigate("/login")}>Powrót na stronę logowania</button>
        </>
    )
}

export default ConfirmPasswordReset
