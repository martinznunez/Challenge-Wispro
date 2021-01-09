import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Axios from "../config/axios";
import Error from "./Error";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

const EditarUser = () => {
  const history = useHistory();
  const { id } = useParams();

  const [usuario, setUsuario] = useState({});

  const {
    todosLosUsuarios,
    obtenerTodosLosUsuarios,
    setAxiosError,
    axiosError,
  } = useContext(UserContext);

  useEffect(() => {
    const usuarioFiltrado = todosLosUsuarios.find((item) => item.id === id);

    setUsuario(usuarioFiltrado);
  }, [todosLosUsuarios, history.location, id]);

  const onChangeFormulario = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const ClickEditarUsuario = (e) => {
    e.preventDefault();

    try {
      Axios.patch(`/${usuario.id} `, usuario).then(() => {
        Swal.fire("Registro exitoso!");
        history.push("/users");
      });

      obtenerTodosLosUsuarios();
    } catch (error) {
      setAxiosError(true);
    }
  };

  return (
    <div className="container-editar">
      <div className="parrafo-editar-usuario">
        <p>Editar Usuario</p>
      </div>
      {axiosError ? (
        <Error
          className="axios-mensaje-error"
          mensajeError="Algo salio mal!!"
        />
      ) : null}
      {usuario ? (
        <form>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              disabled
              value={usuario.nombre}
              onChange={onChangeFormulario}
            />

            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={onChangeFormulario}
            />

            <input
              type="text"
              name="profesión"
              value={usuario.profesión}
              onChange={onChangeFormulario}
            />

            <input
              type="number"
              name="edad"
              value={usuario.edad}
              onChange={onChangeFormulario}
            />
          </div>

          <input
            className="submit"
            type="submit"
            value="EDITAR"
            onClick={ClickEditarUsuario}
          />
        </form>
      ) : null}
    </div>
  );
};

export default EditarUser;
