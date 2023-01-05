import React from "react";

const BookMark = ({ status, ...rest }) => {
  return (
    <>
      {status ? (
        <i className="bi bi-bookmark-star-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </>
  );
};
export default BookMark;
