import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import userAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/png/avatar.png";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import "./Profile.scss";

const Profile = ({ username }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);
  const { auth } = userAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });
  if (loading) return null;
  if (error) return <UserNotFound />;

  const {
    getUser: { id, name, email, siteWeb, description, avatar },
  } = data;

  const handlerModal = type => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={avatar ? avatar : ImageNoFound}
            avatar
            onClick={() => username === auth.username && handlerModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <div>HeaderProfile</div>
          <div>Followers</div>
          <div className="other">
            <p className="name">{name}</p>
            {siteWeb && (
              <a
                href={siteWeb}
                className="siteWeb"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteWeb}
              </a>
            )}
            {description && <p className="description">{description}</p>}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
