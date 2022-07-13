import React from "react"
import Nav from "./components/Nav"
import data from "./data"
import Card from "./components/Card"
import ReactDOM from 'react-dom'


export default function App(){
    
    const cards = data.map(item => {
        
        return (<Card
            key={item.id}
            item={item}
            />
        )
    })
    
    return (
        <div className="maindiv">
        <Nav/>
        {cards}
        <div className="buttonsection">
        <button>Add New</button>
        </div>
        </div>
    )

}




