import { useEffect } from "react";

import disc from "@assets/img/disc.webp";
import decoratedDisc from "@assets/img/decorated_disc.png";
import logo from "@assets/img/gimmesong_logo.png";
import santaHatLogo from "@assets/img/gimmesong_logo_with_santa_hat.png";
import santaEmoji from "@assets/img/santa_emoji.png";

import { ThreeDots } from "react-loader-spinner";
import { useImageExporter } from "@hooks/useImageExporter";
import useSession from "@hooks/useSession";

const Pattern4 = ({ content, isMysong, onSharing }) => {
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
          className="flex w-[960px] flex-col justify-between bg-[#F09794] px-[86px] pt-[42px] pb-[86px]"
          ref={exportRefCallback}
        >
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
              <div className="ml-[32px] flex min-w-0 flex-col ">
                <span
                  className={`truncate text-[44px] font-bold italic leading-[2] text-white`}
                >
                  {content.song.title}
                </span>
                <span
                  className={` -mt-[28px] truncate text-[42px] font-light italic leading-[2] text-[#EDEDED]`}
                >
                  {content.song.artist}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[48px] w-full px-[8px]">
            <p
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className=" pr-[120px] text-[54px]  font-bold italic text-white"
            >
              {content.message}
            </p>
          </div>
          <div className="mt-[32px] mb-[64px] flex w-full flex-row items-center px-[8px] pr-[120px] text-[32px] font-thin text-white">
            {/* <p
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className="pr-[120px] text-[32px] text-white"
            > */}
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
            {/* </p> */}
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
            {isMysong && (
              <span className="-mt-[20px]  text-[36px] text-gray-300">
                gimmesong.link/@{user.username}
              </span>
            )}
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
export default Pattern4;
