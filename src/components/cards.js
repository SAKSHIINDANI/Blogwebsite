import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';
import CardContext from '../components/CardContext';
import { getDatabase, ref, onValue, off } from "firebase/database";
import {app,auth,database} from '../config/firebaseconfig';
import { useEffect, useState } from 'react';
const GroupExample = (event) => {

  const {cards,setCards}=React.useContext(CardContext);
    
//     useEffect(() => {
//       const db = getDatabase();
//       const contentRef = ref(db, "content");
  
//       // Listen for changes in the data
//       onValue(contentRef, (snapshot) => {
//         const data = snapshot.val();
  
//         if (data) {
//           // Convert the object of users into an array
//           const contentArray = Object.values(data);
//           console.log(contentArray);
//           setCards(contentArray);

//         }
//       });
  
//       // Clean up the listener when the component unmounts
//       return () => {
//         // Detach the listener
//         off(contentRef);
//       };
//     }, []);


  return (
    <CardGroup className="my-5">
      {cards.map((card) => (
        <Card bg="light" className="mx-3" style={{ width: '18rem' }} key={card.id}>
          <Card.Img variant="top" src={card.image} />
          <Card.Body>
            <Card.Title>
              <Link to={`/blog/${card.id}`}>{card.title}</Link>
            </Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};  

export default GroupExample;
