import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.js';
import './About.css';
import study from './images/study.jpg';
import enjoy from './images/enjoy.jpg';
import yoga from './images/yoga.jpg';
import logo from './images/logo.png';
import prof from './images/prof.gif';

function About() {
    const { loggedIn, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="about-container">
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
            <div className='amazing4'>
                <div className="about-content">
                    <h1>About Us</h1>
                    <div className="extra-section">
                        <div className="section">
                            <div className="section-content">
                                <h2>Study and Aims</h2>
                                <img src={study} alt="Study and Aims" className="section-image" />
                                <p>At SRIJAN HOME SCHOOL, our primary focus is on the holistic learning and mental well-being of our students. We aim to create an educational environment that not only emphasizes academic excellence but also nurtures the psychological health of our students, ensuring they grow into well-rounded individuals.</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-content">
                                <h2>Extra Activities</h2>
                                <img src={yoga} alt="Study and Aims" className="section-image" />
                                <p>Beyond academics, we encourage students to engage in a variety of extracurricular activities. Our students have access to a wide range of noble books and storybooks, fostering a love for reading and self-improvement. Yoga sessions are also integrated into our curriculum to promote physical health and mental tranquility.</p>
                                <p>Every Sunday, we provide a platform for students to showcase their talents. Whether it's singing, reciting poems, dancing, performing comedy, or storytelling, students are given the opportunity to express themselves creatively and build their confidence in a supportive environment.</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-content">
                                <h2>Enjoyments</h2>
                                <img src={enjoy} alt="Enjoyments" className="section-image" />
                                <p>On Sundays, our students have the opportunity to unwind and have fun by watching movies or engaging in interesting games with their peers. This not only provides a much-needed break from their studies but also helps in building camaraderie and teamwork among students.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <footer className="footer">
                    <div className="quote">
                        <p>“Dream is not that which you see while sleeping; it is something that does not let you sleep.”</p>
                        <cite>- A.P.J. Abdul Kalam</cite>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default About;