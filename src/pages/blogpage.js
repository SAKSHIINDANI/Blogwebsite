import React from 'react'
import { useParams } from 'react-router-dom';
import NavScrollExample from '../components/navbar'
import CardContext from '../components/CardContext';
const Blogpage = () => {
    const {id}=useParams();
    const {cards}=React.useContext(CardContext);
    const selectedcard=cards.find((card)=>card.id===Number(id));
  return (
    <div>
        <NavScrollExample/>
      <h1 className="text-center">{selectedcard.title}</h1>
      <img src={selectedcard.image} className="mx-auto d-block"style={{ width: '900px', height: '400px' }}></img>
      <p>{selectedcard.content}</p>
      
    </div>
  )
}

export default Blogpage
