import React, { useState, useContext } from 'react';
import students from './students.json';
import './ResultBanner.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import AuthContext from './context/AuthContext.js';
import prof from './images/prof.gif';
import no_im from './people_images/man.jpg';

const ResultBanner = () => {
    const navigate = useNavigate();
    const { loggedIn, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
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
            <div className="result-banner">
                <div className='res3'>
                    <h2>INMO 2024</h2>
                    <div className="student-list">
                        {students.map((student, index) => {
                            if (student.exam === "inmo2023") {
                                let resultImage;
                                try {
                                    resultImage = require(`${student.image}`);
                                } catch (error) {
                                    resultImage = no_im;
                                }
                                return (
                                    <div className="student-card" key={index}>
                                        <img src={resultImage} alt={`${student.name}'s photo`} />
                                        <div className="student-details">
                                            <h3>{student.name}</h3>
                                            <p>Class: {student.details}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className='res4'>
                    <h2>RMO 2023</h2>
                    <div className="student-list">
                        {students.map((student, index) => {
                            if (student.exam === "rmo2023") {
                                let resultImage;
                                try {
                                    resultImage = require(`${student.image}`);
                                } catch (error) {
                                    resultImage = no_im;
                                }
                                return (
                                    <div className="student-card" key={index}>
                                        <img src={resultImage} alt={`${student.name}'s photo`} />
                                        <div className="student-details">
                                            <h3>{student.name}</h3>
                                            <p>Class: {student.details}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className='res5'>
                    <h2>IOQM 2023</h2>
                    <div className="student-list">
                        {students.map((student, index) => {
                            if (student.exam === "prmo2023") {
                                let resultImage;
                                try {
                                    resultImage = require(`${student.image}`);
                                } catch (error) {
                                    resultImage = no_im;
                                }
                                return (
                                    <div className="student-card" key={index}>
                                        <img src={resultImage} alt={`${student.name}'s photo`} />
                                        <div className="student-details">
                                            <h3>{student.name}</h3>
                                            <p>Class: {student.details}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className='res1'>
                    <h2>Jee Advanced 2023</h2>
                    <div className="student-list">
                        {students.map((student, index) => {
                            if (student.exam === "ja2023") {
                                let resultImage;
                                try {
                                    resultImage = require(`${student.image}`);
                                } catch (error) {
                                    resultImage = no_im;
                                }
                                return (
                                    <div className="student-card" key={index}>
                                        <img src={resultImage} alt={`${student.name}`} />
                                        <div className="student-details">
                                            <h3>{student.name}</h3>
                                            <p>{student.degree}</p>
                                            <p>Other details: {student.details}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className='res2'>
                    <h2>NEET 2023</h2>
                    <div className="student-list">
                        {students.map((student, index) => {
                            if (student.exam === "med2023") {
                                let resultImage;
                                try {
                                    resultImage = require(`${student.image}`);
                                } catch (error) {
                                    resultImage = no_im;
                                }
                                return (
                                    <div className="student-card" key={index}>
                                        <img src={resultImage} alt={`${student.name}'s photo`} />
                                        <div className="student-details">
                                            <h3>{student.name}</h3>
                                            <p>Other details: {student.details}</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultBanner;