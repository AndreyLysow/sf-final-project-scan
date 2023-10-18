import React from "react";
import "./notAuthUser.css";
import { Link } from "react-router-dom";

const NotAuthUser = () => {
  return (
    <div className="not-signed">
      <Link className="sign-up" to="/error">
        Зарегистрироваться
      </Link>
      <div className="line"></div>
      <Link className="sign-in" to="/auth">
        Войти
      </Link>
    </div>
  );
};

export default NotAuthUser;
