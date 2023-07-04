import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Typewriter = () => {
  const [currentText, setCurrentText] = useState("");

  const handleInputChange = (event) => {
    setCurrentText(event.target.value);
  };

  const handleSaveClick = () => {
    console.log("Saved:", currentText);
  };

  return (
    <div className="typewriter-container">
      <textarea
        className="typewriter-textarea"
        value={currentText}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <button className="btn btn-primary" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

const Typew = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Typewriter />
        </div>
      </div>
    </div>
  );
};

export default Typew;
