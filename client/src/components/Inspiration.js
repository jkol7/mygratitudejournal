import React from "react";
import { InspirationContext } from "../context/InspirationProvider";
import { useEffect } from "react";
import axios from "axios";

const Inspiration = () => {
  const toggleInspiration = () => {
    return setInspiration((prev) => !prev);
  };

  const { setInspiration } = React.useContext(InspirationContext);
  const [inspirationData, setInspirationData] = React.useState("");

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`api/generate-inspiration`);
      console.log(result);
      setInspirationData(result.data);
    };
    getData();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={toggleInspiration}>
          &times;
        </span>
        <div className="modal-content-inspiration">
          <h2>Seeking Inspiration?</h2>
          <p>{inspirationData}</p>
          <button className="landing-top-button ">Inspire Me</button>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
