import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./SiteWebForm.scss";
import { toast } from "react-toastify";

const SiteWebForm = ({ currentSiteWeb, setShowModal, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: { siteWeb: currentSiteWeb || "" },
    validationSchema: Yup.object({
      siteWeb: Yup.string().required(),
    }),
    onSubmit: async formValues => {
      try {
        await updateUser({
          variables: {
            input: formValues,
          },
        });
        toast.success("Página web actializada con éxito");
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar página web");
      }
    },
  });

  return (
    <Form className="siteweb-form">
      <Form.Input
        name="siteWeb"
        label="Cambia tu página web"
        value={formik.values.siteWeb}
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        className="btn-submit"
        onClick={formik.handleSubmit}
      >
        Actualiza
      </Button>
    </Form>
  );
};

export default SiteWebForm;
