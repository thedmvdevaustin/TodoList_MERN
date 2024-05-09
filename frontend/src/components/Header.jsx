import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutUser, { isLoading }] = useLogoutMutation()
    const handleLogoutClick = async e => {
        e.preventDefault()
        try{
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <header>
                <nav>
                    <div className="select-container">
                        <NavLink className={({ isActive }) => {
                            (isActive ? 'navbar-active' : 'navbar-inactive')
                        }} to="/profile">Profile</NavLink>
                        <NavLink className={({ isActive }) => {
                            (isActive ? 'navbar-active' : 'navbar-inactive')
                        }} to="/dashboard">Dashboard</NavLink>
                    </div>
                    <h2 className="todoList-header">TodoList</h2>
                    <div className="select-container">
                        <Link onClick={handleLogoutClick} to="/">Logout</Link>
                        <NavLink className={({ isActive }) => {
                            (isActive ? 'navbar-active' : 'navbar-inactive')
                        }} to="/login">Login</NavLink>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header