import React from "react";
import { axiosPrivate } from "../api/axiosPrivate";

export default function AddEntry(props) {
  const [formData, setFormData] = React.useState({
    title: "",
    category: "",
    description: "",
    imageName: "",
    imageUrl: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

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
    props.modalOpenClose();

    axiosPrivate({
      url: "/api/save",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      data: formData,
    })
      .then(() => {
        console.log(`data has been sent to the server from axios, ${formData}`);
      })
      .then(() => {
        props.changedEntry();
      })
      .catch((error) => {
        console.log("Data could not be sent from axios" + error);
      });
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={props.modalOpenClose}>
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
            placeholder="Title Your Gratitude"
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

          <button>Add Gratitude</button>
        </form>
      </div>
    </div>
  );
}
