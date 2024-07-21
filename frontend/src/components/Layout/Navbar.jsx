import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="title">Some County Pet Shelter</div>
                <div className="links">
                    <Link to="/">Home</Link>
                    {auth ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Admin Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;