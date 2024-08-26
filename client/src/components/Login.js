import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.js';
import './Login.css';
import loginImage from './images/register-image.jpg';
import logo from './images/logo.png';
import prof from './images/prof.gif';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { getLoggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { loggedIn, logout } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginData = { email, password };
            await axios.post('http://localhost:5000/login', loginData, {
                withCredentials: true,
            });
            await getLoggedIn(); // Update the loggedIn state in the context
            navigate('/'); // Redirect to the homepage
        } catch (err) {
            console.error('Login failed:', err);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <header className="header">
                <img src={logo} alt="Logo" />
                <div className='ok'>
                    <h1>SRIJAN HOME SCHOOL</h1>
                    <p>बुद्धिवृद्धिर्मानसिकानां, प्राकृतिरक्षणं</p>
                </div>
                <div className="buttons-container">
                    {loggedIn ? (
                        <div className="profile-container">
                            <div className="profile-icon" onClick={() => navigate('/Profile')}>
                                <img src={prof} alt="Profile" />
                                <span className="profile-text">See Profile</span>
                            </div>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/Login"><button>Login</button></Link>
                            <Link to="/Register"><button>Register</button></Link>
                        </>
                    )}
                </div>
            </header>
            <nav className="navbar">
                <div className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/People">People</Link></li>
                    <li><a href="mailto:harshrajshs@gmail.com">Contact</a></li>
                    <li><Link to="/Exams">Exams </Link></li>
                    <li><Link to="/ResultBanner">Achievements</Link></li>
                </ul>
            </nav>
            <div className='amazing2'>
                <div className="login-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;