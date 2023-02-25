import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";
import SearchField from "./searchField";

const Users = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [users, setUsers] = useState();
  const [searchName, setSearchName] = useState(""); // нужен для поиска, из searchField

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

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchName(""); // добавил обнуление
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort2 = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
    setSearchName(""); // добавил обнуление
  };

  const handleOnSearch = (e) => {
    setSelectedProf(); // добавил обнуление
    setSearchName(e.target.value);
  }; // нужен для выполнеия поиска

  if (users) {
    const searchedUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    console.log(searchedUsers);

    const filteredUsers1 = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users;

    const filteredUsers = searchName
      ? searchedUsers
      : filteredUsers1;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchField searchName={searchName} onSearch={handleOnSearch} />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort2}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "   loading...";
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
