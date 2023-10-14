import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./priceList.css";
import beginner from "../../../assets/img/img-lamp-beginner.svg";
import pro from "../../../assets/img/img-target-pro.svg";
import business from "../../../assets/img/img-laptop-busines.svg";
import checkpoint from "../../../assets/img/check-mark.svg";
import store from "../../../store/store";

const PriceList = observer(() => {
  useEffect(() => {
    store.checkToken();
  }, []);

  const rate = [
    {
      styleObj: {
        background: "var(--main-color-yellow)",
      },
      id: 1,
      title: "Beginner",
      image: beginner,
      description: "Для небольшого исследования",
      price: "1 200 ₽",
      discount: "799 ₽",
      loan: "или 150 ₽/мес. при рассрочке на 24 мес.",
      details: {
        detail1: "Безлимитная история запросов",
        detail2: "Безопасная сделка",
        detail3: "Поддержка 24/7",
      },
    },
    {
      styleObj: {
        background: "var(--main-color-light-green)",
      },
      id: 2,
      title: "Pro",
      image: pro,
      description: "Для HR и фрилансеров",
      price: "2 600 ₽",
      discount: "1 299 ₽",
      loan: "или 279 ₽/мес. при рассрочке на 24 мес.",
      details: {
        detail1: "Все пункты тарифа Beginner",
        detail2: "Экспорт истории",
        detail3: "Рекомендации по приоритетам",
      },
    },
    {
      styleObj: {
        background: "#000",
        color: "#fff",
      },
      id: 3,
      title: "Business",
      image: business,
      description: "Для корпоративных клиентов",
      price: "3 700 ₽",
      discount: "2 379 ₽",
      loan: "",
      details: {
        detail1: "Все пункты тарифа Pro",
        detail2: "Безлимитное количество запросов",
        detail3: "Приоритетная поддержка",
      },
    },
  ];

  let res = rate.map(function (item) {
    return (
      <div className="rate" key={item.id}>
        <div className="rate-header" style={item.styleObj}>
          <div className="rate-header__info">
            <h3 className="rate-title">{item.title}</h3>
            <p className="rate-description">{item.description}</p>
          </div>
          <img alt="" src={item.image} />
        </div>
        <div
          className={
            store.token && item.id === 1
              ? "rate-body rate-body__current"
              : "rate-body"
          }
        >
          <span
            className={
              store.token && item.id === 1 ? "current" : "current-disabled"
            }
          >
            Текущий тариф
          </span>
          <div className="rate-price__container">
            <p className="rate-price">{item.discount}</p>
            <p className="rate-price rate-price__discount">
              {item.price}
            </p>
          </div>
          <p className="rate-info rate-info__loan">{item.loan}</p>
          <p className="rate-info rate-info__title">В тариф входит:</p>
          <li className="rate-info">
            <img className="rate-info__check" src={checkpoint} alt="" />
            {item.details.detail1}
          </li>
          <li className="rate-info">
            <img className="rate-info__check" src={checkpoint} alt="" />
            {item.details.detail2}
          </li>
          <li className="rate-info">
            <img className="rate-info__check" src={checkpoint} alt="" />
            {item.details.detail3}
          </li>
          <button
            className={
              store.token && item.id === 1
                ? "rate-button rate-button__current"
                : "rate-button"
            }
          >
            <Link to="/error">
              {store.token && item.id === 1
                ? "Перейти в личный кабинет"
                : "Подробнее"}
            </Link>
          </button>
        </div>
      </div>
    );
  });

  return <div className="prices">{res}</div>;
});

export default PriceList;
