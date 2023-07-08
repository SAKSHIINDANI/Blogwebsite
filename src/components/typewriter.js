import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Typewriter = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTitleChange = (event) => {
    setCurrentTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setCurrentContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSaveClick = () => {
    console.log("Title:", currentTitle);
    console.log("Content:", currentContent);
    console.log("Selected File:", selectedFile);
    // Add further logic to handle the uploaded file
  };

  return (
    <div className="typewriter-container">
      <div className="form-group mt-3">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={currentTitle}
          onChange={handleTitleChange}
          placeholder="Enter title..."
        />
      </div>

      <div className="form-group mt-3">
        <label>Content</label>
        <textarea
          className="form-control"
          value={currentContent}
          onChange={handleContentChange}
          style={{ height: "200px" }}
          placeholder="Enter content..."
        />
      </div>

      <div className="form-group mt-3">
        <label>Upload File</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

const Typew = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card p-4">
            <Typewriter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typew;
