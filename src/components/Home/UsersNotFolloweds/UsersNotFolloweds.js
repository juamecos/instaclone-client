import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./UsersNotFolloweds.scss";

const UsersNotFolloweds = () => {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);
  if (loading) return null;
  const { getNotFolloweds } = data;

  console.log(getNotFolloweds);
  return (
    <div className="users-not-followeds">
      <h3>usuarios que no sigues</h3>
      {map(getNotFolloweds, (user, index) => (
        <Link
          to={`/${user.username}`}
          key={index}
          className="users-not-followeds__user"
        >
          <Image avatar src={user.avatar || ImageNotFound} />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UsersNotFolloweds;
