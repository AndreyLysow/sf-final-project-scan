import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import clock from "../../../assets/img/img_clock.svg";
import loupe from "../../../assets/img/loupe.svg";
import guard from "../../../assets/img/guard.svg";
import smile from "../../../assets/img/smile.svg";

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
    image: clock,
  },
  {
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    image: loupe,
  },
  {
    text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    image: guard,
  },
  {
    text: "99,99% процентов довольных клиентов, станьте одним из них!",
    image: smile,
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
