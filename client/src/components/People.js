import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.js';
import './People.css';
import peopleData from './people.json';
import logo from './images/logo.png';
import prof from './images/prof.gif';

function People() {
    const [people, setPeople] = useState([]);
    const { loggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const loadImage = async (person) => {
            try {
                const image = await import(`${person.image}`);
                return { ...person, image: image.default };
            } catch (error) {
                console.error("Error loading image:", error);
                return { ...person, image: null }; // Handle missing image gracefully
            }
        };

        const fetchPeopleData = async () => {
            const updatedPeopleData = await Promise.all(
                peopleData.map(person => loadImage(person))
            );
            setPeople(updatedPeopleData);
        };

        fetchPeopleData();
    }, []);

    return (
        <div className="people-container">
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
            <div className='amazing3'>
                {people.map((person, index) => (
                    <div className="person-card" key={index}>
                        {person.image ? (
                            <img src={person.image} alt={person.name} className="person-image" />
                        ) : (
                            <div className="placeholder-image">Image Not Available</div>
                        )}
                        <div className="person-details">
                            <h2>{person.name}</h2>
                            <p>{person.qualification}</p>
                            <p>{person.degree}</p>
                            <p>{person.researchArea}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default People;