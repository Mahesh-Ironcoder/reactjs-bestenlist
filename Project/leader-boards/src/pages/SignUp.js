import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export function SignUp() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneno, setPhoneNo] = useState("")
    return (
        <div className="box-wrapper">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Phone no" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Confirm Password" />
            <button >Sign Up</button>
            <Link to="/signin"> Already have an account!</Link>
        </div>
    )
}