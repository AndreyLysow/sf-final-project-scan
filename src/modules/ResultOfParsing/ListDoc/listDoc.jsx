import React, { useEffect, useState } from "react";
import "./listDoc.css";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Runing from "../../RunAnimaton/runing";
import vcru from "../../../assets/img/img-vc-ru.svg";

const ListDoc = observer(() => {
  const [isActive, setActive] = useState(true);
  const [nextTen, setNextTen] = useState(10);

  useEffect(() => {
    if (nextTen >= store.IDs.length) {
      setActive(false);
    }
  }, [nextTen]); // eslint-disable-next-line

  useEffect(() => {
    setActive(false);
    if (store.IDs[0] !== undefined) {
      if (store.IDs.length <= 10) {
        store.getFirstDocuments();
        setActive(false);
        return;
      } else {
        let next = store.IDs.slice(0, nextTen);
        store.getNextDocuments(next);
        setActive(true);
      }
    }
  }, [store.IDs]);

  const showNextTen = () => {
    let next = store.IDs.slice(nextTen, nextTen + 10);
    store.getNextDocuments(next);
    setNextTen(nextTen + 10);
  };

  if (!store.document) {
    setActive(false);
    return (
      <p className="search-result__error search-result-error__info">
        Что-то пошло не так :( <br />
        Попробуйте <Link to="/search">изменить параметры поиска</Link>
      </p>
    );
  }

  return (
    <div className="documents-wrapper">
      <h3 className="summary-title documents-title">Список документов</h3>
      <div className="documents">
        {store.document &&
          store.document.map((el) => (
            <Doc
              issueDate={el.ok.issueDate
                .substring(0, 10)
                .split("-")
                .join(".")
                .split(".")
                .reverse()
                .join(".")}
              source={el.ok.source.name}
              title={el.ok.title.text}
              isTechNews={el.ok.attributes.isTechNews}
              isAnnouncement={el.ok.attributes.isAnnouncement}
              isDigest={el.ok.attributes.isDigest}
              content={el.ok.content.markup}
              link={el.ok.url}
              wordCount={el.ok.attributes.wordCount}
            />
          ))}
      </div>
      {store.isDocumentLoading ? (
        <button disabled className="document-button__active">
          <Runing/>
        </button>
      ) : (
        <button
          className={isActive ? "document-button__active" : "document-disabled"}
          onClick={showNextTen}
        >
          Показать больше
        </button>
      )}
    </div>
  );
});

export default ListDoc;


const Doc = (props) => {
  const imgMatches = props.content.match(/https?:\/\/\S+"/g) || [];
  const xmlImg = imgMatches.length ? imgMatches[0].replace('"', '') : vcru;

  const content = props.content
    .replace(/<.*?>/g, "")
    .replace(/;.*?;/g, "")
    .replace(/&.*?t/g, "")
    .replace(/s.*?;/g, "")
    .replace(/\?.*?\d/g, "")
    .replace(/\/.*?\s/g, "")
    .replace(/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)/g, "");

  return (
    <div className="doc">
      <div className="doc-top">
        <p className="issue-date">
          {props.issueDate
            .substring(0, 10)
            .split("-")
            .join(".")
            .split(".")
            .reverse()
            .join(".")}
        </p>
        <Link className="issue-date" to={props.link} target="_blank">
          {props.source}
        </Link>
      </div>
      <div className="doc__title-tag">
        <h3 className="doc-title">{props.title}</h3>
        {props.isTechNews && (
          <span className="doc-tag">Технические новости</span>
        )}
        {props.isAnnouncement && (
          <span className="doc-tag announcement">Анонсы и события</span>
        )}
        {props.isDigest && (
          <span className="doc-tag news">Сводки новостей</span>
        )}
      </div>
      <img className="document-img" src={xmlImg} alt="" />
      <p className="doc-content">{content}</p>
      <div className="doc-bottom">
        <Link className="doc-link" to={props.link} target="_blank">
          Читать в источнике
        </Link>
        <span className="issue-date">Слова: {props.wordCount}</span>
      </div>
    </div>
  );
};

