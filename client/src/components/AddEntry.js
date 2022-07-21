import React from "react"
import axios from "axios"


export default function AddEntry(props) {


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
        props.modalOpenClose()

        axios( {
            url: '/api/save',
            method: 'POST',
            data: formData
        })
        .then(() => {
            console.log('data has been sent to the server from axios')
        })
        .catch(() => {
            console.log('Data could not be sent from axios')
        })

    }


    return (
        <div className="modal">
                <div className="modal-content">
                    <span className="closeBtn" onClick={props.modalOpenClose}>&times;</span>
                    
                    <form onSubmit={handleSubmit}>

                        <select
                        id='category'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}>
                            <option value="">-- Choose Type --</option>
                            <option value='person'>Person</option>
                            <option value='pet'>Pet</option>
                            <option value='experience'>Experience</option>
                        </select>

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
                    
                        <label htmlFor="entryDesc">Entry Description</label>
                        <input 
                            type="text" 
                            id="description" 
                            name="description" 
                            size="20" 
                            placeholder="Give a Short Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <label htmlFor="entryImage">Upload image:</label>
                        <input
                            type="file" 
                            id="imageUrl" 
                            name="imageUrl" 
                            accept="image/*" 
                            file_extension=".jpg,.gif,.png"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="choosefiletext"
                        />
                    
                        <button>Add Gratitude</button>
                    </form>

                </div>      
                </div>
    )

}