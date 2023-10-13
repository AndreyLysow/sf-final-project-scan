import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import lock from "../../../assets/img/img-lock.svg";
import google from "../../../assets/img/logo-google.svg";
import facebook from "../../../assets/img/logo-facebook.svg";
import yandex from "../../../assets/img/logo-yandex.svg";
import "./form.css";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";

const Form = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    store.token && navigate("/");
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      login: "sf_student9",
      password: "DTdEwAn",
    },
  });

  const onSubmit = (data) => {
    store.setLogin(data.login);
    store.setPassword(data.password);
    store.getToken();
    console.log(store.getToken());
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <img className="form-img__lock" src={lock} alt="" />
      <div className="form-links">
        <button className="form-link">
          <Link to="/auth">Войти</Link>
        </button>
        <button className="form-link form-link__disabled">
          <Link to="/error">Зарегистрироваться</Link>
        </button>
      </div>
      <label className="form-label">
        {store.isAuthError
          ? "Неправильный логин или номер телефона"
          : "Логин или номер телефона:"}
        <input
          {...register("login", {
            required: true,
          })}
          className={
            errors?.login ? "form-input form-input__invalid" : "form-input"
          }
          type="text"
        />
        {errors?.login && (
          <p className="error-message">Введите корректные данные</p>
        )}
      </label>
      <label className="form-label">
        {store.isAuthError ? "Неправильный пароль" : "Пароль:"}
        <input
          {...register("password", {
            required: true,
          })}
          className={
            errors?.password ? "form-input form-input__invalid" : "form-input"
          }
          type="password"
          autoComplete="on"
        />
        {errors?.password && (
          <p className="error-message">Введите корректные данные</p>
        )}
      </label>
      {store.isLoading ? (
        <button
          disabled={!isValid}
          className="form-button__submit"
          type="submit"
        >
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      ) : (
        <button
          disabled={!isValid}
          className="form-button__submit"
          type="submit"
        >
          Войти
        </button>
      )}
      <Link className="repare-password" to="/error">
        Восстановить пароль
      </Link>
      <p className="sign-with">Войти через:</p>
      <div className="sign-socials">
        <Link to="https://google.com" target="_blank">
          <img src={google} alt="" />
        </Link>
        <Link to="https://facebook.com" target="_blank">
          <img src={facebook} alt="" />
        </Link>
        <Link to="https://yandex.ru" target="_blank">
          <img src={yandex} alt="" />
        </Link>
      </div>
    </form>
  );
});

export default Form;
