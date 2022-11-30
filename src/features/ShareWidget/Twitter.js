import logo from "@assets/img/gimmesong_logo.png";
import disc from "@assets/img/disc.webp";

import useSession from "@hooks/useSession";
import { useImageExporter } from "@hooks/useImageExporter";

const Twitter = ({ content }) => {
  const { exportedURL, exportRefCallback } = useImageExporter();
  const { user } = useSession();
  return (
    <>
      <div className="w-0 h-0 overflow-hidden">
        <div
          className="flex w-[960px] flex-col justify-between pb-10 px-12 bg-white"
          ref={exportRefCallback}
        >
          <div>
            <div className="flex items-center">
              <div className="relative flex h-[220px] w-[220px] items-center justify-center mt-[40px]">
                <img
                  className="absolute inset-0 h-full w-full select-none object-contain"
                  src={disc}
                  alt="disc"
                />
                <img
                  className="absolute h-[58px] w-[58px] shrink-0 rounded-full object-contain "
                  src={content.song.thumbnails[0].url}
                  alt="thumbnail"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="ml-[32px] flex min-w-0 flex-col ">
                <span className={`truncate text-[50px] font-semibold leading-[2] `}>
                  {content.song.title}
                </span>
                <span
                  className={` truncate text-[48px] font-light text-gray-400 leading-[2] -mt-[32px]`}
                >
                  {content.song.artist}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-12 mb-16 w-full px-2">
            <p className=" text-[48px] font-semibold  text-black ">
              {content.message}
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <img
                className="mr-[10px] h-[48px] w-[48px] mt-[36px]"
                src={logo}
                alt="disc"
              />
              <span className="gimmesong-primary-font text-[48px] tracking-wider">
                GIMMESONG
              </span>
            </div>
            <span className="text-[42px]  text-gray-300">
              gimmesong.link/@{user.username}
            </span>
          </div>
        </div>
      </div>
      <img className="w-full" src={exportedURL} alt={`inbox-widget`} />
    </>
  );
};
export default Twitter;
