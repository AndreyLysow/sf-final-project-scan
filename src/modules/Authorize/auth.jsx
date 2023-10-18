import React from "react";
import key from "../../assets/img/picking-up-key.svg";
import "./auth.css";
import Form from "./Form/form";

function Authorize() {
  return (
    <div className="authorize">
      <h2 className="auth__title">
        Для оформления подписки <br /> на тариф, необходимо авторизоваться.
      </h2>
      <img className="auth-img" src={key} alt="key" />
      <Form />
    </div>
  );
}

export default Authorize;
