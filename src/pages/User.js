import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../gql/publication";
import Profile from "../components/User/Profile";
import Publications from "../components/Publications";

const User = () => {
  const { username } = useParams();
  const {
    data: dataPublications,
    loading: loadingPublications,
    startPolling: startPollingPublications,
    stopPolling: stopPollingPublications,
  } = useQuery(GET_PUBLICATIONS, {
    variables: { username },
  });
  useEffect(() => {
    startPollingPublications(1000);
    return () => {
      stopPollingPublications();
    };
  }, [startPollingPublications, stopPollingPublications]);

  if (loadingPublications) return null;

  const { getPublications } = dataPublications;

  return (
    <>
      <Profile username={username} totalPublications={size(getPublications)} />
      <Publications getPublications={getPublications} />
    </>
  );
};

export default User;
