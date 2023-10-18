import React, { useEffect, useState } from "react";
import "./menu.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import scan from "../../../assets/img/logo-footer.svg";
import avatar from "../../../assets/img/avatar.svg";
import store from "../../../store/store";

const UserMenu = observer(() => {
  const [isActive, setActive] = useState(false);

  const login = localStorage.getItem("login");

  useEffect(() => {
    store.checkToken();
    store.getCompaniesInfo();
  }, []);

  return (
    <div className="menu-button__open" onClick={() => setActive(true)}>
      {isActive ? (
        <div className="user-menu">
          <div className="menu-top">
            <img className="menu-logo" src={scan} alt="" />
            <button
              className="menu-button__close"
              onClick={(e) => {
                e.stopPropagation();
                setActive(false);
              }}
            ></button>
          </div>
          <nav className="menu-nav">
            <Link className="menu-nav__link" to="/">
              Главная
            </Link>
            <a className="menu-nav__link" href="#prices">
              Тарифы
            </a>
            <Link className="menu-nav__link" to="/error">
              FAQ
            </Link>
          </nav>
          {store.token ? (
            <div className="menu__user-info">
              <span className="menu__username" >{login}</span>
              <img
                className="menu__user-avatar"
                src={avatar}
                alt="user avatar"
              />
              <button
                className="menu__logout"
                onClick={() => {
                  store.setToken("");
                  localStorage.clear();
                }}
              >
                <Link to="/">Выйти</Link>
              </button>
            </div>
          ) : (
            <div className="menu__not-signed">
              <Link className="menu__sign-up" to="/error">
                Зарегистрироваться
              </Link>
              <Link className="menu__sign-in" to="/auth">
                Войти
              </Link>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default UserMenu;
