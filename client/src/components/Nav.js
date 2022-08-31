import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { axiosPrivate } from '../api/axiosPrivate'
import AuthContext from '../context/AuthProvider';


export default function Nav() {

    const [loggedIn, setLoggedIn] = React.useState(false)


    async function handleLogout(){
        await axiosPrivate ( {
            url: '/api/users/logout',
            method: 'GET',
            headers: { "Content-Type": "multipart/form-data"},
        })
        try {
            auth.accessToken = ''
            setLoggedIn(false)
        } catch (error){
            console.log(error)
        }
        }    


    const { auth } = React.useContext(AuthContext)


    React.useEffect( () =>
        setLoggedIn(prev =>
            auth.accessToken ? prev = true : prev = false
        )
        , [auth.accessToken])


    return (
        <div className='nav-wrap'>
        <nav>
            <div className='titleContainer'>
            <FontAwesomeIcon icon={faBook} className="faBook" size="lg" beat/>    
            <Link to='/' style={{ textDecoration: 'none' }}>
            <h1>my gratitude journal</h1>
            </Link>
            </div>
            <div className='navInfo'>
            <ul>
                { loggedIn && 
                <li>
                    <Link to='/login' onClick={handleLogout}>
                    Logout
                    </Link>
                </li>
                }
                { !loggedIn &&
                <li>
                    <Link to='/login'>
                        <FontAwesomeIcon icon={faSignIn}/>
                        Login
                    </Link>
                </li>}
                { !loggedIn &&
                <li>
                    <Link to='/register'>
                        <FontAwesomeIcon icon={faUser}/>
                        Register
                    </Link>
                </li>
                 }
            </ul>
            </div>
        </nav>
        </div>
    )

}