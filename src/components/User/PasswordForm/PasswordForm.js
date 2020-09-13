import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";

const PasswordForm = ({ logout }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async formValues => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValues.currentPassword,
              newPassword: formValues.newPassword,
            },
          },
        });

        if (!result.data.updateUser) {
          toast.error("Error al cambiar la contraseña");
        } else {
          toast.success("Contraseña cambiada satisfactoriamente");
          logout();
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        name="currentPassword"
        label="Contraseña actual"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        name="newPassword"
        label="Nueva contraseña"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        name="repeatNewPassword"
        label="Repite nueva contraseña"
        value={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default PasswordForm;

const initialValues = () => {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
};
