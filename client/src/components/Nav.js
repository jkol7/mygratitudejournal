import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { axiosPrivate } from '../api/axiosPrivate'
import AuthContext from '../context/AuthProvider';


export default function Nav() {


    async function handleLogout(){
        await axiosPrivate ( {
            url: '/api/users/logout',
            method: 'GET',
            headers: { "Content-Type": "multipart/form-data"},
        })
        .then(res => {
            console.log(res)
            })
        }    

    const { auth } = React.useContext(AuthContext)

    return (

        <nav>
            <div className='titleContainer'>
            <FontAwesomeIcon icon={faBook} className="faBook" size="lg" beat/>    
            <Link to='/' style={{ textDecoration: 'none' }}>
            <h1>my gratitude journal</h1>
            </Link>
            </div>
            <ul>
                { auth.accessToken && 
                <li>
                    <Link to='/logout' onClick={handleLogout}>
                    Logout
                    </Link>
                </li>
                }
                { !auth.accessToken &&
                <li>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faSignIn}/>
                        Login
                    </Link>
                </li>}
                { !auth.accessToken &&
                <li>
                    <Link to='/register'>
                        <FontAwesomeIcon icon={faUser}/>
                        Register
                    </Link>
                </li>
                 }
            </ul>
            
        </nav>

    )

}