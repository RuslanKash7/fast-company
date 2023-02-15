import React from "react";
import Users from "./users";
import UserPage from "./userPage";
import { useParams } from "react-router-dom";

const UsersList = () => {
  const params = useParams();

  const { userId } = params;

  return <>{userId ? <UserPage id={ userId }/> : <Users />}</>;
};

export default UsersList;
