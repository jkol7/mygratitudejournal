import React from 'react'
import axios from 'axios'


  export default function EditEntry(props){

    
    const [formData, setFormData] = React.useState(
        {
            title: "", 
            category: "",
            description: "",
            imageUrl: ""        }
    )


    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }



    function handleSubmit(event){
        event.preventDefault()
        props.editOpenClose()

        console.log(formData)
        axios( {
            url: '/api/edit',
            method: 'PUT',
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
        })
        .then(() => {
            console.log(`data has been sent to the server from axios: ${formData}`)
        })
        .catch(() => {
            console.log('Data could not be sent from axios')
        })

    }

return (
    <div className="modal">
                <div className="modal-content">
                    <span className="closeBtn" onClick={props.editOpenClose}>&times;</span>
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <label htmlFor="title">Entry Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            size="20" 
                            placeholder='Title Your Gratitude'
                            value={formData.title}
                            onChange={handleChange}
                            />
                    
                        <button>Edit Gratitude</button>
                    </form>

                </div>      
                </div>
)  
}