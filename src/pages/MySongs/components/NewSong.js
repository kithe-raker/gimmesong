import { useState, useRef } from "react";
import disc from "@assets/img/disc.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

function NewSong() {
  const [songs, setSongs] = useState([{}]);
  const [current, setCurrent] = useState(0);
  const slider = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 500,
    beforeChange: (current, next) => {
      setCurrent(next);
    },
  };

  const goTo = (index) => {
    slider.current.slickGoTo(index);
  };

  return songs.length > 0 ? (
    <div className="relative w-full overflow-hidden">
      <Slider ref={slider} {...settings}>
        {[...new Array(4)].map((item, i) => {
          return (
            <div className="outline-none" key={i}>
              <div className="flex flex-col items-center justify-center">
                <img className="w-72 mt-6" src={disc} alt="disc" />
                {current === i && (
                  <span className="gimmesong-secondary-font mt-6 text-lg text-center text-gray-700 leading-6">
                    Give a song anonymous to <br />
                    someone you&apos;re hiding.
                    <br /> แมนชั่นเมจิคสตรอเบอรีไฮเปอร์ <br />
                    สคริปต์หมายปองบร็อกโคลีต่อรอง
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  ) : (
    <EmptySong />
  );
}

export default NewSong;
