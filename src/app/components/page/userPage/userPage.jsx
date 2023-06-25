import React from "react";
import PropTypes from "prop-types";
// import api from "../../../api"; это способ получения данных из апи
import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
  // const [user, setUser] = useState(); это способ получения данных из апи

  // useEffect(() => {
  //   api.users.getById(userId).then((data) => setUser(data));
  // }, []); это способ получения данных из апи

  const { getUserById } = useUser();
  const user = getUserById(userId);
  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
        </div>
      </div>
    );
  } else {
    return "loading...";
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
