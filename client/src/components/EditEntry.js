import React, { useEffect } from 'react'
import axios from 'axios'

  export default function EditEntry(props){
    

        useEffect(() => {
           const getData = async () => {
            const result = await axios.get(`/api/${props.id}`, {
            params: {
                id: props.id
            }})
        setFormData(result.data)
           }
        getData()
    }, [])

          
const [formData, setFormData] = React.useState(
    {
        title: "", 
        category: "",
        description: "",
        imageUrl: ""
        //_id: "62ed60dbdff2f3a26f4623e9"     
     }
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


    function handleFile(event) {
        setFormData(prevFormData => {
       return {
               ...prevFormData,
              imageUrl: event.target.files[0]
           }})
       }

       //application/json used to work without image

    function handleSubmit(event){
        event.preventDefault()
        props.editOpenClose()


        axios ( {
           // url: `/api/${props.data[0]._id}`,
            url: '/api/edit',
            method: 'PUT',
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
           
           
           /* params: {
            id: props.data[0]._id
        }*/
    
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
                            placeholder={formData.title}
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
                            name="imageUrl"
                            file_extension=".jpg,.gif,.png"
                            onChange={handleFile}
                            className="choosefiletext"
                        />

                        <button>Edit Gratitude</button>
                    </form>

                </div>      
                </div>
)  
}