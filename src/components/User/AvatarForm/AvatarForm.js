import React, { useCallback, useState } from "react";
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import "./AvatarForm.scss";

const AvatarForm = ({ setShowModal, auth }) => {
  const [loading, setLoading] = useState(false);

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    // refrescar la caché para que se elimine el avatar del cliente
    update(cache) {
      // leer la query de la cache
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: {
            ...getUser,
            avatar: "",
          },
        },
      });
    },
  });

  const onDrop = useCallback(
    async acceptedFile => {
      const file = acceptedFile[0];
      try {
        setLoading(true);
        const result = await updateAvatar({ variables: { file } });
        const { data } = result;
        if (!data.updateAvatar.status) {
          toast.warning("Error al actualizar el avatar");
          setLoading(false);
        } else {
          setLoading(false);
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [updateAvatar, setShowModal]
  );

  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;
      if (!data.deleteAvatar) {
        toast.warning("Error al borrar el avatar");
      } else {
        // Cerrar modal
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={onDeleteAvatar}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
