import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NavScrollExample from '../components/navbar';
import CardContext from '../components/CardContext';
import { getDatabase, ref, onValue, off } from "firebase/database";

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

        console.log(contentArray);
        setCards(contentArray);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(contentRef);
    };
  }, []);

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
        <img src={selectedcard.image} className="mx-auto d-block" style={{ width: '900px', height: '400px' }} alt="Card" />
        <p>{selectedcard.currentContent}</p>
      </div>
    </div>
  );
};

export default Blogpage;
