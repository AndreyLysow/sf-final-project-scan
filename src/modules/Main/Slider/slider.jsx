import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import time from "../../../assets/img/img_clock.svg";
import search from "../../../assets/img/loupe.svg";
import safety from "../../../assets/img/guard.svg";
import happy from "../../../assets/img/smile.svg";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 870,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const sliderData = [
  {
    text: "Высокая и оперативная скорость обработки заявки",
    image: time,
  },
  {
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    image: search,
  },
  {
    text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    image: safety,
  },
  {
    text: "99,99% процентов довольных клиентов, станьте одним из них!",
    image: happy,
  },
];

const SimpleSlider = () => {
  return (
    <Slider {...sliderSettings}>
      {sliderData.map((card, index) => (
        <div className="slider-item" key={index}>
          <img className="slider-img" alt="" src={card.image} />
          <p className="slider-info">{card.text}</p>
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
