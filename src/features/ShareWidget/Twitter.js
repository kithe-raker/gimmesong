import logo from "@assets/img/gimmesong_logo.png";
import disc from "@assets/img/disc.webp";

import { ThreeDots } from "react-loader-spinner";
import useSession from "@hooks/useSession";
import { useImageExporter } from "@hooks/useImageExporter";
import { Button } from "@chakra-ui/react";

const Twitter = ({ content, isMysong }) => {
  const { exportedURL, exportedFile, exportRefCallback } = useImageExporter();
  const { user } = useSession();

  const shareImage = async () => {
    if (navigator.canShare({ files: [exportedFile] })) {
      try {
        await navigator.share({
          files: [exportedFile],
          url: isMysong ? `@${user.username}` : "",
          text: "#gimmsong #gimmesonglink",
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("cannot");
    }
  };

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
      <div className="mt-3 flex flex-col items-center rounded-3xl border">
        {exportedURL ? (
          <img
            className="w-full rounded-3xl"
            src={exportedURL}
            alt={`inbox-widget`}
          />
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
      </div>
      <div className="py-4">
        <Button
          marginTop={4}
          onClick={() => shareImage()}
          borderRadius="25"
          bgColor="black"
          color="white"
          h={42}
          _hover={{ bg: "#000000" }}
          _active={{
            bg: "#000000",
          }}
        >
          <div className="flex h-[42px] items-center rounded-full bg-black px-4 text-white">
            <svg
              className="mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
            </svg>
            Share on Twitter!
          </div>
        </Button>
      </div>
    </>
  );
};
export default Twitter;
