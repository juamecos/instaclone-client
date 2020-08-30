import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user";
import { setToken, decodeToken } from "../../../utils/token";
import "./LoginForm.scss";
import useAuth from "../../../hooks/useAuth";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("la contraseña es obligatoria"),
    }),
    onSubmit: async formData => {
      setError(""); // clean the previous error
      try {
        const {
          data: {
            login: { token }, // destructuring triple
          },
        } = await login({
          variables: {
            input: formData,
          },
        });
        setToken(token); // add token to localStorage
        setUser(decodeToken(token)); // add decoded token to context
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    },
  });
  const { email, password } = formik.values;
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Entra para ver fotos y videos de tus amigos</h2>
      <Form.Input
        type="text"
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        value={email} // to make reset
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        label="Contraseña"
        placeholder="Contraseña"
        name="password"
        value={password} // to make reset
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
      {error && <p className="submit-error">{error}</p>}
    </Form>
  );
};

export default LoginForm;

const initialValue = () => {
  return {
    email: "",
    password: "",
  };
};
