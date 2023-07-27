import "bootstrap/dist/css/bootstrap.min.css";

import { app } from "../config/firebaseconfig";
import { useState,  } from "react";


import { customAlphabet } from "nanoid";

import {
  uploadBytes,
  getDownloadURL,
  ref ,
  getStorage,
} from "firebase/storage";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { useEffect } from "react";
import { getDatabase, onValue, off,  ref as dataRef } from "firebase/database";

const Typewriter = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [currentdescription, setCurrentdescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Img1, setImg1] = useState(null);
  const [Img2, setImg2] = useState(null);
  const [Iframe, setIframe] = useState("");

  const Push = async (event) => {
    event.preventDefault();
    const generateShortId = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      6
    );
    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `files/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const filedownloadURL = await getDownloadURL(storageRef);

      if (Img1) {
        const img1StorageRef = ref(storage, `files/${Img1.name}`);
        await uploadBytes(img1StorageRef, Img1);
        var img1DownloadURL = await getDownloadURL(img1StorageRef);
      }

      // Upload Img2 and obtain its download URL
      if (Img2) {
        const img2StorageRef = ref(storage, `files/${Img2.name}`);
        await uploadBytes(img2StorageRef, Img2);
        var img2DownloadURL = await getDownloadURL(img2StorageRef);
      }

      const BlogPostDate = new Date().toISOString().split("T")[0];

      const shortId = generateShortId();
      const data = fetch(
        "https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/content.json",

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentTitle,
            currentContent,
            currentdescription,
            id: shortId,
            fileURL: filedownloadURL,
            img1Url: img1DownloadURL,
            img2Url: img2DownloadURL,
            Iframe,
            BlogPostDate,
          }),
        }
      )
        .then((res) => {
          console.log(res);
          alert("Your blog is posted");
        })
        .catch((err) => {
          console.log(err);
        });
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
  const handleImg1Change = (event) => {
    setImg1(event.target.files[0]);
  };
  const handleImg2Change = (event) => {
    setImg2(event.target.files[0]);
  };
  const handleIframeChange = (event) => {
    setIframe(event.target.value);
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
      <div className="form-group mt-3">
        <label>Upload Slider Img 1</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImg1Change}
        />
      </div>
      <div className="form-group mt-3">
        <label>Upload Slider Img 2</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImg2Change}
        />
      </div>
      <div className="form-group mt-3">
        <label>Iframe</label>
        <input className="form-control" onChange={handleIframeChange} />
      </div>

      <button className="btn btn-primary mt-3" onClick={Push}>
        Save
      </button>
    </div>
  );
};

const Typew = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        console.log(db);
        const contentRef = dataRef(db, "content");
        

        onValue(contentRef, (snapshot) => {
           const data = snapshot.val();
           if (data) {
            const contentArray = Object.values(data);
            setContent(contentArray);
          }

        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      const db = getDatabase();
      const contentRef = dataRef(db, "content");
      off(contentRef);
    };
  }, []);

  const handleToggle = () => {
    setShowTypewriter(!showTypewriter);
  };

  const handleEdit = () => {
    setShowTypewriter(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-2 mb-2 ">
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton id="tbg-radio-1" value={1} onClick={handleToggle}>
            Create New Blog
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value={2} onClick={handleEdit}>
            Edit Blog
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card p-4">
              {showTypewriter ? (
                <Typewriter />
              ) : (
                
                <ul>
                  {content.map((content,idx) => (
                    <li key={idx}>{content.currentTitle}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typew;
