import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';
import CardContext from '../components/CardContext';

const GroupExample = () => {
    const {cards}=React.useContext(CardContext);

console.log(cards);
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
