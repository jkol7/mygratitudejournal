import React from "react"
import Nav from "./components/Nav"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import Register from './components/Register.js'

export default function App(){


    return (
        <>
        <Router>
            <div className="maindiv">
            <Nav/>    
                <Routes>
                    <Route path='/' element={<Dashboard/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </div>
        </Router>    
        </>
    )

}




