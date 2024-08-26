import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "./context/AuthContext.js";
import "./TestPage.css";  // Import CSS for styling

function TestPage() {
    const { testId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [notes, setNotes] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const { loggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/results/${user._id}/${testId}`)
                .then(res => {
                    if (res.data) {
                        setResults(res.data);
                        setAnswers(Object.values(res.data.answers));
                        setNotes(Object.values(res.data.notes || {}));
                        setSubmitted(true);
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch results:", err);
                });
        }
    }, [user, testId]);

    useEffect(() => {
        axios.get(`http://localhost:5000/questions/${testId}`)
            .then(res => {
                setQuestions(res.data);
                if (!submitted) {
                    setAnswers(Array(res.data.length).fill(null));
                    setNotes(Array(res.data.length).fill(''));
                }
            })
            .catch(err => {
                console.error("Failed to fetch questions:", err);
            });
    }, [testId, submitted]);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleNoteChange = (index, value) => {
        const newNotes = [...notes];
        newNotes[index] = value;
        setNotes(newNotes);
    };

    const handleSubmit = async () => {
        const score = questions.reduce((acc, question, index) => {
            if (question.correctOption === answers[index]) {
                return acc + 1;
            }
            return acc - 1;
        }, 0);

        try {
            const result = await axios.post(`http://localhost:5000/results/${user._id}/${testId}`, {
                userId: user._id,
                testId: testId,
                answers: answers.reduce((acc, answer, index) => {
                    acc[index + 1] = answer; // Assuming questions are numbered starting from 1
                    return acc;
                }, {}),
                notes: notes.reduce((acc, note, index) => {
                    acc[index + 1] = note; // Assuming questions are numbered starting from 1
                    return acc;
                }, {}),
                score: score,
            });

            setResults(result.data);
            setSubmitted(true);
        } catch (err) {
            console.error("Failed to submit results:", err);
        }
    };

    // const handleTryAgain = () => {
    //     setAnswers(Array(questions.length).fill(null));
    //     setNotes(Array(questions.length).fill(''));
    //     setSubmitted(false);
    //     setResults(null);
    // };

    const handleSaveNotes = async () => {
        try {
            const result = await axios.put(`http://localhost:5000/results/${user._id}/${testId}/notes`, {
                notes: notes.reduce((acc, note, index) => {
                    acc[index + 1] = note; // Assuming questions are numbered starting from 1
                    return acc;
                }, {}),
            });

            setResults(result.data);
        } catch (err) {
            console.error("Failed to save notes:", err);
        }
    };

    if (!user) return <div>Loading Test Questions...</div>;
    if (!questions.length) return <div>Loading questions...</div>;

    const optionLabels = ['a', 'b', 'c', 'd'];

    return (
        <div className="test-page">
            <h2>{testId}</h2>
            {!submitted ? (
                <div className="test-container">
                    {questions.map((question, index) => (
                        <div key={index} className="question">
                            <p>Question {index + 1}: {question.questionText}</p>
                            {question.options.map((option, i) => (
                                <div
                                    key={i}
                                    className={`option ${answers[index] === i ? 'selected' : ''}`}
                                    onClick={() => handleAnswerChange(index, i)}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={i}
                                        checked={answers[index] === i}
                                        readOnly
                                    />
                                    <label>{optionLabels[i]}. {option}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            ) : (
                <div>
                    <h3>Your Score: {results.score}</h3>
                    <div className="test-container">
                        {questions.map((question, index) => (
                            <div key={index} className="question">
                                <p>Question {index + 1}: {question.questionText}</p>
                                {question.options.map((option, i) => (
                                    <div
                                        key={i}
                                        className={`option ${answers[index] === i ? (question.correctOption === i ? 'correct' : 'incorrect') : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={i}
                                            checked={answers[index] === i}
                                            readOnly
                                        />
                                        <label>{optionLabels[i]}. {option}</label>
                                        {submitted && answers[index] === i && question.correctOption === i && <span className="feedback correct-feedback">+1 Correct</span>}
                                        {submitted && answers[index] === i && question.correctOption !== i && <span className="feedback incorrect-feedback">-1 Wrong</span>}
                                        {submitted && question.correctOption === i && answers[index] !== i && <span className="feedback correct-answer">Correct Answer</span>}
                                    </div>
                                ))}
                                <textarea
                                    value={notes[index]}
                                    onChange={(e) => handleNoteChange(index, e.target.value)}
                                    placeholder="Add your note here"
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSaveNotes}>Save Notes</button>
                    {/* <button onClick={handleTryAgain}>Try Again</button> */}
                    <button onClick={() => navigate('/')}>Back to Profile</button>
                </div>
            )}
        </div>
    );
}

export default TestPage;