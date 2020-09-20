import React, { useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import ModalUpload from "../../Modal/ModalUpload";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";

const RightHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    auth: { username },
  } = useAuth();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading || error) return null;
  const {
    getUser: { avatar },
  } = data;

  return (
    <>
      <div className="right-header">
        <Link to="/" alt="link to home">
          <Icon name="home" />
        </Link>
        <Icon name="plus" onClick={() => setShowModal(true)} />
        <Link to={`/${username}`} alt="link to profile">
          <Image src={avatar ? avatar : ImageNoFound} avatar alt="avatar" />
        </Link>
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
};

export default RightHeader;
