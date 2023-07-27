import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off, update } from "firebase/database";
import { PencilSquare } from "react-bootstrap-icons";
import { Modal, Form, Button } from "react-bootstrap";


const Dashusers = () => {
  
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFreeUser, setIsFreeUser] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [selectedBlogs, setSelectedBlogs] = useState(new Set());
  const [ setResetForm] = useState(false); // State variable to trigger form reset
  const [content, setContent] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "userdatarecords");
    const contentRef = ref(db, "content");

    // Listen for changes in the data
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the object of users into an array
        const usersArray = Object.values(data);

        setUsers(usersArray);
      }
    });
    onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contentArray = Object.values(data);
        setContent(contentArray);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(usersRef);
      off(contentRef);
    };
  }, []);
  useEffect(() => {
    if (selectedUser) {
      setIsFreeUser(selectedUser.isFreeUser);
      setIsPaidUser(selectedUser.isPaidUser);
      setSelectedBlogs(new Set(selectedUser.selectedBlogs));

      const db = getDatabase();
      const permissionsRef = ref(db, `userspermission/${selectedUser.id}`);

      onValue(permissionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSelectedBlogs(data.selectedBlogs);
          setIsFreeUser(data.isFreeUser)
          setIsPaidUser(data.isPaidUser)
        }
      });
      return () => {
        off(permissionsRef);
      };
    }
  }, [selectedUser]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
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
      isFreeUser,
      isPaidUser,
      selectedBlogs: Array.from(selectedBlogs),
    };

    const db = getDatabase();

    // Update the "userspermission" node with the user ID and permissions
    update(ref(db, `userspermission/${selectedUser.id}`), updatedUser)
      .then(() => {
        console.log(
          `Updated 'userspermission/${selectedUser.id}' node successfully`
        );
        setShowModal(false);
        setResetForm(true);
      })
      .catch((error) => {
        console.error(
          `Error updating 'userspermission/${selectedUser.id}' node:`,
          error
        );
      });

    // Update the user permissions
  };

  const handleReset = () => {
    setIsFreeUser(false);
    setIsPaidUser(false);
    setSelectedBlogs(new Set());
    setResetForm(false);
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
                  className="edit-icon"
                  onClick={() => handleEdit(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton onClick={handleReset}>
          <Modal.Title>Edit User Permissions</Modal.Title>
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
                  onChange={() => {
                    setIsFreeUser(true);
                    setIsPaidUser(false);
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  id="paid-user"
                  label="Paid User"
                  name="users"
                  checked={isPaidUser}
                  onChange={() => {
                    setIsFreeUser(false);
                    setIsPaidUser(true);
                    
                  }}
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
                {content.map((content) => (
                  <option key={content.id} value={content.currentTitle}>
                    {content.currentTitle}  
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>

          <div>
            <h5>Selected Blogs:</h5>
            <ul>
                  {Array.from(selectedBlogs).map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
            </ul>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashusers;
