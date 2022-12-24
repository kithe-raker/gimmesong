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
          className="relative flex min-h-[715px] w-[960px] flex-col justify-between bg-[#FF9C9C] px-[86px] pt-[42px] pb-[86px]"
          ref={exportRefCallback}
        >
          <img
            src={decoration}
            alt="Side Decoration"
            className="absolute bottom-0 right-[0px] w-[420px]"
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
            <div className="mt-[26px]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1787_42)">
                  <path
                    d="M9.44961 6.58763C9.42966 5.98339 9.40905 5.35854 9.37788 4.74439C9.34672 4.09766 9.22468 3.4585 9.01545 2.84572C8.8604 2.37863 8.61955 1.94453 8.30533 1.56562C7.6502 0.792248 6.78029 0.344317 5.7198 0.2343C5.01586 0.161228 4.33233 0.29375 3.75652 0.432798C2.72052 0.683239 1.87753 1.23599 1.25102 2.07572C0.60272 2.9446 0.244847 3.96082 0.187293 5.09545C0.182633 5.18672 0.177357 5.27808 0.172081 5.36942C0.154886 5.66721 0.137127 5.97493 0.142844 6.27823C0.148044 6.55271 0.177625 6.83046 0.206258 7.09906C0.216154 7.19176 0.226011 7.28446 0.234948 7.37714C0.251541 7.54925 0.364555 7.66094 0.553099 7.69166C0.621431 7.7014 0.690285 7.70707 0.759295 7.70859C0.808426 7.71062 0.85921 7.71275 0.908074 7.71804C0.957349 7.72458 1.00615 7.73431 1.0542 7.74704C1.06817 7.75043 1.08229 7.75377 1.09655 7.75711C1.09788 7.79099 1.09935 7.82369 1.10083 7.85544C1.10469 7.93994 1.10835 8.01976 1.10701 8.09804C1.10305 8.32976 1.16309 8.56312 1.29602 8.83236C1.46432 9.17345 1.76098 9.35897 2.15386 9.36899L2.15846 9.36909C2.57052 9.37817 2.88141 9.19632 3.05773 8.84301C3.21464 8.52853 3.28698 8.28042 3.29231 8.03847C3.30745 7.55214 3.29746 7.06526 3.26237 6.57989C3.21534 6.01566 2.81099 5.64434 2.23098 5.63156L2.22139 5.63135C1.89968 5.62648 1.62532 5.72766 1.42797 5.92401C1.22897 6.12206 1.12555 6.39913 1.12896 6.72538C1.12926 6.75314 1.13042 6.78108 1.13153 6.80921C1.13658 6.9283 1.14104 7.04128 1.08324 7.15211C1.05953 7.14987 1.03591 7.14852 1.01286 7.14718C0.91092 7.14114 0.814374 7.13581 0.729097 7.05977C0.723672 6.36537 0.770631 5.66285 0.819228 5.0025C0.860007 4.4432 0.988791 3.89378 1.20083 3.37457C1.53761 2.55102 2.03886 1.941 2.73353 1.50969C3.67831 0.923154 4.72176 0.826569 5.61794 0.809594C7.14207 1.00531 8.07767 1.77869 8.47816 3.17397C8.63535 3.74025 8.72376 4.32339 8.74141 4.9108L8.74668 5.0404C8.76085 5.38447 8.77542 5.74026 8.78046 6.09001C8.78125 6.14329 8.78339 6.19672 8.78564 6.25044C8.79799 6.41101 8.7923 6.57244 8.76852 6.73174L8.40092 6.81423C8.39775 6.80734 8.39469 6.80082 8.39181 6.79447C8.38121 6.77508 8.37348 6.75422 8.36886 6.73254C8.3282 6.38786 8.14054 6.12004 7.76071 5.86404C7.58435 5.7532 7.37879 5.69767 7.17055 5.70467C6.96237 5.71163 6.761 5.78076 6.59242 5.90319C6.36866 6.07359 6.22749 6.33546 6.18416 6.6604C6.15825 6.88416 6.14872 7.10946 6.15561 7.3346C6.15663 7.40428 6.1574 7.47408 6.15782 7.54392C6.15487 7.85558 6.16893 8.16719 6.20009 8.47734C6.2652 9.02312 6.62587 9.37634 7.1896 9.44651C7.55628 9.49199 7.85445 9.36428 8.05198 9.07672C8.30867 8.7029 8.39996 8.35347 8.33109 8.00858C8.2939 7.82878 8.30904 7.64207 8.37472 7.47053C8.4358 7.47229 8.49574 7.47503 8.55502 7.47782C8.70165 7.48775 8.84866 7.48838 8.99534 7.47987C9.32494 7.45358 9.47315 7.28439 9.46178 6.94722L9.44961 6.58763ZM2.68487 7.42039C2.68256 7.45573 2.68037 7.49042 2.67963 7.52414C2.67955 7.52764 2.67993 7.53108 2.68074 7.53448C2.75223 7.81007 2.7149 8.10253 2.57649 8.35126L2.56447 8.37405C2.54084 8.42298 2.51261 8.46954 2.48014 8.51305C2.43303 8.57278 2.37162 8.61975 2.30158 8.64957C2.23155 8.67932 2.15514 8.69098 2.0794 8.68344C2.00568 8.67583 1.93512 8.64955 1.87444 8.60695C1.81376 8.56442 1.76498 8.50708 1.73273 8.44039C1.68699 8.35306 1.66009 8.25714 1.65375 8.15876C1.63777 7.70779 1.6291 7.24607 1.62798 6.78647C1.6273 6.51903 1.76777 6.34984 2.02343 6.31024C2.06595 6.30341 2.10899 6.30033 2.15205 6.30098C2.35518 6.30546 2.49054 6.41171 2.56393 6.6232C2.62184 6.80695 2.66205 6.99577 2.68402 7.18715C2.69218 7.26469 2.69247 7.34284 2.68487 7.42039ZM7.67345 7.16079C7.67352 7.20596 7.67222 7.25158 7.67091 7.29732C7.66058 7.43801 7.6692 7.57954 7.6965 7.71797C7.7644 7.99194 7.65132 8.21912 7.54196 8.43867C7.4607 8.60187 7.35608 8.67124 7.21198 8.65686C6.99748 8.63553 6.87067 8.55223 6.81344 8.39458C6.76593 8.27704 6.73665 8.1529 6.72651 8.02652C6.70813 7.48864 6.70268 7.05266 6.70944 6.65436C6.71114 6.55575 6.77278 6.45692 6.87857 6.38313C6.97057 6.31876 7.08029 6.2846 7.19255 6.28547C7.23439 6.28609 7.27585 6.29329 7.31539 6.30679C7.40448 6.34249 7.48926 6.38828 7.56796 6.44326C7.60579 6.46733 7.64473 6.49208 7.68657 6.51683C7.68503 6.58664 7.68315 6.65323 7.68144 6.71757C7.67721 6.87162 7.67329 7.01726 7.67339 7.16079L7.67345 7.16079Z"
                    fill="#F4EAE1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1787_42">
                    <rect
                      width="9.42393"
                      height="9.42393"
                      fill="white"
                      transform="translate(0.207031) rotate(1.26222)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                // "-webkit-text-stroke": "0.5px white",
              }}
              className="ml-2"
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
                className="mr-[10px] mt-[12px] w-[44px]"
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
export default Pattern4;
