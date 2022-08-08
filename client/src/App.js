import React from "react"
import Nav from "./components/Nav"
import Card from "./components/Card"
import AddEntry from "./components/AddEntry"
import EditEntry from './components/EditEntry'
import axios from "axios"


export default function App(){
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const [editOpen, setEditOpen] = React.useState(false)
    const [data, setData] = React.useState([])
    const [editID, setEditID] = React.useState("")


    //Gets data from MongoDB and sets it in state

    React.useEffect(() => {
        axios.get('/api').then(res => {
          setData(res.data);
        })
      }, [])



    //Maps through the data to set props
    const cards = data.map(item => {
        return (<Card
            key={item._id}
            item={item}
            editOpenClose={editOpenClose}
            id={item._id}
            />
        )
    })
    


    //Clicking the button to add an entry toggles this modal. So does clicking the "X" inside the modal.

    function modalOpenClose() {

        setModalOpen(prevModalOpen => !prevModalOpen)
    }

    function editOpenClose(selectedEntry) {
        setEditOpen(prevEditOpen => !prevEditOpen)
        setEditID(selectedEntry)
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
        {editOpen && <EditEntry 
        editOpenClose={editOpenClose}
        data={data}
        id={editID}/>}
        </div>
        </div>
    )

}




