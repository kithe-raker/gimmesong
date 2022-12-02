import logo from "@assets/img/gimmesong_logo.png";
import disc from "@assets/img/disc.webp";

import useSession from "@hooks/useSession";
import { useImageExporter } from "@hooks/useImageExporter";
import { Button } from "@chakra-ui/react";

const Twitter = ({ content }) => {
  const { exportedURL, exportRefCallback } = useImageExporter();
  const { user } = useSession();

  return (
    <>
      <div className="h-0 w-0 overflow-hidden">
        <div
          className="flex w-[960px] flex-col justify-between bg-white px-[86px] pt-[42px] pb-[86px]"
          ref={exportRefCallback}
        >
          <div>
            <div className="flex items-center">
              <div className="relative mt-[40px] flex h-[180px] w-[180px] items-center justify-center">
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
                <span
                  className={`truncate text-[44px] font-bold leading-[2] `}
                >
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
              className=" text-[54px] font-bold  text-black pr-[120px] italic"
            >
              {content.message}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                className="mr-[10px] mt-[36px] h-[40px] w-[40px]"
                src={logo}
                alt="disc"
              />
              <span className="gimmesong-primary-font text-[40px] tracking-wider">
                GIMMESONG
              </span>
            </div>
            <span className="-mt-[20px]  text-[36px] text-gray-300">
              gimmesong.link/@{user.username}
            </span>
          </div>
        </div>
      </div>
      <img className="w-full" src={exportedURL} alt={`inbox-widget`} />
      <Button
        marginTop={4}
        onClick={() => navigator.share(exportedURL)}
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
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_271_136)">
              <path
                d="M9.84094 61.991C12.5251 63.1216 15.6175 61.8627 16.7481 59.1785C19.3113 53.0944 22.6603 47.3119 26.7022 41.9913C28.4639 39.6724 28.0121 36.3642 25.6932 34.6022C23.3743 32.8405 20.0658 33.2923 18.3037 35.6112C13.7278 41.6345 9.93445 48.1866 7.02844 55.0842C5.89781 57.7677 7.15676 60.8604 9.84094 61.991Z"
                fill="currentColor"
              />
              <path
                d="M34.6022 25.6929C36.3639 28.0118 39.6721 28.4636 41.9913 26.7019C47.3115 22.6603 53.094 19.3113 59.1785 16.7481C61.8623 15.6175 63.1216 12.5251 61.991 9.84094C60.8604 7.15711 57.768 5.89781 55.0842 7.02844H55.0839C48.1859 9.93445 41.6341 13.7278 35.6112 18.3034C33.2926 20.0654 32.8405 23.3736 34.6022 25.6929Z"
                fill="currentColor"
              />
              <path
                d="M6.60867 105.823C9.49887 105.463 11.5495 102.828 11.1888 99.938C10.7568 96.4768 10.5469 93.2263 10.5469 90C10.5469 86.7734 10.7568 83.5228 11.1888 80.062C11.5495 77.1722 9.49922 74.5369 6.60902 74.1762C3.71883 73.8155 1.08352 75.8658 0.722812 78.756C0.243281 82.6003 0 86.3831 0 90C0 93.6165 0.243281 97.3993 0.722812 101.244C1.08352 104.134 3.71848 106.184 6.60867 105.823Z"
                fill="currentColor"
              />
              <path
                d="M103.248 168.332C98.8158 169.076 94.3583 169.453 90 169.453C85.737 169.453 81.4039 169.073 76.7531 168.292C73.8809 167.809 71.1612 169.746 70.6785 172.618C70.1958 175.49 72.1325 178.21 75.0048 178.693C80.2396 179.572 85.1446 180 90 180C94.9416 180 99.9861 179.574 104.994 178.733C107.866 178.251 109.804 175.532 109.322 172.66C108.84 169.787 106.121 167.85 103.248 168.332Z"
                fill="currentColor"
              />
              <path
                d="M153.64 26.3602C136.641 9.36176 114.04 0 90 0C86.3831 0 82.6003 0.243281 78.7563 0.723164C75.8661 1.08387 73.8158 3.71883 74.1765 6.60902C74.5372 9.49887 77.1722 11.5499 80.0624 11.1892C83.5225 10.7568 86.7734 10.5469 90 10.5469C133.811 10.5469 169.453 46.1893 169.453 90C169.453 99.5186 167.78 108.841 164.479 117.708C161.373 126.053 156.914 133.767 151.226 140.636C149.369 142.879 149.682 146.203 151.925 148.061C154.168 149.919 157.492 149.606 159.35 147.363C165.793 139.582 170.844 130.842 174.363 121.387C178.103 111.339 180 100.779 180 90C180 65.9602 170.638 43.3593 153.64 26.3602Z"
                fill="currentColor"
              />
              <path
                d="M148.061 151.924C146.204 149.681 142.88 149.368 140.636 151.226C133.767 156.914 126.053 161.373 117.709 164.479C114.979 165.495 113.59 168.531 114.606 171.261C115.622 173.99 118.658 175.379 121.388 174.363C130.843 170.844 139.582 165.793 147.363 159.349C149.606 157.492 149.919 154.168 148.061 151.924Z"
                fill="currentColor"
              />
              <path
                d="M62.3109 164.446C54.0422 161.367 46.337 156.894 39.4102 151.152C37.1679 149.293 33.8439 149.604 31.9852 151.846L31.9848 151.847C30.1261 154.089 30.4369 157.413 32.6791 159.272C40.5193 165.771 49.2507 170.838 58.6308 174.33C61.3603 175.347 64.3968 173.958 65.4131 171.229C66.4295 168.499 65.0405 165.463 62.3109 164.446Z"
                fill="currentColor"
              />
              <path
                d="M15.6115 117.658C14.5965 114.928 11.5608 113.538 8.8309 114.553C6.10102 115.568 4.71094 118.604 5.7259 121.334C9.25348 130.82 14.298 139.564 20.7193 147.322C22.5763 149.566 25.9003 149.879 28.144 148.022L28.1443 148.022C30.388 146.165 30.7012 142.84 28.8439 140.597C23.1782 133.752 18.726 126.034 15.6115 117.658Z"
                fill="currentColor"
              />
              <path
                d="M84.5508 64.8633C84.5508 61.8538 86.9905 59.4141 90 59.4141C93.0095 59.4141 95.4492 61.8538 95.4492 64.8633V115.137C95.4492 118.146 93.0095 120.586 90 120.586C86.9905 120.586 84.5508 118.146 84.5508 115.137V64.8633Z"
                fill="currentColor"
              />
              <path
                d="M64.8633 95.4492C61.8538 95.4492 59.4141 93.0095 59.4141 90C59.4141 86.9905 61.8538 84.5508 64.8633 84.5508L115.137 84.5508C118.146 84.5508 120.586 86.9905 120.586 90C120.586 93.0095 118.146 95.4492 115.137 95.4492L64.8633 95.4492Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_271_136">
                <rect width="180" height="180" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Share on Twitter!
        </div>
      </Button>
    </>
  );
};
export default Twitter;
