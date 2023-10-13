import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./error404.css";

function Error() {
  const [text, setText] = useState("404 NOT FOUND");

  useEffect(() => {
    const doWave = () => {
      const text = "404 NOT FOUND";
      const waveText = text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            animation: `wave 1s ${index * 0.1}s infinite`,
            fontSize: "100px",
            display: "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
      setText(waveText);
    };

    doWave();
  }, []);

  return (
    <div className="error">
      <h1>{text}</h1>
      <p className="error__info">
        We are sorry, but the page you are looking for does not exist! <br />
        Please return to <Link to="/"><span>the home page</span></Link>.
      </p>
    </div>
  );
}

export default Error;

