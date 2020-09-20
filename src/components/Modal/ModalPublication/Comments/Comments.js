import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import ImageNoFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";
const Comments = ({ publication: { id } }) => {
  const {
    data: commentsData,
    loading: commentsLoading,
    startPolling,
    stopPolling,
  } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (commentsLoading) return null;
  const { getComments } = commentsData;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link
          to={`/${comment.idUser.username}`}
          key={index}
          className="comment"
        >
          <Image src={comment.idUser.avatar || ImageNoFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
