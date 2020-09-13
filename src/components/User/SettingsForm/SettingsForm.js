import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  email,
  description,
  siteWeb,
  refetch,
}) => {
  const { logout } = useAuth();
  const history = useHistory();
  const client = useApolloClient();

  const onChangePassword = () => {
    setTitleModal("Cambia tu contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambia el correo electrónico");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Actualiza tu biografía");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={description}
        refetch={refetch}
      />
    );
  };

  const onChangeSiteWeb = () => {
    setTitleModal("Actualiza tu página web");
    setChildrenModal(
      <SiteWebForm
        setShowModal={setShowModal}
        currentSiteWeb={siteWeb}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Descripción</Button>
      <Button onClick={onChangeSiteWeb}>Sitio web</Button>
      <Button onClick={onLogout}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
