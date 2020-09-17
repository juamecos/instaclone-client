import React from "react";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";

const HeaderProfile = ({ username, auth, handlerModal }) => {
  const [follow] = useMutation(FOLLOW);
  const [unFollow] = useMutation(UNFOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: {
      username: username,
    },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className="btn-danger" onClick={onUnFollow}>
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button className="btn-action" onClick={onFollow}>
          Seguir
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username: username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === auth.username ? (
        <Button
          onClick={() => username === auth.username && handlerModal("settings")}
        >
          Ajustes
        </Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;
