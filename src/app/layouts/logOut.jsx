import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h2>Loading</h2>;
};

export default LogOut;
