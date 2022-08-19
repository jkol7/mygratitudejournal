import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


export default function Nav() {

    return (

        <nav>
            <div className='titleContainer'>
            <FontAwesomeIcon icon={faBook} className="faBook" size="lg" beat/>    
            <Link to='/' style={{ textDecoration: 'none' }}>
            <h1>my gratitude journal</h1>
            </Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faSignIn}/>
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FontAwesomeIcon icon={faUser}/>
                        Register
                    </Link>
                </li>
            </ul>
        </nav>

    )

}