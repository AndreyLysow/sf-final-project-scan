import React from "react";
import "./footer.css";
import scan from "../../assets/img/logo-footer.svg";


function Footer() {
  return (
    <footer className="footer">
      <img src={scan} alt="Company Logo" className="footer-logo" />
      <div className="footer-info">
        <p>
          г. Москва, Цветной б-р, 40 <br />
          <a href="tel:+74957712111">+7 495 771 21 11</a> <br />
          <a href="mailto:info@skan.ru">info@skan.ru</a>
        </p>
        <p>Copyright. 2023</p>
      </div>
    </footer>
  );
}

export default Footer;
