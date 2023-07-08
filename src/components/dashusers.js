import React, { useContext, useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { app, auth, database } from "../config/firebaseconfig";

const Dashusers = () => {
  const [users, setUsers] = useState([]);

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
    console.log(users);
    // Clean up the listener when the component unmounts
    return () => {
      // Detach the listener
      off(usersRef);
    };
  }, []);

  return (
    <div>
      <table className="table caption-top bg-white rounded mt-2">
        <caption className="text-white fs-4">Free Users</caption>
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.RegistrationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashusers;
