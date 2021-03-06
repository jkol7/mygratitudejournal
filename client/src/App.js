import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import AddEntry from "./components/AddEntry"
import axios from "axios"


export default function App(){
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const [data, setData] = React.useState([])


    //Gets data from MongoDB and sets it in state

    React.useEffect(() => {
        axios.get('/api').then(res => {
          setData(res.data);
        })
      }, [data])


      
    //Maps through the data to set props

    const cards = data.map(item => {
        
        return (<Card
            key={item.id}
            item={item}
            />
        )
    })
    


    //Clicking the button to add an entry toggles this modal. So does clicking the "X" inside the modal.

    function modalOpenClose() {

        setModalOpen(prevModalOpen => !prevModalOpen)
    }


    return (
        <div className="maindiv">
        <Nav/>
        {cards}
        <div className="buttonsection">
        <button onClick={modalOpenClose}>Add New</button>
        {modalOpen && <AddEntry 
        modalOpenClose={modalOpenClose}
        data={data}/>}
        </div>
        </div>
    )

}




