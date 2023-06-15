import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";
// import userService from "../services/user.service";

const httpIn = axios.create();

const InContext = React.createContext();

export const useIn = () => {
  return useContext(InContext);
};

const InProvider = ({ children }) => {
  const [error, setError] = useState(null);

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpIn.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Пользователь с таким Email не найден"
          };
          throw errorObject;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Пароль указан не правильно"
          };
          throw errorObject;
        }
      }
    }
  }
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return <InContext.Provider value={{ signIn }}>{children}</InContext.Provider>;
};

InProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default InProvider;
