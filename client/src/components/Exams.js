import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.js';
import './Exams.css';
import examsData from './exams.json';
import logo from './images/logo.png';
import prof from './images/prof.gif';

function Exams() {
    const { loggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [expandedExams, setExpandedExams] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);


    const toggleDetails = (index) => {
        setExpandedExams(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

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
            <h1 className="oh">👉Details of Exams to Focus👈</h1>
            <div className="exams-container">
                {examsData.map((exam, index) => (
                    <div key={index} className="exam-card">
                        <div className="exam-header">
                            <h2>{exam.exam_name}</h2>
                            <button className="read-more-btn" onClick={() => toggleDetails(index)}>
                                {expandedExams[index] ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                        {expandedExams[index] && (
                            <div className="exam-details">
                                <p><strong>Type:</strong> {exam.exam_type}</p>
                                <p><strong>Level:</strong> {exam.exam_level}</p>
                                <p><strong>Purpose:</strong> {exam.exam_purpose}</p>
                                <p><strong>Subjects:</strong> {exam.exam_subjects.join(', ')}</p>
                                <p><strong>Eligibility Criteria:</strong></p>
                                <ul>
                                    <li>Minimum Age: {exam.eligibility_criteria.minimum_age}</li>
                                    <li>Educational Qualification: {exam.eligibility_criteria.educational_qualification}</li>
                                    <li>Required Percentage: {exam.eligibility_criteria.required_percentage}</li>
                                    <li>Number of Attempts: {exam.eligibility_criteria.number_of_attempts}</li>
                                </ul>
                                <p><strong>Exam Pattern:</strong></p>
                                <ul>
                                    <li>Mode: {exam.exam_pattern.mode}</li>
                                    <li>Duration: {exam.exam_pattern.duration}</li>
                                    <li>Total Papers: {exam.exam_pattern.total_papers}</li>
                                    <li>Total Questions: {exam.exam_pattern.total_questions}</li>
                                    <li>Question Types: {exam.exam_pattern.question_types.join(', ')}</li>
                                </ul>
                                <p><strong>Important Dates:</strong></p>
                                <ul>
                                    <li>Registration Start Date: {exam.important_dates.registration_start_date}</li>
                                    <li>Registration End Date: {exam.important_dates.registration_end_date}</li>
                                    <li>Exam Date: {exam.important_dates.exam_date}</li>
                                </ul>
                                <p><strong>Official Website:</strong> <a href={exam.official_website} target="_blank" rel="noopener noreferrer">{exam.official_website}</a></p>
                                <p><strong>Additional Information:</strong> {exam.additional_information}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Exams;