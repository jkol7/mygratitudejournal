import React, {useEffect} from 'react';
import {axiosPrivate} from '../api/axiosPrivate';
import axios from 'axios';

export default function EditEntry(props) {
  // Gets the data of the entry clicked

  useEffect(() => {
    const getData = async () => {
      const result = await axios(`/api/${props.id}`, {
        params: {
          id: props.id,
        },
      });
      setFormData(result.data);
    };
    getData();
  }, []);

  const [formData, setFormData] = React.useState({
    title: '',
    category: '',
    description: '',
    imageName: '',
    imageUrl: '',
  });

  const [deleteClicked, setDeleteClicked] = React.useState(false);

  function handleChange(event) {
    const {name, value} = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  // Handles image upload and sets it in form data

  function handleFile(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        imageUrl: event.target.files[0],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.editOpenClose();

    axiosPrivate({
      url: '/api/edit',
      method: 'PUT',
      headers: {'Content-Type': 'multipart/form-data'},
      withCredentials: true,
      data: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        props.changedEntry();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleDeleteClicked() {
    setDeleteClicked(!deleteClicked);
  }

  async function triggerDelete() {
    await axiosPrivate({
      url: `/api/${props.id}`,
      method: 'DELETE',
      params: {
        id: props.id,
      },
    });
    try {
      await props.changedEntry();
      await props.editOpenClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={props.editOpenClose}>
          &times;
        </span>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Choose Type --</option>
            <option value="person">Person</option>
            <option value="pet">Pet</option>
            <option value="experience">Experience</option>
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
        <div className="deleteButtonSection">
          <button id="deleteButton" onClick={toggleDeleteClicked}>
            Delete
          </button>
          {deleteClicked && (
            <>
              <p>Confirm Deletion:</p>
              <div className="confirmDelete">
                <span id="yesDelete" onClick={triggerDelete}>
                  YES
                </span>
                <span id="noDelete" onClick={toggleDeleteClicked}>
                  NO
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
