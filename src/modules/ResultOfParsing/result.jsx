import React, { useEffect } from "react";
import "./result.css";
import store from "../../store/store";
import target from "../../assets/img/target-hit.svg";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import SliderOfResult from "./SliderOfResult/sliderOfResult";
import ListDoc from "./ListDoc/listDoc";
import { Link } from "react-router-dom";
import Runing from "../RunAnimaton/runing";

const ResultOfParsing= observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    !store.token && navigate("/auth");
  });

  return (
    <div className="search-result">
      <div className="search-result__top">
        <div>
          <h1 className="search-title search-result__title">
            Результаты поиска
          </h1>

          {store.isSummaryLoading ? (
            <p className="search-details">
              Поиск может занять некоторое время, <br />
              просим сохранять терпение.
            </p>
          ) : (
            <p className="search-details">
              По вашему запросу найдены <br /> следующие данные.
            </p>
          )}
        </div>
        <img
          src={target}
          className="search-result__img"
          alt="woman with loupe"
        />
      </div>

      {store.isSummaryError ? (
        <p className="search-result__error search-result-error__info">
          Что-то пошло не так :( <br />
          Попробуйте <Link to="/search">изменить параметры поиска</Link>
        </p>
      ) : (
        <div>
          {store.isSummaryLoading ? (
            <div className="slider-loader">
              <Runing />
              <p className="loading-data">Загружаем данные</p>
            </div>
          ) : (
            <SliderOfResult />
          )}
          <ListDoc />
        </div>
      )}
    </div>
  );
});

export default ResultOfParsing;
