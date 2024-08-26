import React from 'react';
import Login from './components/Login.js';
import Register from './components/Register.js';
import About from './components/About.js';
import People from './components/People.js';
import Exams from './components/Exams.js';
import Profile from './components/Profile.js';
import LandingPage from './components/LandingPage.js';
import Unauthorized from './components/Unauthorized.js';
import AddQuestion from './components/AddQuestion.js';
import ResultBanner from './components/ResultBanner.js';
import AddTest from './components/AddTest.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { AuthContextProvider } from './components/context/AuthContext.js';
import TestPage from './components/TestPage';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="/People" element={<People />} />
          <Route path="/Exams" element={<Exams />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/AddQuestion" element={<AddQuestion />} />
          <Route path="/AddTest" element={<AddTest />} />
          <Route path="/ResultBanner" element={<ResultBanner />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;