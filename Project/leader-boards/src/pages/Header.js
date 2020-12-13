import React from 'react'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li id="welcome-link">
                        <Link to="/">Home</Link>
                    </li>
                    <h1 className="header">Quizzholics</h1>
                    <li id="signin-link">
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li id="signup-link">
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
