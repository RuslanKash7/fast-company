import React, { useState } from "react";
import API from "../api";

const Users = () => {
  console.log(API.users.fetchAll());
  const [users, setUsers] = useState(API.users.fetchAll());
  const [qualities, setQualities] = useState(
    users.map((user) => {
      return user.qualities;
    })
  );
  console.log(qualities);
  const qualitiesNames = qualities.map((el) => {
    return el.length;
  });
  console.log(qualitiesNames);
  // console.log(users.length, users[6].name);
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user !== userId));
  };
  const renderPhrase = (number) => {
    let howManyHumans;
    if (number === 2 || number === 3 || number === 4) {
      howManyHumans = `человека`;
    } else {
      howManyHumans = `человек`;
    }
    return howManyHumans;
  };

  // const renderTable = () => {if (users.length === 0) {
  //   <div/>
  // } else {
    
  // }

  return (
    <>
      {users.length === 0 ? (
        <h1 className="badge bg-danger">{"Никто с тобой не тусанет"}</h1>
      ) : (
        <h1 className="badge bg-primary">{`${users.length} ${renderPhrase(
          users.length
        )} тусанет с тобой`}</h1>
      )}
      {/*можно переписать через функцию, ну уж ладно */}
      <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key="user._id">
                <td>{user.name}</td>
                <td>{user._id}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
  
       
    </>
  );
};

export default Users;
