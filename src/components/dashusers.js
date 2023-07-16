import React, { useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { PencilSquare } from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";
import CardContext from "../components/CardContext";

const Dashusers = () => {
  const { cards } = useContext(CardContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFreeUser, setIsFreeUser] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState(new Set());

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "userdatarecords");

    // Listen for changes in the data
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the object of users into an array
        const usersArray = Object.values(data);

        setUsers(usersArray);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(usersRef);
    };
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.id === "free-user") {
      setIsFreeUser(true);
      setIsPaidUser(false);
    } else {
      setIsPaidUser(true);
      setIsFreeUser(false);
    }
  };

  const handleBlogSelection = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    const newSelectedOptions = new Set(selectedBlogs);
    selectedValues.forEach((value) => newSelectedOptions.add(value));
    setSelectedBlogs(newSelectedOptions);
  };

  const handleSave = () => {
    const updatedUser = {
      ...selectedUser,
      isFreeUser,
      isPaidUser,
      selectedBlogs,
    };

    console.log(updatedUser);
    setShowModal(false);
  };

  return (
    <div className="table-wrapper">
      <table className="table caption-top table-bordered table-striped mt-2">
        <caption className="text-white fs-4">Free Users</caption>
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Registration Date</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.RegistrationDate}</td>
              <td>
                <PencilSquare
                  onClick={() => handleEdit(user)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select User Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <div key={"inline-radio"} className="d-flex align-items-center">
                <Form.Check
                  inline
                  type="radio"
                  id="free-user"
                  label="Free User"
                  name="users"
                  checked={isFreeUser}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="paid-user"
                  label="Paid User"
                  name="users"
                  checked={isPaidUser}
                  onChange={handleCheckboxChange}
                  className="ms-2"
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Blogs</Form.Label>
              <Form.Select
                multiple
                onChange={handleBlogSelection}
                value={Array.from(selectedBlogs)}
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>

          <div>
            <h5>Selected Blogs:</h5>
            <ul>
              {selectedBlogs.size > 0 ? (
                <ul>
                  {Array.from(selectedBlogs).map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              ) : (
                <p>No options selected.</p>
              )}
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashusers;
