import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import AuthContext from './context/AuthContext.js';
import img1 from './images/img1.jpeg';
import img2 from './images/img2.jpeg';
import img3 from './images/img3.jpeg';
import img4 from './images/img4.jpeg';
import img5 from './images/img5.jpg';
import logo from './images/logo.png';
import prof from './images/prof.gif';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from './Carousel.js';
import AdditionalInfo from './additional.js';
import Typewriter from './Typewriter.js'; 

function LandingPage() {
    const images = [img1, img2, img3, img4, img5];
    const { loggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="landing-page">
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
                    <li><a href="mailto:shskurtha@gmail.com">Contact</a></li>
                    <li><Link to="/Exams">Exams </Link></li>
                    <li><Link to="/ResultBanner">Achievements</Link></li>
                </ul>
            </nav>
            <div className="content">
                <div className="carousel">
                    <Carousel images={images} />
                </div>
                <div className="announcement">
                    <h3>📢Announcement</h3>
                    <div id="announcementText" className="announcement-text">
                        <p>✏️ JEE Advanced result on 9th June.</p>
                        <p>✏️ JEE Advanced Examination on 26th May.</p>
                    </div>
                </div>
            </div>
            <div className="mission">
                <h2>We are here to&nbsp;<span className="typewriter-container"><Typewriter texts={["Nurture minds", "Create opportunities", "Make improvements"]} /></span></h2>
            </div>
            <div className='introduction'>
                <h1>Introduction</h1>
                <p>SRIJAN HOME SCHOOL is more than just an educational institution; it's a revolutionary concept in education. As a non-government organization, we are committed to providing quality education to students from 4th to 12th grade, completely free of charge. Our unique approach focuses on nurturing the individual talents and interests of each student, allowing them to thrive in an environment where they are free to explore and excel.</p>
                <p>At SRIJAN HOME SCHOOL, we believe in a student-centric approach where learning is not confined to textbooks and classrooms. Instead, students have the freedom to choose their own path of learning, guided by dedicated mentors who are passionate about education. Whether through self-selection or by impressing our teachers, every student at SRIJAN HOME SCHOOL has the opportunity to pursue their passions and reach their full potential.</p>
                <p>Driven by our founder, Rahul Kumar, a teacher with extensive experience in Physics and science who enjoys teaching physics to students, SRIJAN HOME SCHOOL is more than just an educational institution; it's a community where students receive not only academic guidance but also lifelong mentorship. Our focus goes beyond academic excellence; we prioritize the mental health and well-being of our students, recognizing that a healthy mind is essential for learning and growth.</p>
                <p>In our vibrant and supportive community, students not only receive guidance from their mentors but also learn from each other. Collaboration and mutual support are integral parts of our ethos, fostering an environment where students thrive academically, socially, and emotionally.</p>
                <p>Join us at SRIJAN HOME SCHOOL, where education is not just about acquiring knowledge but about empowering students to become the best versions of themselves. Experience the difference of a school where every student is valued, supported, and encouraged to dream big and achieve their goals.</p>
                <h2>How to Get an Opportunity to Study</h2>
                <p>In December and January, our founder Rahul Kumar and the SHS team dedicate time to assessing new students. Initially, we provide teaching sessions to all prospective students. Following this, we conduct a test to evaluate each student's efforts, grasping ability, and performance. Based on these assessments, we decide whether the student should proceed further.</p>
                <p><strong>Before the admission test, we will announce the exact dates of all procedures in the Announcement section.</strong></p>
            </div>
            <AdditionalInfo />
            <footer className="footer">
                <p>SRIJAN HOME SCHOOL &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default LandingPage;