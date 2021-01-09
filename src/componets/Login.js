import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { Link, useHistory } from "react-router-dom";

import * as yup from "yup";

const Login = () => {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [mensajesError, setMensajesError] = useState([]);

  const {
    todosLosUsuarios,
    obtenerTodosLosUsuarios,
    setUsuarioLogeado,
  } = useContext(UserContext);

  const obtenerDataUsuario = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  let schema = yup.object().shape({
    nombre: yup.string().trim().required("el usuario es requerido"),
    password: yup.string().required("Password es requerido"),
  });

  const handleClick = (e) => {
    e.preventDefault();

    schema
      .validate(usuario, { abortEarly: false })
      .then((valid) => {
        const usuarioLogueado = todosLosUsuarios.find((elem) => {
          return (
            elem.nombre.toLowerCase() === usuario.nombre.toLowerCase() &&
            elem.password === usuario.password
          );
        });

        setMensajesError(null);

        setUsuarioLogeado(usuarioLogueado);

        if (usuarioLogueado) {
          history.push("/users");
        } else {
          alert("Datos Incorectos");
        }
      })

      .catch((errors) => {
        setMensajesError(errors.errors);
      });
  };

  useEffect(() => {
    obtenerTodosLosUsuarios();
  }, [obtenerTodosLosUsuarios]);

  return (
    <div className="container-login">
      <h2 className="subtitulo">Iniciar Sesión</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuario"
            name="nombre"
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
        <input className="submit" type="submit" onClick={handleClick} />
        {mensajesError
          ? mensajesError.map((error) => (
              <div className="mensaje-error">
                <p> {error} </p>
              </div>
            ))
          : null}
      </form>
      <div className="enlace">
        <p> ¿Aun no tienes cuenta?</p>
        <Link to="Registrate">
          <p> Registrate</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
