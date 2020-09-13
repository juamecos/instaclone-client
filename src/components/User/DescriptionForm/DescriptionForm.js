import React from "react";
import { Form, TextArea, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import { toast } from "react-toastify";
import "./DescriptionForm.scss";
const DescriptionForm = ({ currentDescription, setShowModal, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: { description: currentDescription || "" },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async formValues => {
      try {
        await updateUser({
          variables: {
            input: formValues,
          },
        });
        refetch();
        toast.success("Biografía actualizada correctamente");
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar la biografía");
      }
    },
  });
  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <TextArea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className={formik.errors.description && "error"}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default DescriptionForm;
