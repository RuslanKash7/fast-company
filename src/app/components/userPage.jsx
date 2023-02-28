import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ id }) => {
  const history = useHistory();
  const handleReturn = () => {
    history.replace("/users");
  };

  const [userPage, setUserPage] = useState(null);

  useEffect(() => {
    api.users.getById(id).then((data) => setUserPage(data));
  }, []);

  if (userPage) {
    return (
      <>
        <h1>{userPage.name}</h1>
        <h3>{`Профессия: ${userPage.profession.name}`}</h3>
        <QualitiesList qualities={userPage.qualities} />
        <h6>{`completedMeetings: ${userPage.completedMeetings}`}</h6>
        <h3>{`Rate: ${userPage.rate}`}</h3>
        <button
          onClick={() => {
            handleReturn();
          }}
        >
          Все пользователи
        </button>
      </>
    );
  }
  return <h2>LOADING...</h2>;
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
