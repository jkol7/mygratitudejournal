import React from "react"
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthProvider';




export default function Login() {


    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"


    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    // Sets initial focus state

    useEffect(() => {
        userRef.current.focus();
    }, [])


    // Clears error message when input is changed

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/login',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("Here's the token" + JSON.stringify(response.data.accessToken));
            const accessToken = response?.data?.accessToken;
            setAuth({ username, password, accessToken });
            setUser('');
            setPwd('');
            navigate(from, {replace: true})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (

        <div className="maindiv">
        <section className="registerForm">


        <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

<label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                <button disabled={!username || !password ? true : false}>Sign In</button>
        </form>
        <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to='/register'>Sign Up</Link>
                        </span>
                    </p>

        </section>
        </section>
        </div>
    )
    
}