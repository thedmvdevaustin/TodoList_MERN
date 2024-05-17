import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (userInfo){
            navigate('/dashboard')
        }
    }, [navigate, userInfo])

    const [login, { isLoading }] = useLoginMutation()
    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const submitHandler = async e => {
        e.preventDefault()
        //Did not do any input validation for email or password
        //required in the input tag makes sure they can't be submitted while empty
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/dashboard')
            toast.success("You are logged in")
        } catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={submitHandler} className="login-section">
                <div className="login-input-container">
                    <label htmlFor="email">Email:</label>
                    {/* required attribute can be styled with :required in css */}
                    <input type="text" id="email" onChange={handleEmail} value={email} required />
                </div>
                <div className="login-input-container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={handlePassword} value={password} required />
                </div>
                <div className="login-input-button-container">
                    <button type="submit">Login</button>
                </div>
                <div className="toRegister-container">
                    <span>Still need to register? <Link to='/register'>Register</Link></span>
                </div>
            </form>
        </div>

    )
}

export default LoginScreen