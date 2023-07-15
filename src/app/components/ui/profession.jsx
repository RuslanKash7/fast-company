import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus,
  loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getProfessionsLoadingStatus());

  const professions = useSelector(getProfessions());
  useEffect(() => {
    dispatch(loadProfessionsList());
  }, []);

  if (!isLoading) {
    const prof = professions.find((p) => p._id === id);
    return <p>{prof.name}</p>;
  } else return "loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
