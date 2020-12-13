import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    return (
        <div className="box-wrapper">
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
            <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
            <button >Sign in</button>
            <Link to="/signup"> Sign Up Here</Link>
        </div>
    )
}