import "bootstrap/dist/css/bootstrap.min.css";

import { app, auth, database } from "../config/firebaseconfig";
import { useState, useContext } from "react";
import {  set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { customAlphabet } from "nanoid";
 
import{uploadBytes,getDownloadURL,ref,getStorage} from "firebase/storage";

const Typewriter = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const[currentdescription,setCurrentdescription]=useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const Push = async (event) => {
    event.preventDefault();
    const generateShortId = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      6
    );
   

    const shortId = generateShortId();
    const data = fetch(
      "https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/content.json",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentTitle, currentContent,currentdescription, id: shortId }),
      }
    )
   
      .then((res) => {
        console.log(res);
        alert("Your blog is posted");
      })
      .catch((err) => {
        console.log(err);
      });

    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `files/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      data.fileURL = downloadURL;
    }

   
  };

  const handleTitleChange = (event) => {
    setCurrentTitle(event.target.value);
  };
  const handledescriptionChange = (event) => {
    setCurrentdescription(event.target.value);
  };

  const handleContentChange = (event) => {
    setCurrentContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleSaveClick = () => {
  //   console.log("Title:", currentTitle);
  //   console.log("Content:", currentContent);
  //   console.log("Selected File:", selectedFile);
  //   // Add further logic to handle the uploaded file
  // };

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
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={currentdescription}
          onChange={handledescriptionChange}
          placeholder="Enter description..."
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
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={Push}>
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
