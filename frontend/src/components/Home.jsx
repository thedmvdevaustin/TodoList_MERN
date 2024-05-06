import { Link } from "react-router-dom"


const Home = () => {
    return (
        <div className="home">
            <section className='home-container'>
                <h2 className="welcome">Welcome customers!</h2>
                <p className="home-details">This is the todoList App Please register if you do not have a profile or sign in if you already have a profile</p>
                <div className="home-buttons">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Sign In</Link>
                </div>
            </section>
        </div>
    )
}

export default Home