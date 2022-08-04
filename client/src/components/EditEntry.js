import React from 'react'
import axios from 'axios'


  export default function EditEntry(props){

    console.log(props.data[0]._id)
    
  
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

        axios ( {
            url: `/api/${props.data[0]._id}`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            data: {
                title: `${formData.title}`, 
                category: `${formData.category}`,
                description: `${formData.description}`,
                imageUrl: `${props.data[0].imageUrl}`
        },
        params: {
            id: props.data[0]._id
        }
    
    })
        .then(() => {
            console.log(`data has been sent to the server from axios: ${props.data[0]._id}`)
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

                        <button>Edit Gratitude</button>
                    </form>

                </div>      
                </div>
)  
}