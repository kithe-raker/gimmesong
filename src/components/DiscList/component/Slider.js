import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Slider({ discs, selectedDisc, setSelectedDisc, perView }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: perView,
      spacing: 15,
    },
  });

  return (
    <div ref={sliderRef} className={`keen-slider`}>
      {discs.map((item, i) => {
        return (
          <div
            className={`keen-slider__slide h-full w-full rounded-2xl p-0.5 ${
              selectedDisc === i
                ? "bg-gradient-to-b from-[#86C7DF] via-[#8583D6] to-[#C697C8]"
                : "bg-black/[.05]"
            }`}
            key={i}
          >
            <button
              className="h-full w-full rounded-2xl border  bg-white p-1"
              onClick={() => setSelectedDisc(i)}
            >
              <div className="relative pt-[100%]">
                <img
                  className="absolute inset-0 h-full w-full select-none object-contain"
                  src={item.background.image_url}
                  alt="disc"
                />

                <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                  <img
                    className="h-[20%] w-[20%] select-none object-contain"
                    src={item.center.image_url}
                    alt="disc"
                  />
                </div>
              </div>
            </button>
          </div>
        );
      })}

      {/* Just to make the images split the width evenly (when there is < 3 discs), therefore making the height be in the ratio of image width (which is divided, otherwise the width will be the entire parent's width)*/}
      {discs.length < 3 && <div className="h-full w-full"></div>}
{discs.length < 2 && <div className="h-full w-full"></div>}
    </div>
  );
}

export default Slider;
