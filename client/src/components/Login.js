import React from "react"
import { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios'
import AuthContext from '../context/AuthProvider';



export default function Login() {


    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


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
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ username, password, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
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


        <div className="mainCard">

{success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="/api">Go to Home</a>
                </p>
            </section>
        ) : (

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
                        <button>Sign In</button>
        </form>
        <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>

        </section>
        
        )}
        </div>
    )
    
}