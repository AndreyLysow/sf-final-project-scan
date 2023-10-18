import React, { useEffect, useState } from "react";
import "./authUser.css";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import avatar from "../../../assets/img/avatar.svg";
import Runing from "../../RunAnimaton/runing";
import { Link } from "react-router-dom";

const AuthUser = observer(() => {
  const [login, setLogin] = useState(localStorage.getItem("login") || "Гость");

  useEffect(() => {
    store.checkToken();
    store.getCompaniesInfo();
  }, []);

  useEffect(() => {
    // При монтировании компонента, устанавливаем значение из localStorage в состояние
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) {
      setLogin(storedLogin);
    }
  }, []);

  return (
    <div className="authUser">
      <div className="companies-wrapper">
        {store.isCompaniesLoading ? (
          <Runing />
        ) : (
          <>
            <p className="companies-info">
              Использовано компаний
              <span className="companies-number">
                {store.companiesInfo.used}
              </span>
            </p>
            <p className="companies-info">
              Лимит по компаниям
              <span className="companies-number companies-number__limit">
                {store.companiesInfo.limit}
              </span>
            </p>
          </>
        )}
      </div>
      <div className="user-info">
        <span className="username">{login}</span>
        <button
          className="logout"
          onClick={() => {
            store.setToken("");
            localStorage.clear();
            setLogin("Гость"); // Сбрасываем состояние login на "Гость"
          }}
        >
          <Link className="header-nav__link" to="/">
            Выйти
          </Link>
        </button>
      </div>
      <img className="user-avatar" src={avatar} alt="user avatar" />
    </div>
  );
});

export default AuthUser;
