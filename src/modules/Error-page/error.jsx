import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

function Error() {
  return (
    <div className="error">
      <div className="error__code">
      </div>
      <p className="error__info">
        Страница в разработке <br />
        Перейдите на <Link to="/">главную</Link>
      </p>
    </div>
  );
}

export default Error;
