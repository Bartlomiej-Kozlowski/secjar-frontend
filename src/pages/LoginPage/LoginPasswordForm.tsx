import React from "react"

interface LoginPasswordFormProps {
    handleLoginPasswordSubmit: (username: string, password: string) => void
}

const LoginPasswordForm: React.FC<LoginPasswordFormProps> = ({ handleLoginPasswordSubmit }) => {
    const usernameInputRef = React.useRef<HTMLInputElement>(null)
    const passwordInputRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if (!usernameInputRef.current || !passwordInputRef.current) {
            return
        }
        handleLoginPasswordSubmit(usernameInputRef.current.value, passwordInputRef.current.value)
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            <div className="inputBox">
                <input placeholder=" " ref={usernameInputRef} type="text" name="username" id="username" />
                <label htmlFor="username">Nazwa użytkownika: </label>
                <i></i>
            </div>
            <div className="inputBox">
                <input placeholder=" " ref={passwordInputRef} type="password" name="password" id="password" />
                <label htmlFor="password">Hasło: </label>
                <i></i>
            </div>
            <input type="submit" value="Zaloguj się" />
        </form>
    )
}

export default LoginPasswordForm
