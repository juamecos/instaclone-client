import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderProfile.scss";

const HeaderProfile = ({ username, auth, handlerModal }) => {
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
        <Button>Seguir</Button>
      )}
    </div>
  );
};

export default HeaderProfile;
