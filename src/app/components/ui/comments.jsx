import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
    console.log(data.content);
    // старый подход from useComments()
    // createComment(data);

    // совсем старый подход
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComment = (id) => {
    console.log(id);
    dispatch(removeComment(id));
    // api.comments.remove(id).then((id) => {
    //   setComments(comments.filter((x) => x._id !== id));
    // });
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  // console.log(sortedComments);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "loading from comments.jsx"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
