import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';
import CardContext from '../components/CardContext';
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useEffect, useState } from 'react';

const GroupExample = () => {
  const { cards, setCards } = React.useContext(CardContext);

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

  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map((card) => (
          <div className="col-md-4 mb-4" key={card.id}>
            <Card bg="light" className="h-100">
              <Card.Img variant="top" src={card.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  <Link to={`/blog/${card.id}`}>{card.currentTitle}</Link>
                </Card.Title>
                <Card.Text className="flex-grow-1">{card.currentdescription}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupExample;
