import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <>
      <tr key={_id}>
        <td>{name}</td>
        <td>
          {qualities.map((qual) => (
            <Qualitie key={qual._id} {...qual} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate} /5</td>
        <td>
          <>
            <button onClick={() => onToggleBookMark(_id)}>
              <BookMark key={_id} status={bookmark} />
            </button>
          </>
        </td>
        <td>
          <button onClick={() => onDelete(_id)} className="btn btn-danger">
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
