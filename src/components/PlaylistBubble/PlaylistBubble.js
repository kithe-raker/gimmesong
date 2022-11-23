import disc from "@assets/img/disc.png";
import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";

function PlaylistBubble({ data }) {
  const { user } = useSession();
  const navigate = useNavigate();

  const {
    counter,
    shareLinkId,
    isAnonymous,
    views,
    message,
    recentlyAdded = [],
  } = data;
  // let createdAt = new Date(data.createdAt._seconds);

  let _recentlyAdded = [...recentlyAdded];

  return (
    <div
      onClick={() => navigate(`/playlist/${shareLinkId}`)}
      className="mb-4 flex w-full cursor-pointer flex-col items-center justify-evenly overflow-hidden rounded-3xl bg-white p-4 shadow-md"
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start">
          <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-center text-xs font-semibold text-transparent">
            {isAnonymous
              ? "Anonymous"
              : `@${data.requester.username ?? user?.username}`}
          </span>
          {/* <span className="text-xs text-black">{createdAt.toString()}</span> */}
        </div>
        {/* <span className="text-sm font-semibold text-black">icon</span> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h13M12 5l7 7-7 7" />
        </svg>
      </div>
      <h4 className="mt-2 w-full line-clamp-1">{message}</h4>
      <div className="mt-6 flex w-full justify-between">
        {_recentlyAdded.length > 0 ? (
          <div className="flex">
            {_recentlyAdded.reverse().map((item, index) => {
              return (
                <div
                  className={`-ml-5 first:ml-0`}
                  style={{ zIndex: Math.abs(index - _recentlyAdded.length) }}
                  key={item.itemId}
                >
                  <div className={`relative w-12 pt-[100%]`}>
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={disc}
                      alt="disc"
                    />
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <img
                        className="h-[27%] w-[27%] select-none rounded-full object-contain"
                        src={item.thumbnail.url}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div> // just for flex between
        )}
        <div className="flex items-center">
          <span className="mr-1.5 flex h-[34px] min-w-[70px] shrink-0 items-center justify-center rounded-full bg-black px-4 text-sm text-white shadow-sm">
            <svg
              className={`mr-1.5 text-white`}
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 15.9C7.17001 15.9 5.41496 15.173 4.12096 13.879C2.82696 12.585 2.1 10.83 2.1 9C2.1 7.17001 2.82696 5.41496 4.12096 4.12096C5.41496 2.82696 7.17001 2.1 9 2.1C10.83 2.1 12.585 2.82696 13.879 4.12096C15.173 5.41496 15.9 7.17001 15.9 9C15.9 10.83 15.173 12.585 13.879 13.879C12.585 15.173 10.83 15.9 9 15.9ZM9 17.1C11.1483 17.1 13.2085 16.2466 14.7276 14.7276C16.2466 13.2085 17.1 11.1483 17.1 9C17.1 6.85175 16.2466 4.79148 14.7276 3.27244C13.2085 1.75339 11.1483 0.9 9 0.9C6.85175 0.9 4.79148 1.75339 3.27244 3.27244C1.75339 4.79148 0.9 6.85175 0.9 9C0.9 11.1483 1.75339 13.2085 3.27244 14.7276C4.79148 16.2466 6.85175 17.1 9 17.1Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              <path
                d="M10.4849 10.4849C10.8788 10.0911 11.1 9.55695 11.1 9C11.1 8.44305 10.8788 7.9089 10.4849 7.51508C10.0911 7.12125 9.55695 6.9 9 6.9C8.44305 6.9 7.9089 7.12125 7.51508 7.51508C7.12125 7.9089 6.9 8.44305 6.9 9C6.9 9.55695 7.12125 10.0911 7.51508 10.4849C7.9089 10.8788 8.44305 11.1 9 11.1C9.55695 11.1 10.0911 10.8788 10.4849 10.4849ZM6.24228 6.24228C6.97368 5.51089 7.96566 5.1 9 5.1C9.15913 5.1 9.31174 5.03679 9.42426 4.92426C9.53679 4.81174 9.6 4.65913 9.6 4.5C9.6 4.34087 9.53679 4.18826 9.42426 4.07574C9.31174 3.96321 9.15913 3.9 9 3.9C7.6474 3.9 6.35019 4.43732 5.39376 5.39376C4.43732 6.35019 3.9 7.6474 3.9 9C3.9 9.15913 3.96321 9.31174 4.07574 9.42426C4.18826 9.53679 4.34087 9.6 4.5 9.6C4.65913 9.6 4.81174 9.53679 4.92426 9.42426C5.03679 9.31174 5.1 9.15913 5.1 9C5.1 7.96566 5.51089 6.97368 6.24228 6.24228ZM13.9243 8.57574C13.8117 8.46321 13.6591 8.4 13.5 8.4C13.3409 8.4 13.1883 8.46321 13.0757 8.57574C12.9632 8.68826 12.9 8.84087 12.9 9C12.9 10.0343 12.4891 11.0263 11.7577 11.7577C11.0263 12.4891 10.0343 12.9 9 12.9C8.84087 12.9 8.68826 12.9632 8.57574 13.0757C8.46321 13.1883 8.4 13.3409 8.4 13.5C8.4 13.6591 8.46321 13.8117 8.57574 13.9243C8.68826 14.0368 8.84087 14.1 9 14.1C10.3526 14.1 11.6498 13.5627 12.6062 12.6062C13.5627 11.6498 14.1 10.3526 14.1 9C14.1 8.84087 14.0368 8.68826 13.9243 8.57574Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.2"
              />
            </svg>
            {counter}
          </span>
          <span className="flex h-[34px] min-w-[70px] shrink-0 items-center justify-center rounded-full bg-black px-4 text-sm text-white shadow-sm">
            <svg
              className={`mr-1.5 text-white`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            {views}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistBubble;
