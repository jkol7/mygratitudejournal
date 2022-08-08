import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faPlane, faPerson} from '@fortawesome/free-solid-svg-icons'
import EditEntry from './EditEntry'




export default function Card (props) {

    let experience
    let iconType

    if (props.item.category === "experience"){
    experience = true
    }

    if (props.item.category === "pet"){
        iconType=faPaw
    }
    else if(props.item.category === "person"){
        iconType=faPerson
    }
    else (
        iconType=faPlane
    )


    function editClick(){
        props.editOpenClose(props.id)
        // Need to pass this props.id to edit component
        console.log("Ya it's here" + props.id)
    }

    return (
        <div className="cardmain">
         <div className="imgcontainer">
            <img src={props.item.imageUrl}></img>
            </div>   
        <div className="rightcontainer">       
            <div className="abovetitle">    
                <span><FontAwesomeIcon icon={iconType} color="#FF0AD6"/> {props.item.category.toUpperCase()}</span>
                <span onClick={editClick}>Edit</span>
            </div>

            <div className="titlemain">
                <h3>{props.item.title}</h3>
                {experience && <span>{props.item.startdate} - {props.item.enddate}</span>}
                <p>{props.item.description}</p>    
            </div>
        </div> 
        </div>
    )


}