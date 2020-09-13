import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./EmailForm.scss";

const EmailForm = ({ currentEmail, setShowModal, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async formValues => {
      try {
        await updateUser({
          variables: {
            input: formValues,
          },
        });
        refetch();
        setShowModal(false);
        toast.success(
          `El email nuevo es ${formValues.email}. Recuerda que lo cambiaste`
        );
      } catch (error) {
        toast.error("Error al actualizar el email");
      }
    },
  });

  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        label="Escribe tu nuevo email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Button className="btn-submit" type="submit">
        Actualizar email
      </Button>
    </Form>
  );
};

export default EmailForm;
