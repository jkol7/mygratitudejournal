import React from "react"
import Card from "./Card"
import AddEntry from "./AddEntry"
import EditEntry from './EditEntry'
import axios from "axios"
import { useEffect } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard(){
    
    const [modalOpen, setModalOpen] = React.useState(false)
    const [editOpen, setEditOpen] = React.useState(false)
    const [data, setData] = React.useState([])
    const [editID, setEditID] = React.useState("")
    const [cards, setCards] = React.useState([])


    //Gets data from MongoDB and sets it in state


    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const response = await axiosPrivate.get('/api/adminusers', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setData(response.data);;
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    /*
    React.useEffect(() => {

        axios( {
            url: '/api',
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
        ).then(res => {
          setData(res.data);
        })
      }, [])
*/


    //Maps through the data to set props


    React.useEffect(() => {

        setCards(data.map(item => {
            return (<Card
                key={item._id}
                item={item}
                editOpenClose={editOpenClose}
                id={item._id}
                />
            )}))
    }, [data])

  
   function changedEntry(){

    axios.get('/api', {withCredentials: true} ).then(res => {
        setData(res.data);
      })

   } 


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
        {cards}
        <div className="buttonsection">
        <button onClick={modalOpenClose}>Add New</button>
        {modalOpen && <AddEntry 
        modalOpenClose={modalOpenClose}
        changedEntry={changedEntry}/>}
        {editOpen && <EditEntry 
        editOpenClose={editOpenClose}
        id={editID}
        changedEntry={changedEntry}/>}
        </div>
        </div>
    )

}




