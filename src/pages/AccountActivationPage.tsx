import React from "react"
import { useSearchParams } from "react-router-dom"
import { registerUser } from "../services/UserAccountService"
import "../css/GenericForm.css"

const AccountActivationPage: React.FC = () => {
    const [searchParams] = useSearchParams()
    const accountCreationToken = searchParams.get("token")

    const passwordInputRef = React.useRef<HTMLInputElement>(null)

    const [registerMessage, setRegisterMessage] = React.useState<string>("")

    const handleSubmit = async () => {
        if (!passwordInputRef.current || !accountCreationToken) {
            return
        }

        const registerResponse = await registerUser(accountCreationToken, passwordInputRef.current.value)

        if (registerResponse.error) {
            if (registerResponse.error == 400) {
                setRegisterMessage("Hasło musi mieć co najmniej 8 znaków, w tym jedną małą literę, jedną dużą literę, jedną cyfrę i jeden znak")
            } else {
                setRegisterMessage("Coś poszło nie tak")
            }
        } else {
            setRegisterMessage("Konto zostało założone")
        }
    }

    return (
        <div className="container">
            <div className="box-outline">
                <div className="box-content">
                    <h1 className="header">Aktywuj konto</h1>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <div className="inputBox">
                            <input placeholder=" " ref={passwordInputRef} type="password" name="password" id="password" />
                            <label htmlFor="name">Podaj hasło: </label>
                        </div>
                        <div className="buttons">
                            <button type="submit">Załóż konto</button>
                        </div>
                    </form>
                    <div className="error-message">{registerMessage}</div>
                </div>
            </div>
        </div>
    )
}

export default AccountActivationPage
