import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Error from "./Error";
import Axios from "../config/axios";

import * as yup from "yup";
import uuid from "uuid/dist/v4";
import Swal from "sweetalert2";

const Registrate = () => {
  const [usuario, setUsuario] = useState({});
  const [mensajesError, setMensajesError] = useState([]);

  const { todosLosUsuarios, setAxiosError, axiosError } = useContext(
    UserContext
  );

  const histoty = useHistory();

  const obtenerDataUsuario = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  let schema = yup.object().shape({
    nombre: yup.string().trim().required("el usuario es requerido"),
    password: yup
      .string()
      .required("Password es requerido")
      .min(8, "Password debe tener al menos 8 caracteres")
      .matches(/[a-zA-Z]/, "Password solo admite letras"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], " password es incorrecto"),
    email: yup
      .string()
      .required("El email es oblogatorio")
      .email("El email tiene formato incorrecto"),
    edad: yup
      .number()
      .required("Edad es obligatoria")
      .positive()
      .integer()
      .min(18, "Debe ser mayor de 18 años"),
    ocupacion: yup.string(),
  });

  const handleClick = (e) => {
    e.preventDefault();

    const usuarioTransformado = { ...usuario };
    Object.keys(usuarioTransformado).forEach((key) => {
      usuarioTransformado[key] = usuarioTransformado[key].trim();
    });

    schema
      .validate(usuarioTransformado, { abortEarly: false })
      .then((valid) => {
        const validarSiExisteUsuario = todosLosUsuarios.find(
          (elem) =>
            elem.nombre.toLowerCase() ===
            usuarioTransformado.nombre.toLowerCase()
        );

        if (validarSiExisteUsuario) {
          return alert("Ya existe un usuario con nombre");
        }

        delete usuarioTransformado.password2;

        usuarioTransformado.id = uuid();

        setMensajesError(null);

        try {
          Axios.post("/", usuarioTransformado).then(() => {
            Swal.fire("Registro exitoso!");

            histoty.push("/");
          });
        } catch (error) {
          setAxiosError(true);
        }
      })

      .catch((errors) => {
        setMensajesError(errors.errors);
      });
  };

  return (
    <>
      <div className="container-registrate">
        {axiosError ? (
          <Error
            className="axios-mensaje-error"
            mensajeError="Algo salio mal!!"
          />
        ) : null}

        <h2 className="subtitulo">Registrate</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              placeholder="Usuario"
              onChange={obtenerDataUsuario}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Correo"
              onChange={obtenerDataUsuario}
            />
          </div>
          <div className="form-group">
            <input
              name="profesión"
              type="text"
              placeholder="Profesión"
              onChange={obtenerDataUsuario}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={obtenerDataUsuario}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Repetir Contraseña"
              name="password2"
              onChange={obtenerDataUsuario}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Edad"
              name="edad"
              onChange={obtenerDataUsuario}
            />
          </div>
          <input className="submit" type="submit" onClick={handleClick} />
          <div className="contrainer-mensajeError">
            {mensajesError
              ? mensajesError.map((error) => (
                  <div className="mensaje-error">
                    <p> {error} </p>
                  </div>
                ))
              : null}
          </div>
        </form>
        <div className="enlace">
          <p>¿Ya tienen una cuenta?</p>
          <Link to="/">
            <p> Iniciar Sesión</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registrate;
