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
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("api/generateinspiration");
      console.log(result);
      setInspirationData(result.data);
    };
    getData();
  }, []);

  function getInspiration() {
    const getData = async () => {
      const result = await axios.get("api/generateinspiration");
      console.log(result);
      setInspirationData((prev) => (prev = result.data));
      setCounter((prev) => (prev = prev + 1));
      console.log(counter);
    };
    getData();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="closeBtn" onClick={toggleInspiration}>
          &times;
        </span>
        <div className="modal-content-inspiration">
          <h2>Inspirational Prompts</h2>
          <p>{inspirationData}</p>

          {counter < 10 ? (
            <button className="landing-top-button" onClick={getInspiration}>
              Inspire Me
            </button>
          ) : (
            <h4>
              Now it's time to act on your inspiration. Please wait and try
              again in 10 minutes.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
