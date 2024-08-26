import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
    return (
        <div>
            <h2>Unauthorized</h2>
            <p>You need to log in to view this page.</p>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}

export default Unauthorized;
