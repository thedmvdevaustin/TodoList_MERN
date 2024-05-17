import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userInfo } from '../slices/authSlice'
import { useUpdateProfileMutation } from '../slices/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
const ProfileScreen = () => {
    const credentials = useSelector(userInfo)
    const [name, setName] = useState(credentials.name)
    const [email, setEmail] = useState(credentials.email)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //when using useSelector make sure you always console.log to see what 
    //you are getting back just to make sure, you can console.log inside the 
    //useSelector also; we are getting back an object(yes you can destructure it)
    
    const [updateProfile] = useUpdateProfileMutation()

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

    const handleUpdateProfile = async e => {
        e.preventDefault()
        if (password!==password2){
            toast.error("passwords don't match")
            setPassword("")
            setPassword2("")
        } else{
            try {
                const res = await updateProfile({ name: name, email: email, password: password})
                dispatch(setCredentials({...res.data}))
                toast.success("updated profile")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <div className="register-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="register-section">
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
                    <input id="password" type="password" onChange={handlePassword} value={password} />
                </div>
                <div className="register-input-container">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input id="password2" type="password" onChange={handlePassword2} value={password2} />
                </div>
                <div className="register-input-button">
                    <button type="submit" >Update Profile</button >
                </div>
            </form>
        </div>
    )
}

export default ProfileScreen