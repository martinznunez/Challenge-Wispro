import React, { createContext, useEffect, useState, useCallback } from "react";
import Axios from "../config/axios";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [axiosError, setAxiosError] = useState(false);

  const [todosLosUsuarios, setTodosLosUsuarios] = useState([]);

  const [usuarioLogeado, setUsuarioLogeado] = useState({});

  const obtenerTodosLosUsuarios = useCallback(async () => {
    try {
      const respuesta = await Axios.get();

      setTodosLosUsuarios(respuesta.data);
    } catch (error) {
      setAxiosError(true);
    }
  }, []);

  useEffect(() => {
    obtenerTodosLosUsuarios();
  }, [obtenerTodosLosUsuarios]);

  return (
    <UserContext.Provider
      value={{
        obtenerTodosLosUsuarios,
        setAxiosError,
        setTodosLosUsuarios,
        setUsuarioLogeado,
        usuarioLogeado,
        axiosError,
        todosLosUsuarios,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
