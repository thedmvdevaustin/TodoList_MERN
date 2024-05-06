import { Link } from "react-router-dom"
import { useState } from 'react'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-section">
                <div className="login-input-container">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" onChange={handleEmail} value={email} />
                </div>
                <div className="login-input-container">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" onChange={handlePassword} value={password} />
                </div>
                <div className="login-input-button">
                    <Link to="/dashboard">Login</Link>
                </div>
            </form>
        </div>

    )
}

export default LoginScreen