import React, { useState, useContext } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import AuthContext from './context/AuthContext.js';
import registerImage from './images/register-image.jpg';
import logo from './images/logo.png';
import prof from './images/prof.gif';

function Register() {
    const [name, setName] = useState('');
    const [classLevel, setClassLevel] = useState('');
    const [stream, setStream] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const navigate = useNavigate();
    const { getLoggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { loggedIn, logout } = useContext(AuthContext);

    async function handleSubmit(event) {    
        event.preventDefault();
        try {
            const registerData = { name, classLevel, stream, phone, email, password, passwordVerify };
            await axios.post("http://localhost:5000/register/", registerData);

            // Automatically log in the user after successful registration
            const loginData = { email, password };
            await axios.post("http://localhost:5000/login", loginData, { withCredentials: true });

            // Update the loggedIn state in the context
            await getLoggedIn();

            alert("Registered and logged in successfully!");
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className='register-container'>
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
            <div className='amazing'>
                <div className='register-image'>
                    <img src={registerImage} alt="Register" />
                </div>
                <div className='register-form'>
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                value={name}
                                placeholder='Enter your Name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <select
                                value={classLevel}
                                onChange={(e) => setClassLevel(e.target.value)}
                                required
                            >
                                <option value="">Select Class</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                                <option value="dropper">Dropper</option>
                            </select>
                        </label>
                        <label>
                            <select
                                value={stream}
                                onChange={(e) => setStream(e.target.value)}
                                required
                            >
                                <option value="">Select Stream</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Medical">Medical</option>
                                <option value="UPSC">UPSC</option>
                            </select>
                        </label>
                        <label>
                            <input
                                type="tel"
                                value={phone}
                                placeholder='Enter your Phone Number'
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="email"
                                value={email}
                                placeholder='Enter your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="password"
                                value={password}
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <input
                                type="password"
                                value={passwordVerify}
                                placeholder='Verify Password'
                                onChange={(e) => setPasswordVerify(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;