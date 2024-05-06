import { NavLink, Link } from 'react-router-dom'

const Header = () => {
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
                        {/* change the to; needs to be /dashboard  */}
                    </div>
                    <h2 className="todoList-header">TodoList</h2>
                    <div className="select-container">
                        <Link to="/logout">Logout</Link>
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