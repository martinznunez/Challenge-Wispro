import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "../config/axios";
import Error from "./Error";

import Swal from "sweetalert2";

import { UserContext } from "../context/UserContext";
const User = () => {
  const {
    todosLosUsuarios,
    usuarioLogeado,
    setAxiosError,
    obtenerTodosLosUsuarios,
    axiosError,
  } = useContext(UserContext);

  const history = useHistory();

  const andleClickEditar = (id) => {
    history.push(`/EditarUser/${id}`);
  };

  const andleClickEliminar = (id) => {
    const usuarioEliminado = todosLosUsuarios.filter((elem) => elem.id === id);

    try {
      Axios.delete(`/${usuarioEliminado[0].id}`, usuarioEliminado).then(() => {
        Swal.fire({
          position: "left-end",
          icon: "success",
          title: "ELIMINADO",
          showConfirmButton: false,
          timer: 1500,
        });

        obtenerTodosLosUsuarios();
      });
    } catch (error) {
      setAxiosError(true);
    }
  };

  const CerrarSesión = () => {
    history.push("/");
  };

  return (
    <>
      {axiosError ? (
        <Error
          className="axios-mensaje-error"
          mensajeError="Algo salio mal!!"
        />
      ) : null}
      <div className="container-user">
        <div className="cerrar-sision">
          <p onClick={CerrarSesión}> Cerrar Sesión</p>
        </div>
        <div className="container-enlaces-graficos">
          <Link to="estadisticaLogueos">
            <a href>Estadistica Logueos</a>
          </Link>
          <Link to="estadisticaRegistro">
            <a href>Estadistica Registros</a>
          </Link>
        </div>
        <table className=" table-responsive  table table-dark table-striped">
          <thead>
            <tr className="filas">
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Profesión</th>
              <th scope="col">Email</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {todosLosUsuarios.map((user) => (
              <tr className="filas" key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.edad}</td>
                <td>{user.profesión}</td>
                <td>{user.email}</td>
                <td
                  className="btn-user"
                  onClick={() => andleClickEditar(user.id)}
                >
                  Editar
                </td>

                <td
                  className={
                    user.id === usuarioLogeado.id ? "btn-disabled" : "btn-user"
                  }
                  onClick={() => andleClickEliminar(user.id)}
                >
                  Eliminar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
