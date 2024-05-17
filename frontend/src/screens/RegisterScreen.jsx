import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'


const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const [register, { isLoading }] = useRegisterMutation()

    const handleRegister = async e => {
        e.preventDefault()
        if (password!==password2){
            setPassword("")
            setPassword2("")
            return toast.error("Passwords do not match")
        }
        //make sure you come back to do input validation for this
        //required makes sure the input fields can't be empty but that's it
        try {
            const res = await register({ name, email, password}).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate("/dashboard")
            toast.success("You are registered successfully! Please log in")
        } catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-section">
                <div className="register-input-container">
                    <label htmlFor="name">Full Name:</label>
                    <input id="name" type="text" onChange={handleName} value={name} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" onChange={handleEmail} value={email} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" onChange={handlePassword} value={password} required />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input id="password2" type="password" onChange={handlePassword2} value={password2} required />
                </div>
                <div className="register-input-button">
                    <button type="submit">Register</button>
                </div>
                <div className="toLogin-container">
                    <span>Already registered? <Link to='/login'>Login</Link></span>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen