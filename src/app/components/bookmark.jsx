import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status }) => {
  return (
    <>
      {status ? (<i className="bi bi-bookmark-star-fill"></i>) : (<i className="bi bi-bookmark"></i>)}
    </>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired
};

export default BookMark;
