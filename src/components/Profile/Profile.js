import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import "./Profile.scss";

const Profile = props => {
  const { username } = props;

  const result = useQuery(GET_USER, {
    variables: { username },
  });
  console.log(result);
  return (
    <>
      <h1>Profile ... </h1>
    </>
  );
};

export default Profile;
