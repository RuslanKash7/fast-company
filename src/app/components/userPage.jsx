import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
// import QualitiesList from "./qualitiesList";

const UserPage = (id) => {
  const history = useHistory();
  const handleReturn = () => {
    history.replace("/users");
  };

  const myId = id.id;

  const [userPageName, setUserPageName] = useState();
  useState(() => {
    api.users.getById(myId).then((data) => setUserPageName(data.name));
  });

  const [userPageCompletedMeetings, setUserPageCompletedMeetings] = useState();
  useState(() => {
    api.users
      .getById(myId)
      .then((data) => setUserPageCompletedMeetings(data.completedMeetings));
  });

  const [userPageRate, setUserPageRate] = useState();
  useState(() => {
    api.users.getById(myId).then((data) => setUserPageRate(data.rate));
  });

  const [userPageQualities, setUserPageQualities] = useState();
  useState(() => {
    api.users
      .getById(myId)
      .then((data) => setUserPageQualities(data.qualities));
  });

  // .map((el) => { return el.name; }) с этим качества бывает выводит...

  console.log({ userPageQualities });

  if (userPageName) {
    return (
      <>
        <h1>{userPageName}</h1>
        {/* <QualitiesList qualities={ userPageQualities } /> */}
        <h6>{`completedMeetings: ${userPageCompletedMeetings}`}</h6>
        <h3>{`Rate: ${userPageRate}`}</h3>
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

export default UserPage;
