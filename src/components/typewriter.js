import React, { useState, useEffect } from "react";
import { getDatabase, ref as dataRef, onValue, off } from "firebase/database";
import { PencilSquare } from "react-bootstrap-icons";
import Typewriter from "./createtypewriter";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Typew = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [content, setContent] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  
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
    setSelectedBlog(null);
    setShowTypewriter(true);
  };
  const handleEdit = () => {
    setShowTypewriter(false);
  };
  const handleBlogEdit = (content) => {
    setSelectedBlog(content);
    
    
    setShowTypewriter(true);
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
                <Typewriter content={selectedBlog} />
              ) : (
                <div className="table-wrapper">
                  <table className="table caption-top table-bordered table-striped mt-2">
                    <thead>
                      <tr>
                        <th scope="col">Blogs</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.map((content, idx) => (
                        <tr key={idx}>
                          <td>{content.currentTitle}</td>
                          <td>
                            <PencilSquare
                              className="edit-icon"
                              onClick={()=>handleBlogEdit(content)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typew;
