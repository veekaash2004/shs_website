import React, { createContext, useEffect, useState } from "react";
import axios from "axios";  

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    async function getLoggedIn() {
        const loggedInRes = await axios.get("http://localhost:5000/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    async function logout() {
        try {
            await axios.get("http://localhost:5000/logout");
            setLoggedIn(false);
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    }

    useEffect(() => {
        getLoggedIn(); 
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext
export  {AuthContextProvider};