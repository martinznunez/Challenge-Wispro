import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Registrate from "./Registrate";
import User from "./User";
import EditarUser from "./EditarUser";
import EstadisticaLogueos from "./EstadisticaLogueos";
import EstadisticaRegistro from "./EstadisticaRegistro";

const MainContainer = () => {
  const { usuarioLogeado } = useContext(UserContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/registrate" component={Registrate} />

        {usuarioLogeado && usuarioLogeado.id && (
          <>
            <Route exact path="/users" component={User} />
            <Route path="/editarUser/:id" component={EditarUser} />
            <Route
              exact
              path="/estadisticaLogueos"
              component={EstadisticaLogueos}
            />
            <Route
              exact
              path="/estadisticaRegistro"
              component={EstadisticaRegistro}
            />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default MainContainer;
