import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./context/AuthContext.js";
import "./AddTest.css";  // Import CSS for styling

function AddTest() {
    const { loggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [testId, setTestId] = useState('');

    useEffect(() => {
        if (loggedIn) {
            axios.get("http://localhost:5000/user")
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error("Failed to fetch user:", err);
                });
        }
    }, [loggedIn]);

    if (loggedIn === false) {
        return <Navigate to="/unauthorized" />;
    }

    if (user && user.email !== "harshrajshs@gmail.com") {
        return <Navigate to="/unauthorized" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loggedIn) {
            try {
                await axios.post('http://localhost:5000/tests', { id: testId });
                setTestId('');
                alert('Test ID added successfully');
            } catch (err) {
                console.error('Failed to add test ID:', err);
                alert('Failed to add test ID');
            }
        } else {
            alert('You must be logged in to add a test ID');
        }
    };

    return (
        <div className="add-test-container">
            <h2>Add Test ID</h2>
            <form onSubmit={handleSubmit} className="add-test-form">
                <div className="form-group">
                    <label htmlFor="testId">Test ID:</label>
                    <input
                        type="text"
                        id="testId"
                        value={testId}
                        onChange={(e) => setTestId(e.target.value)}
                        placeholder="Enter Test ID"
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="submit-button">Add Test ID</button>
            </form>
        </div>
    );
}

export default AddTest;