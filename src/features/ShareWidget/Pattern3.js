import { useEffect } from "react";

import disc from "@assets/img/disc.webp";
import logo from "@assets/img/gimmesong_logo.png";

import { ThreeDots } from "react-loader-spinner";
import { useImageExporter } from "@hooks/useImageExporter";
import useSession from "@hooks/useSession";

const Pattern3 = ({ content, isMysong, onSharing }) => {
  const { exportedURL, exportedFile, exportRefCallback } = useImageExporter();
  const { user } = useSession();

  useEffect(() => {
    if (!exportedFile) return;
    onSharing(exportedFile);
  }, [exportedFile, onSharing]);

  return (
    <>
      <div className="h-0 w-0 overflow-hidden">
        <div
          className="flex w-[960px] flex-col justify-between bg-white px-[86px] pt-[42px] pb-[86px]"
          ref={exportRefCallback}
        >
          <div>
            <div className="flex items-center">
              <div className="relative mt-[40px] flex h-[180px] w-[180px] shrink-0 items-center justify-center">
                <img
                  className="absolute inset-0 h-full w-full select-none object-contain"
                  src={disc}
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
                <span className={`truncate text-[44px] font-bold leading-[2] `}>
                  {content.song.title}
                </span>
                <span
                  className={` -mt-[28px] truncate text-[42px] font-light leading-[2] text-gray-400`}
                >
                  {content.song.artist}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-[48px] mb-[64px] w-full px-[8px]">
            <p
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className=" pr-[120px] text-[54px]  font-bold italic text-black"
            >
              {content.message}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                className="mr-[10px] mt-[29px] h-[36px] w-[36px]"
                src={logo}
                alt="disc"
              />
              <span className="gimmesong-primary-font text-[36px] tracking-wider">
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
export default Pattern3;
