import { useEffect } from "react";

import disc from "@assets/img/disc.webp";
import decoratedDisc from "@assets/img/decorated_disc.png";
import logo from "@assets/img/gimmesong_logo.png";
import santaHatLogo from "@assets/img/gimmesong_logo_with_santa_hat.png";
import santaEmoji from "@assets/img/santa_emoji.png";
import giftEmoji from "@assets/img/gift_emoji.png";
import noteEmoji from "@assets/img/note_emoji.png";
import decoration from "./assets/pattern4_decoration.png";
import textOverflowFade from "./assets/pattern4_text_overflow_fade.png";

import { ThreeDots } from "react-loader-spinner";
import { useImageExporter } from "@hooks/useImageExporter";
import useSession from "@hooks/useSession";

const Pattern8 = ({ content, isMysong, onSharing }) => {
  const { exportedURL, exportedFile, exportRefCallback } = useImageExporter();
  const { user } = useSession();

  useEffect(() => {
    if (!exportedFile) return;
    onSharing(exportedFile);
  }, [exportedFile]);

  return (
    <>
      <div className="h-0 w-0 overflow-hidden">
        <div
          className="relative flex min-h-[715px] w-[960px] flex-col justify-between bg-[#FF9C9C] px-[86px] pt-[42px] pb-[86px]"
          ref={exportRefCallback}
        >
          <img
            src={noteEmoji}
            alt="Note"
            className="absolute bottom-[390px] right-[10px] w-[80px] -rotate-[24deg]"
          />
          <img
            src={noteEmoji}
            alt="Note"
            className="absolute bottom-[370px] right-[-30px] w-[80px] -rotate-[24deg]"
          />
          <img
            src={giftEmoji}
            alt="Gift"
            className="absolute bottom-[120px] right-[-80px] w-[300px] -rotate-[30deg]"
          />
          <img
            src={noteEmoji}
            alt="Note"
            className="absolute bottom-[130px] right-[140px] z-10 w-[80px] -rotate-[24deg]"
          />
          <img
            src={noteEmoji}
            alt="Note"
            className="absolute bottom-[120px] right-[100px] z-10 w-[80px] -rotate-[24deg]"
          />
          <img
            src={noteEmoji}
            alt="Note"
            className="absolute bottom-[140px] right-[60px] z-10 w-[80px] -rotate-[24deg]"
          />

          <div>
            <div className="flex items-center">
              <div className="relative mt-[40px] flex h-[180px] w-[180px] shrink-0 items-center justify-center">
                <img
                  className="absolute inset-0 h-full w-full select-none object-contain"
                  src={content.disc?.disc || disc} // TODO: Use data passed from the widget's parent, which is retrieved from api (I don't know the shape yet so I'm just putting a placeholder)
                  alt="disc"
                />
                <img
                  className="absolute h-[52px] w-[52px] shrink-0 rounded-full object-contain "
                  src={content.song.thumbnails[0].url}
                  alt="thumbnail"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="ml-[32px] flex min-w-0 flex-col">
                <div className="flex w-[560px] flex-row">
                  <span
                    className={`flex w-[460px] flex-row truncate text-[44px] font-bold italic leading-[2] text-white`}
                  >
                    {content.song.title}
                  </span>
                  <div
                    style={{
                      backgroundImage: `url(${textOverflowFade})`,
                    }}
                    className="relative top-[30px] right-[30px] h-16 w-12 border-none bg-contain"
                  />
                </div>

                <span
                  className={` -mt-[28px] truncate text-[42px] font-light italic leading-[2] text-[#EDEDED]`}
                >
                  {content.song.artist}
                </span>
              </div>
            </div>
          </div>

          {isMysong && (
            <span className="mt-[20px]  text-[32px] font-bold text-[#C06A66]">
              @{user.username}
            </span>
          )}
          <div className="mt-[10px] w-full px-[8px]">
            <p
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className=" pr-[170px] text-[48px]  font-bold italic text-white"
            >
              {content.message}
            </p>
          </div>
          <div className="mt-[32px] mb-[48px] flex w-full flex-row items-center px-[8px] pr-[120px] text-[28px] font-thin text-white">
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
            >
              Merry Christmas fr
            </span>
            <img
              src={santaEmoji}
              alt="Santa"
              className="mt-[24px] h-[32px] w-[32px]"
            />
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
            >
              m
            </span>
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className="ml-4 font-normal"
            >
              Anonymous
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                className="mr-[10px] mt-[12px]"
                src={santaHatLogo}
                alt="disc"
              />
              <span className="gimmesong-primary-font text-[36px] tracking-wider text-white">
                GIMMESONG
              </span>
            </div>
          </div>
        </div>
      </div>

      {exportedURL ? (
        <div className="mt-3 flex flex-col items-center rounded-3xl border">
          <img
            className="w-full rounded-3xl"
            src={exportedURL}
            alt={`inbox-widget`}
          />{" "}
        </div>
      ) : (
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#8583D6"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </>
  );
};
export default Pattern8;
