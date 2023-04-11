import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetUserPassword } from "../../services/PasswordResetService"
import "../../css/GenericForm.css"

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
        <div className="container">
            <div className="box-outline">
                <div className="box-content">
                    <h2 className="header">Podaj nowe hasło</h2>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <div className="inputBox">
                            <input
                                placeholder=" "
                                ref={newPasswordInputRef}
                                name="newPassword"
                                id="newPassword"
                                type="password"
                                required
                            />
                            <label htmlFor="newPassword">Nowe hasło: </label>
                        </div>
                        <div className="buttons">
                            <input type="submit" />
                            <button onClick={() => navigate("/login")}>Powrót na stronę logowania</button>
                        </div>
                    </form>

                    {statusMessage && <div className="error-message">{statusMessage}</div>}
                </div>
            </div>
        </div>
    )
}

export default ConfirmPasswordReset
