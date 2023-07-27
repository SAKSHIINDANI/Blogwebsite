import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import CardContext from "../components/CardContext";
import UserContext from "../components/UserContext";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getStorage } from "firebase/storage";

const GroupExample = () => {
  const { cards, setCards } = React.useContext(CardContext);
  const [loading, setLoading] = useState(true);
  const [usersPermission, setUsersPermission] = useState([]);
  const { user, setUser } = React.useContext(UserContext);

  useEffect(() => {
    const fetchUserData = () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const storage = getStorage();

        const userspermissionRef = ref(db, `userspermission/${user.id}`);
        onValue(userspermissionRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const selectedBlogs = data.selectedBlogs;
            setUsersPermission(selectedBlogs);
          }
        });

        const contentRef = ref(db, "content");
        onValue(contentRef, async (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const contentArray = Object.values(data);
            setCards(contentArray);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      const db = getDatabase();
      const contentRef = ref(db, "content");
      off(contentRef);
    };
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {cards.map(
          (card) =>
            usersPermission?.includes(card.currentTitle) && (
              <div className="col-md-4 mb-4" key={card.id}>
                <Card bg="light" className="h-100">
                  <Card.Img variant="top" src={card.fileURL} />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Link to={`/blog/${card.id}`}>{card.currentTitle}</Link>
                    </Card.Title>
                    <Card.Text className="flex-grow-1">
                      {card.currentdescription}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default GroupExample;
