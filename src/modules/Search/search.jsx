import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import store from "../../store/store";
import "./search.css";
import quickSearch from "../../assets/img/quick-search.svg";
import document from "../../assets/img/green-dct.svg";
import folders from "../../assets/img/dct-folders.svg";

const Search = observer(() => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      inn: "7710474375",
    },
  });

  // Функция обработки формы при отправке
  const onSubmit = (data) => {
    store.setSummaryError(false);
    store.setInn(data.inn);
    store.setLimit(data.limit);
    store.getHistograms();
    store.setDocument([]);
    store.setIDs({});
    store.getIDs();
    navigate("/result");
  };

  useEffect(() => {
    // Если отсутствует токен, перенаправляем пользователя на страницу аутентификации
    !store.token && navigate("/auth");
  });

  useEffect(() => {
    // Сброс состояния чекбоксов формы поиска
    store.resetSearchFormChecks();
  });

  return (
    <div className="search">
      <h1 className="search-title">
        Найдите необходимые данные в пару кликов.
      </h1>
      <p className="search-details">
        Задайте параметры поиска. <br />
        Чем больше заполните, тем точнее поиск
      </p>
      <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-form__inputs">
          <label className="search-form__label">
            ИНН компании *
            <input
              className={`search-form__input ${
                errors?.inn ? "search-form__input-invalid" : ""
              }`}
              placeholder="10 цифр"
              {...register("inn", {
                required: true,
                minLength: 10,
                maxLength: 10,
                pattern: {
                  value: /^[0-9]{10}$/,
                },
              })}
            />
            {errors?.inn && (
              <p className="search-form__error-message">
                {errors.inn.type === "required"
                  ? "Обязательное поле"
                  : errors.inn.type === "minLength"
                  ? "Не менее 10 цифр"
                  : errors.inn.type === "maxLength"
                  ? "Не более 10 цифр"
                  : "Введите корректные данные"}
              </p>
            )}
          </label>
          <label className="search-form__label">
            Тональность
            <select
              className="search-form__input"
              onChange={(e) => {
                store.setTonality(e.target.value);
              }}
            >
              <option value={"any"}>Любая</option>
              <option value={"positive"}>Позитивная</option>
              <option value={"negative"}>Негативная</option>
            </select>
          </label>
          <label className="search-form__label">
            Количество документов в выдаче *
            <input
              type="number"
              className={`search-form__input ${
                errors?.limit ? "search-form__input-invalid" : ""
              }`}
              placeholder="От 1 до 1000"
              {...register("limit", {
                required: true,
                min: 1,
                max: 1000,
              })}
            />
            {errors?.limit && (
              <p className="search-form__error-message">
                {errors.limit.type === "required"
                  ? "Обязательное поле"
                  : errors.limit.type === "min"
                  ? "Не менее 1"
                  : "Не более 1000"
                }
              </p>
            )}
          </label>
          <div className="date-picker__wrapper">
            <p className="search-form__label">Диапазон поиска *</p>
            <div className="date-picker">
              <div className="date-picker__label">
                <DatePicker
                  id="startDate"
                  selectsStart
                  required={true}
                  className="search-form__input dates"
                  startDate={store.startDate}
                  dateFormat="dd.MM.yyyy"
                  selected={store.startDate}
                  maxDate={store.endDate}
                  onChange={(startDate) => {
                    store.setStartDate(startDate);
                  }}
                  fixedHeight
                  showYearDropdown
                />
                <label className="required-info" htmlFor="startDate">
                  Дата начала
                </label>
              </div>
              <div className="date-picker__label">
                <DatePicker
                  selectsEnd
                  required={true}
                  className="search-form__input dates"
                  startDate={store.startDate}
                  dateFormat="dd.MM.yyyy"
                  selected={store.endDate}
                  minDate={store.startDate}
                  maxDate={new Date()}
                  onChange={(endDate) => {
                    store.setEndDate(endDate);
                  }}
                  fixedHeight
                  showYearDropdown
                />
                <label className="required-info" htmlFor="startDate">
                  Дата конца
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="search-form__checks-wrapper">
          <div className="search-form__checks">
            <div className="search-form__check">
              <input
                id="fullness"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isFullness")}
              />
              <label htmlFor="fullness" className="checks-label">
                Признак максимальной полноты
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="business"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isBusiness")}
              />
              <label htmlFor="business" className="checks-label">
                Упоминания в бизнес-контексте
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="main-role"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isMainRole")}
              />
              <label htmlFor="main-role" className="checks-label">
                Главная роль в публикации
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="risk"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isRisksOnly")}
              />
              <label htmlFor="risk" className="checks-label">
                Публикации только с риск-факторами
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="tech-news"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isTechNews")}
              />
              <label htmlFor="tech-news" className="checks-label">
                Включать технические новости рынков
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="announcement"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isAnnouncement")}
              />
              <label htmlFor="announcement" className="checks-label">
                Включать анонсы и календари
              </label>
            </div>
            <div className="search-form__check">
              <input
                id="news"
                type="checkbox"
                onChange={() => store.setSearchFormChecks("isNews")}
              />
              <label htmlFor="news" className="checks-label">
                Включать сводки новостей
              </label>
            </div>
          </div>
          <div className="search-form__button">
            <button
              disabled={!isValid}
              className="form-button__submit"
              type="submit"
            >
              Поиск
            </button>
            <p className="required-info">* Обязательные к заполнению поля</p>
          </div>
        </div>
      </form>
      <div className="search-images">
        <img src={document} alt="document" className="doc-img" />
        <img src={folders} alt="folders" className="folders-img" />
        <img src={quickSearch} alt="quickSearch" className="quickSearch-img" />
      </div>
      </div>
    </div>
  );
});

export default Search;
