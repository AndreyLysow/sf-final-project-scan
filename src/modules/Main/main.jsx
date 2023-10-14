import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import store from "../../store/store";
import service from "../../assets/img/set-of-services.svg";
import SimpleSlider from "./Slider/slider";
import PriceList from "./PriceLists/priceList";
import { observer } from "mobx-react-lite";
import icon from "../../logoScan.svg"

const Main = observer(() => {
  useEffect(() => {
    document.title = "СКАН"; // Установка заголовка страницы при монтировании компонента
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = icon;
    }
  }, []);

  const requestLink = store.token ? (
    <Link to="/search">Запросить данные</Link>
  ) : (
    <Link to="/auth">Войти</Link>
  );

  return (
    <div className="main">
      <section className="search-service">
        <div>
          <h1 className="search-service__title">
            сервис по поиску публикаций <br />
            о компании <br />
            по ее ИНН <br />
          </h1>
          <div className="search-service__mobile">
            <p className="search-service__info">
              Комплексный анализ публикаций, получение данных в формате PDF на
              электронную почту.
            </p>
            <button className="search-service__request-button">
              {requestLink}
            </button>
          </div>
        </div>
        <div className="search-service__img">
          <img className="image" src={service} alt="main page" />
        </div>
      </section>
      <section className="satisfaction">
        <h2 className="h2__title">Почему именно мы</h2>
        <div>
          <SimpleSlider />
        </div>
        <div className="satisfaction_img"></div>
      </section>
      <section id="prices">
        <h2 className="h2__title">наши тарифы</h2>
        <PriceList />
      </section>
    </div>
  );
});

export default Main;
