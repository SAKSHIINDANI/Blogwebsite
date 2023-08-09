import 'bootstrap/dist/css/bootstrap.min.css';
import { app } from '../config/firebaseconfig';
import { useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';
import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage';

const Typewriter = ({ content, edit }) => {
  const [currentTitle, setCurrentTitle] = useState(
    content ? content.currentTitle : ''
  );
  const [currentContent, setCurrentContent] = useState(
    content ? content.currentContent : ''
  );
  const [currentdescription, setCurrentdescription] = useState(
    content ? content.currentdescription : ''
  );
  const [selectedFile, setSelectedFile] = useState(
    content ? content.fileURL : ''
  );
  const [blogId, setBlogId] = useState(content ? content.id : '');
  const [Img1, setImg1] = useState(content ? content.img1Url : '');
  const [Img2, setImg2] = useState(content ? content.img2Url : '');
  const [Iframe, setIframe] = useState(content ? content.Iframe : '');

  useEffect(() => {
    if (content) {
      if (!currentTitle) {
        setCurrentTitle(content.currentTitle);
      }
      if (!currentContent) {
        setCurrentContent(content.currentContent);
      }
      if (!currentdescription) {
        setCurrentdescription(content.currentDescription);
      }
      if (!Iframe) {
        setIframe(content.Iframe);
      }
      if (!selectedFile) {
        fetch(content.fileURL)
          .then((res) => res.blob())
          .then((blob) => {
            setSelectedFile(new File([blob], 'file'));
          });
        // setSelectedFile(content.fileURL);
      }
      if (!Img1) {
        fetch(content.img1Url)
          .then((res) => res.blob())
          .then((blob) => {
            setImg1(new File([blob], 'file'));
          });
        // setImg1(content.img1Url);
      }
      if (!Img2) {
        fetch(content.img2Url)
          .then((res) => res.blob())
          .then((blob) => {
            setImg2(new File([blob], 'file'));
          });
        // setImg2(content.img2Url);
      }
      if (!blogId) {
        setBlogId(content.id);
      }
    }
  }, [
    content,
    currentTitle,
    currentContent,
    currentdescription,
    Iframe,
    selectedFile,
    Img1,
    Img2,
    blogId,
  ]);

  const Push = async (event) => {
    event.preventDefault();
    const generateShortId = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
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
      if (Img2) {
        const img2StorageRef = ref(storage, `files/${Img2.name}`);
        await uploadBytes(img2StorageRef, Img2);
        var img2DownloadURL = await getDownloadURL(img2StorageRef);
      }
      const BlogPostDate = new Date().toISOString().split('T')[0];
      const shortId = generateShortId();
      if (edit) {
        console.log(filedownloadURL);
        fetch(
          `https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/content/${blogId}.json`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              currentTitle,
              currentContent,
              currentdescription,
              id: blogId,
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
            alert('The blog has been edited successfully');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(filedownloadURL);
        fetch(
          `https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/content/${shortId}.json`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
            alert('Your blog is posted');
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          style={{ height: '200px' }}
          placeholder="Enter content..."
        />
      </div>
      <div className="form-group mt-3">
        <label>Upload File</label>
        <img className="img-fluid" src={selectedFile} alt="" />
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div className="form-group mt-3">
        <label>Upload Slider Img 1</label>
        <img className="img-fluid" src={Img1} alt="" />
        <input
          type="file"
          className="form-control"
          onChange={handleImg1Change}
        />
      </div>
      <div className="form-group mt-3">
        <label>Upload Slider Img 2</label>
        <img className="img-fluid" src={Img2} alt="" />
        <input
          type="file"
          className="form-control"
          onChange={handleImg2Change}
        />
      </div>
      <div className="form-group mt-3">
        <label>Iframe</label>
        <input
          className="form-control"
          onChange={handleIframeChange}
          value={Iframe}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={Push}>
        Save
      </button>
    </div>
  );
};
export default Typewriter;
