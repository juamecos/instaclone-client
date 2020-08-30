import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { decodeToken } from "../../../utils/token";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";

const RightHeader = () => {
  const {
    auth: { username },
  } = useAuth();

  return (
    <>
      <div className="right-header">
        <Link to="/" alt="link to home">
          <Icon name="home" />
        </Link>
        <Icon name="plus" />
        <Link to={`/${username}`} alt="link to profile">
          <Image src={ImageNoFound} avatar alt="place holder avatar" />
        </Link>
      </div>
    </>
  );
};

export default RightHeader;
