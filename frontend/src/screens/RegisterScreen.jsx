import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleName = e => {
        setName(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handlePassword2 = e => {
        setPassword2(e.target.value)
    }
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-section">
                <div className="register-input-container">
                    <label htmlFor="name">Full Name:</label>
                    <input id="name" type="text" onChange={handleName} value={name} />
                </div>
                <div className="register-input-container">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" onChange={handleEmail} value={email} />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="text" onChange={handlePassword} value={password} />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input id="password2" type="text" onChange={handlePassword2} value={password2} />
                </div>
                <div className="register-input-button">
                    <Link>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen