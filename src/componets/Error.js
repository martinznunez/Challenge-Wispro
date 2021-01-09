import React from "react";

const Error = ({ mensajeError }) => {
  return (
    <div className="axios-mensaje-error">
      <p>{mensajeError} </p>
    </div>
  );
};

export default Error;
