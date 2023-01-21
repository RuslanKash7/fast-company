import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const doToggle = users.map((el) => {
      if (el._id === id) {
        el.bookmark = !el.bookmark;
      }
      return el;
    });
    setUsers(doToggle);
  };

  return (
    <div>
      {users && (<Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />)}
    </div>
  );
}

export default App;
