import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NavScrollExample from "../components/navbar";
import CardContext from "../components/CardContext";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import "./blogpage.css";

const Blogpage = () => {
  const { id } = useParams();
  const { cards, setCards } = React.useContext(CardContext);
  const selectedcard = cards.find((card) => String(card.id) === id);

  useEffect(() => {
    const db = getDatabase();
    const contentRef = ref(db, "content");

    // Listen for changes in the data
    onValue(contentRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the object of users into an array
        const contentArray = Object.values(data);
        setCards(contentArray);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(contentRef);
    };
  } );

  if (!cards.length) {
    return <div>Loading...</div>;
  }

  if (!selectedcard) {
    return <div>Card not found.</div>;
  }

  return (
    <div>
      <NavScrollExample />

      <div>
        <h1 className="text-center">{selectedcard.currentTitle}</h1>
        <p>{selectedcard.BlogPostDate}</p>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={selectedcard.fileURL}
                className="img-fluid"
                alt="Card"
              />
            </div>
            <div className="col-md-6">
              <p className="text-justify" style={{ wordWrap: "break-word" }}>
                {selectedcard.currentContent}
              </p>
            </div>
          </div>
        </div>
      
        <div className="container mt-5">
          <h1 className="text-center">Image Comparison Slider</h1>
          <div className="row">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="image-container">
                <ImgComparisonSlider>
                  <img
                    slot="first"
                    src={selectedcard.img1Url}
                    className="img-fluid"
                    alt="First"
                  />
                  <img
                    slot="second"
                    src={selectedcard.img2Url}
                    className="img-fluid"
                    alt="Second"
                  />
                </ImgComparisonSlider>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mt-5">
          <h1 className="text-center">iframe</h1>
          <div className="row">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <iframe
                title="slider"
                width="660"
                height="415"
                src="https://google.earthengine.app/view/split-panel"
                frameBorder="0"
                allowFullScreen
              ></iframe>
        
            </div>
          </div>
          <p> </p>
        </div>
      </div>
    </div>
  );
};

export default Blogpage;
