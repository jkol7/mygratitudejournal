import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'


export default function Nav() {

    return (

        <nav>
        <FontAwesomeIcon icon={faBook} className="faBook" size="lg" beat/>    
        <h1>my gratitude journal</h1>
        </nav>

    )

}