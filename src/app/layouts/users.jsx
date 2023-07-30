import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUser from "../components/page/editUser";
import UserLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";
import { useSelector } from "react-redux";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UserLoader>
          {userId ? (
            edit ? (
              userId === currentUserId ? (
                <EditUser />
              ) : (
                <Redirect to={`/users/${currentUserId}/edit`} />
              )
            ) : (
              <UserPage userId={userId} />
            )
          ) : (
            <UsersListPage />
          )}
      </UserLoader>
    </>
  );
};

export default Users;
