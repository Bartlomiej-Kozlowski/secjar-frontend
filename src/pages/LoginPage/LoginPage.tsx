import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../../contexts/IsLoggedInContext"
import { login, sendMFAToken } from "../../services/AuthService"
import LoginPasswordForm from "./LoginPasswordForm"
import MFAForm from "./MFAForm"
import "../../css/LoginPage.css"

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    const [formStep, setFormStep] = React.useState<1 | 2>(1)
    const [loginError, setLoginError] = React.useState<string>("")
    const { setIsUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType
    const [username, setUsername] = React.useState<string>()
    const [password, setPassword] = React.useState<string>()

    const handleLoginPasswordSubmit = async (username: string, password: string) => {
        setLoginError("")

        setIsUserLoggedIn(false)

        const sendMFATokenResponse = await sendMFAToken(username, password)
        if (sendMFATokenResponse.error) {
            if (sendMFATokenResponse.error == 401) {
                setLoginError("Podałeś zły login lub hasło")
            } else {
                setLoginError("Coś poszło nie tak, spróbuj później")
            }
            return
        }
        if (!sendMFATokenResponse.data) {
            setLoginError("Coś poszło nie tak, spróbuj później")
            return
        }

        if (sendMFATokenResponse.data.isUsingMFA) {
            setUsername(username)
            setPassword(password)
            setFormStep(2)
        } else {
            handleLogin(username, password)
        }
    }

    const handleMFASubmit = (mfaToken: string) => {
        if (username && password) {
            handleLogin(username, password, mfaToken)
        }
    }

    const handleLogin = async (username: string, password: string, mfaToken?: string) => {
        const loginResponse = await login(username, password, mfaToken)

        if (loginResponse.error) {
            if (loginResponse.error == 401) {
                setLoginError("Podałeś zły login, hasło lub token mfa")
            } else {
                setLoginError("Coś poszło nie tak, spróbuj później")
            }
            return
        }

        setIsUserLoggedIn(true)
        navigate("/home")
    }

    const displayFormStep = () => {
        if (formStep == 1) {
            return <LoginPasswordForm handleLoginPasswordSubmit={handleLoginPasswordSubmit} />
        } else if (formStep == 2) {
            return <MFAForm handleMFASubmit={handleMFASubmit} />
        }
    }

    return (
        <div className="box-outline">
            <div className="box-content">
                <h2 className="header">Formularz logowania</h2>
                {displayFormStep()}
                <div className="error-message">{loginError}</div>
                <div className="links">
                    <Link to={"/passwordReset"}>Zapomniałem hasła</Link>
                    <Link to={"/support"}>Pomoc techniczna</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
