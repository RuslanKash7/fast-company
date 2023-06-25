import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import qualityServise from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualityList();
  }, []);

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

  async function getQualityList() {
    try {
      const { content } = await qualityServise.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getQuality(id) {
    return qualities.find((q) => q._id === id);
  }

  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
        {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };
