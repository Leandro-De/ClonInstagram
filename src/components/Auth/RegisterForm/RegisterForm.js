import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValue(),

    validationSchema: Yup.object({
      name: Yup.string().required("Tu Nombre es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre de usuario no puede tener espacios"
        )
        .required("Nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatpassword")], "Las contraseñas no son iguales"),
      repeatpassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
    }),
    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatpassword;
        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Registro Exitoso");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">Registrate</h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y Apellido"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Repetir Contraseña"
          name="repeatpassword"
          value={formik.values.repeatpassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatpassword && true}
        />
        <Button type="submit" className="btn-submit">
          Registrate
        </Button>
      </Form>
    </>
  );
}

function initialValue() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  };
}
