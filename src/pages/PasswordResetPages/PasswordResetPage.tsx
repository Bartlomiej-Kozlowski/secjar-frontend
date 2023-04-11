import React from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetLink } from "../../services/PasswordResetService"
import "../../css/GenericForm.css"

const PasswordResetPage: React.FC = () => {
    const [stage, setStage] = React.useState(0) //current stage of resetting password process
    const [responseMessage, setResponseMessage] = React.useState<string>("")
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (emailInputRef.current) {
            const result = await sendPasswordResetLink(emailInputRef.current.value)
            if (result.data) {
                setStage(1)
            } else {
                setResponseMessage("Wystąpił nieoczekiwany błąd")
            }
        }
    }

    return (
        <div className="container">
            <div className="box-outline">
                <div className="box-content">
                    <h1 className="header">Zresetuj hasło</h1>
                    {stage == 0 ? (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <div className="inputBox">
                                <input
                                    placeholder=" "
                                    ref={emailInputRef}
                                    name="email"
                                    id="email"
                                    type="email"
                                    required
                                />
                                <label htmlFor="email">Adres e-mail: </label>
                            </div>
                            <div className="buttons">
                                <input type="submit" />
                                <button onClick={() => navigate("/login")}>Powróć do strony logowania</button>
                            </div>
                            {responseMessage && <div className="error-message">{responseMessage}</div>}
                        </form>
                    ) : stage == 1 ? (
                        <p>Wysłaliśmy link resetu hasła na podany e-mail. Sprawdź swoją skrzynkę odbiorczą.</p>
                    ) : (
                        <p>Wystąpił nieoczekiwany błąd.</p>
                    )}
                    { stage != 0 && (
                        <div className="buttons">
                            <button onClick={() => navigate("/login")}>Powróć do strony logowania</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PasswordResetPage
