import React, { useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import scan from "../../assets/img/logo-header.svg";
import Signed from "./Signed/signed";
import NotSigned from "./NotSigned/notSigned";
import BurgerMenu from "./BurgerMenu/burger";
import store from "../../store/store";

const Header = observer(() => {
  useEffect(() => {
    store.checkToken();
  }, []);

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={scan} alt="logo" />
      </Link>
      <nav className="header-nav">
        <Link to="/" className="header-nav__link">
          Главная
        </Link>
        <a href="#prices" className="header-nav__link">
          Тарифы
        </a>
        <Link to="/error" className="header-nav__link">
          FAQ
        </Link>
      </nav>
      <div className="header-right">
        {store.token ? <Signed /> : <NotSigned />}
        <BurgerMenu />
      </div>
    </header>
  );
});

export default Header;

