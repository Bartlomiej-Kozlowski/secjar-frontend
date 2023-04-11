import React, { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { confirmEmail } from "../services/UserAccountService"
import "../css/GenericForm.css"

const EmailConfirmationPage: React.FC = () => {
    const [searchParams] = useSearchParams()
    const [statusMessage, setStatusMessage] = React.useState<string>("")
    const confirmEmailToken = searchParams.get("token")
    const navigate = useNavigate()

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleSubmit = async () => {
        if (!confirmEmailToken) {
            setStatusMessage("Niepoprawny link.")
            return
        }

        const response = await confirmEmail(confirmEmailToken)

        if (response.data) {
            setStatusMessage("Email potwierdzony")
        } else {
            setStatusMessage("Coś poszło nie tak")
        }
    }

    return (
        <div className="container">
            <div className="box-outline">
                <div className="box-content">
                    {statusMessage && (
                        <div>
                            {statusMessage}
                            <div className="buttons">
                                <button onClick={() => navigate("/login")}>Powrót do strony logowania</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmationPage
