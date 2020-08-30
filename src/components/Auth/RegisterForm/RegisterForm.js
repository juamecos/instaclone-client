import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";

import "./RegisterForm.scss";

const RegisterForm = props => {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      name: Yup.string().required("Tu nombre es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre de usuario no puede tener espacio ni caractacteres especiales"
        )
        .required("El nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    onSubmit: async formData => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;
        // TODO production remove (check if it can work as it is or needs to be as not commented)
        // const results = await register({
        //   variables: {
        //     input: newUser,
        //   },
        // });
        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario registrado correctamente");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    },
  });

  const { name, username, email, password, repeatPassword } = formik.values;

  return (
    <>
      <h2 className="register-form-title">
        Regístrate para ver fotos y videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
          name="name"
          value={name}
          onChange={formik.handleChange}
          error={formik.errors.name && true} // El true evita que aparezca el mensaje de error
        />
        <Form.Input
          type="text"
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          name="username"
          value={username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          name="email"
          value={email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          label="Contraseña"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          label="Repite contraseña"
          placeholder="Repite contraseña"
          name="repeatPassword"
          value={repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword && true}
        />
        <Button className="btn-submit">Registrarse</Button>
      </Form>
    </>
  );
};

export default RegisterForm;

const initialValue = () => {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
};
