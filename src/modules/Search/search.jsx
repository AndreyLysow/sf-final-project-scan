import React from "react";
import "./search.css";
import quickSearch from "../../assets/img/quick-search.svg";
import document from "../../assets/img/green-dct.svg";
import folders from "../../assets/img/dct-folders.svg";
import SearchForm from "./SearchForm/searchForm";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
  return (
    <div className="search">
      <h1 className="search-title">
        Найдите необходимые данные в пару кликов.
      </h1>
      <p className="search-details">
        Задайте параметры поиска. <br />
        Чем больше заполните, тем точнее поиск
      </p>
      <div className="search-body">
        <SearchForm />
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
