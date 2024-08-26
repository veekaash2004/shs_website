import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./context/AuthContext.js";
import "./AddQuestion.css";  // Import CSS for styling

const OptionInput = ({ index, value, onChange }) => (
    <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="option-input"
    />
);

const QuestionForm = ({ question, index, handleQuestionChange, handleOptionChange, handleAddOption }) => (
    <div className="question-form">
        <h3>Question {index + 1}</h3>
        <div className="form-group">
            <label>Test ID:</label>
            <input
                type="text"
                value={question.testId}
                onChange={(e) => handleQuestionChange(index, 'testId', e.target.value)}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Question Text:</label>
            <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                className="form-control"
            />
        </div>
        <div className="form-group">
            <label>Options:</label>
            {question.options.map((option, optIndex) => (
                <OptionInput
                    key={optIndex}
                    index={optIndex}
                    value={option}
                    onChange={(optIndex, value) => handleOptionChange(index, optIndex, value)}
                />
            ))}
            <button type="button" onClick={() => handleAddOption(index)} className="add-option-button">Add Option</button>
        </div>
        <div className="form-group">
            <label>Correct Option:</label>
            <select
                value={question.correctOption}
                onChange={(e) => handleQuestionChange(index, 'correctOption', parseInt(e.target.value))}
                className="form-control"
            >
                {question.options.map((option, optIndex) => (
                    <option key={optIndex} value={optIndex}>{`Option ${optIndex + 1}`}</option>
                ))}
            </select>
        </div>
    </div>
);

function AddQuestion() {
    const { loggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([
        {
            testId: "",
            questionText: "",
            options: ["", ""],
            correctOption: 0,
        }
    ]);

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

    const handleQuestionChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options.push("");
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            testId: "",
            questionText: "",
            options: ["", ""],
            correctOption: 0,
        }]);
    };

    const handleFinalSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/bulk`, { questions });
            console.log("Questions added successfully:", response.data);
            setQuestions([{
                testId: "",
                questionText: "",
                options: ["", ""],
                correctOption: 0,
            }]);
        } catch (err) {
            console.error("Failed to submit questions:", err);
        }
    };

    return (
        <div className="add-question-container">
            <h2>Add Questions</h2>
            {questions.map((question, index) => (
                <QuestionForm
                    key={index}
                    question={question}
                    index={index}
                    handleQuestionChange={handleQuestionChange}
                    handleOptionChange={handleOptionChange}
                    handleAddOption={handleAddOption}
                />
            ))}
            <button onClick={handleAddQuestion} className="add-question-button">Add Another Question</button>
            <button onClick={handleFinalSubmit} className="final-submit-button">Submit All Questions</button>
        </div>
    );
}

export default AddQuestion;