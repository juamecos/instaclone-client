import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
} from "../../../../gql/like";
import "./Actions.scss";

const Actions = ({ publication: { id } }) => {
  const [loadingAction, setLoadingAction] = useState(false);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const {
    data: isLikeData,
    loading: isLikeLoading,
    refetch: isLikeRefetch,
  } = useQuery(IS_LIKE, {
    variables: {
      idPublication: id,
    },
  });

  const {
    data: countData,
    loading: countLoading,
    refetch: countRefetch,
  } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: id,
    },
  });

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          idPublication: id,
        },
      });
      isLikeRefetch();
      countRefetch();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idPublication: id,
        },
      });
      isLikeRefetch();
      countRefetch();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  // funcion que se ejecuta cuando el usuario hace like y evita que de mas de un like

  const onAction = () => {
    if (!loadingAction) {
      if (isLike) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (isLikeLoading || countLoading) return null;
  const { isLike } = isLikeData;
  const { countLikes } = countData;

  return (
    <div className="actions">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={onAction}
      />
      {countLikes} {countLikes === 1 ? "like" : "likes"}
    </div>
  );
};

export default Actions;
