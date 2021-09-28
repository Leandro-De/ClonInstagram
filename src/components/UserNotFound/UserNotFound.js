import React from "react";
import { Link } from "react-router-dom";
import "./UserNotFound.scss";

export default function UserNotFound() {
  return (
    <div className="user-not-found">
      <p>Usuario no encontrado</p>
      <p>
        Enlace incorrecto o Usuario eliminado.UserNotFound Verifica los datos
      </p>
      <Link to="/">Volver a la Home</Link>
    </div>
  );
}
