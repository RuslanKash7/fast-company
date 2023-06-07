import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities: id }) => {
  const { isLoading, getQuality } = useQuality();

  if (!isLoading) {
    const q = id.map((i) => getQuality(i));
    return (
      <>
        {q.map((qual) => (
          <Quality key={qual._id} {...qual} />
        ))}
      </>
    );
  } else return "loading...";
};

QualitiesList.propTypes = {
  qualities: PropTypes.array,
  id: PropTypes.string
};

export default QualitiesList;
