import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "./context/AuthContext.js";
import "./Profile.css";
import AddQuestion from "./AddQuestion.js";
import no_im from './people_images/man.jpg';
import resourcesData from './resources.json'; // Importing the JSON file

function Profile() {
    const [user, setUser] = useState(null);
    const [testIds, setTestIds] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { loggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showResources, setShowResources] = useState(false);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        setLinks(resourcesData);
    }, []);

    const toggleResources = () => {
        setShowResources(!showResources);
    };

    useEffect(() => {
        if (loggedIn) {
            axios.get("http://localhost:5000/user")
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch user:", err);
                });

            // Fetch test IDs
            axios.get("http://localhost:5000/tests")
                .then(res => {
                    const testIds = res.data.map(test => test.id); // Extracting only the id field
                    setTestIds(testIds);
                })
                .catch(err => {
                    console.error("Failed to fetch tests:", err);
                });
        }

        // Fetching the resources data
        setLinks(resourcesData);
    }, [loggedIn]);

    if (loggedIn === false) {
        return <Navigate to="/unauthorized" />;
    }

    if (!user) return <div>Loading...</div>;

    let userImage;
    try {
        userImage = require(`./user_image/${user.name}.jpg`);
    } catch (error) {
        userImage = no_im;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/user/${user._id}`, user);
            setEditMode(false);
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Failed to logout:", err);
        }
    };

    return (
        <div className="container">
            
            <div className="welcome">
                <h1>Welcome, {user.name}</h1>
                <button onClick={() => navigate("/")}>Back to Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="profile-container">
                <div className="profile-image">
                    <img src={userImage} alt="Profile" />
                </div>
                <div className="profile-details">
                    {editMode ? (
                        <div>
                            <p>
                                <strong>Email:</strong>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <strong>Phone:</strong>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <strong>Class Level:</strong>
                                <input
                                    type="text"
                                    name="classLevel"
                                    value={user.classLevel}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <strong>Stream:</strong>
                                <input
                                    type="text"
                                    name="stream"
                                    value={user.stream}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Class Level:</strong> {user.classLevel}</p>
                            <p><strong>Stream:</strong> {user.stream}</p>
                            <button onClick={() => setEditMode(true)}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
            {(user && user.email === "harshrajshs@gmail.com") ? (
                <div className="secret">
                    <button onClick={() => navigate("/AddQuestion")}>Add Question</button>
                    <button onClick={() => navigate("/AddTest")}>Add Test</button>
                </div>
            ) : (
                <>
                </>
            )}
            <div className={`resources ${showResources ? 'open' : ''}`}>
                <h2 onClick={toggleResources}>Physics Test Papers</h2>
                {showResources && (
                    <div className="resources-content">
                        <ul>
                            {links.map((resource, index) => (
                                <li key={index}>
                                    <a href={resource.link} target="_blank" rel="noopener noreferrer">Physics Test - {index + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="tests">
                <h2>Tests</h2>
                <div className="tests-list">
                    {testIds.length > 0 ? (
                        testIds.map(testId => (
                            <Link key={testId} to={`/test/${testId}`}>{testId}</Link>
                        ))
                    ) : (
                        <p>No tests available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;