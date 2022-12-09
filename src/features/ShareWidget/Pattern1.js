import { useEffect } from "react";

import logo from "@assets/img/gimmesong_logo.png";

import { ThreeDots } from "react-loader-spinner";
import { useImageExporter } from "@hooks/useImageExporter";

const Pattern1 = ({ content, onSharing }) => {
  const { exportedURL, exportedFile, exportRefCallback } = useImageExporter();

  useEffect(() => {
    if (!exportedFile) return;
    onSharing(exportedFile);
  }, [exportedFile, onSharing]);

  return (
    <>
      <div className="h-0 w-0 overflow-hidden">
        <div
          ref={exportRefCallback}
          className="flex w-[960px] flex-col items-center justify-between overflow-hidden rounded-[108px] border border-gray-200 bg-white p-[36px]"
        >
          <div className="flex items-center justify-center">
            <img className="mr-[8px] h-[36px] w-[36px]" src={logo} alt="disc" />
            <span className="gimmesong-primary-font -mt-[27.5px] text-[36px] tracking-wider">
              GIMMESONG
            </span>
          </div>
          <p
            style={{
              wordBreak: "break-word",
              whiteSpace: "pre-line",
              // "-webkit-text-stroke": "0.5px white",
            }}
            className="flex min-h-[384px] w-full items-center justify-center px-[54px] pt-[54px] pb-[120px] text-center text-[60px] font-semibold text-gray-800"
          >
            {content.message}
          </p>
          <div
            className={`pointer-events-none flex h-[192px] w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-[36px] pr-[48px] text-white hover:bg-gray-100`}
          >
            <div className="flex items-center overflow-hidden">
              <img
                className="h-[120px] w-[120px] shrink-0 rounded-full object-contain"
                src={content.song.thumbnails[0].url}
                alt="thumbnail"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="mx-[30px] -mt-[16px] flex min-w-0 flex-col">
                <span
                  className={`-mt-[25px] truncate text-[42px] font-light leading-[2]`}
                >
                  {content.song.title}
                </span>
                <span
                  className={`-mt-[25px] truncate text-[36px] font-light leading-[2] text-white`}
                >
                  {content.song.artist}
                </span>
              </div>
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
export default Pattern1;
