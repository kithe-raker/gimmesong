import { useState, useEffect } from "react";
import LanguageTag from "@lib/languageTag";
import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";

import GimmesongAPI from "@lib/gimmesong_api";
import SongRequest from "@components/SongRequest";

import Empty from "./components/Empty";

function Feed() {
  const { user } = useSession();

  const navigate = useNavigate();
  const tag = LanguageTag.getPreferenceLanguage();

  const [items, setItems] = useState([]);
  const [lang, setLang] = useState(tag);
  const [filter, setFilter] = useState("most_play");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const preferenceLang = ["th", "en"];

  const fetchFeed = async () => {
    try {
      setLoading(true);
      setError(false);

      let results;
      if (filter === "most_play") {
        results = await GimmesongAPI.SongRequest.QueryMostView(lang, {
          lastItemId: "",
          limit: 10,
        });
      } else if (filter === "newest") {
        results = await GimmesongAPI.SongRequest.QueryNewest(lang, {
          lastItemId: "",
          limit: 10,
        });
      } else if (filter === "my_request") {
        results = await GimmesongAPI.SongRequest.QueryUserRequest({
          lastItemId: "",
          limit: 10,
        });
      }
      setItems(results);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [filter, lang]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="mt-4 flex w-full flex-col px-4">
        <div className="flex items-center justify-between">
          <span className="gimmesong-secondary-font text-2xl font-bold">
            Songs Request
          </span>
          <button className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEAE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="overflow-x-auto">
            <div className="flex">
              <button
                onClick={() => setFilter("most_play")}
                className={`${
                  filter === "most_play"
                    ? "bg-black text-white"
                    : "border-[1.5px] border-gray-300"
                } gimmesong-secondary-font mr-1.5 flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
              >
                Most play
              </button>
              <button
                onClick={() => setFilter("newest")}
                className={`${
                  filter === "newest"
                    ? "bg-black text-white"
                    : "border-[1.5px] border-gray-300"
                } gimmesong-secondary-font mr-1.5 flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
              >
                Newest
              </button>
              {user?.username && (
                <button
                  onClick={() => setFilter("my_request")}
                  className={`${
                    filter === "my_request"
                      ? "bg-black text-white"
                      : "border-[1.5px] border-gray-300"
                  } gimmesong-secondary-font flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
                >
                  My Request
                </button>
              )}
            </div>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="block rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          >
            {preferenceLang.map((la, index) => (
              <option key={`${la}-${index}`} value={la}>
                {la.toUpperCase()}
              </option>
            ))}
            {!preferenceLang.includes(lang) && (
              <option value={lang}>{lang.toUpperCase()}</option>
            )}
          </select>
        </div>
        {loading ? (
          <div className="my-12 flex items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : items.length > 0 ? (
          <div className="mt-4">
            {items.map((item) => {
              return <SongRequest key={item.id} data={item} />; //<div key={item.id}>{JSON.stringify(item)}</div>;
            })}
          </div>
        ) : (
          <Empty
            title="No playlist yet"
            message="Let's create the world of music together."
          />
        )}
      </div>
      <button
        onClick={() => navigate("/request/new")}
        className={`group fixed bottom-4 right-4 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-black shadow-sm`}
      >
        <svg
          className={`text-white`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 17 17"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ transform: "scale(-1,1) rotate(-10deg)" }}
        >
          <g clipPath="url(#clip0_469_826)">
            <path
              d="M13.846 1.60059C13.4967 1.60059 13.1632 1.72215 12.8515 1.94045L12.8495 1.93765C8.66654 4.97628 4.79095 5.20539 2.92835 5.31549L2.77875 5.32447C1.7337 5.38739 0.783153 6.06815 0.298173 7.10072C-0.0950119 7.93786 -0.0996396 8.94837 0.286051 9.80412C0.787298 10.9161 1.74683 11.5908 2.80216 11.5922C2.94552 11.591 3.11619 11.594 3.29888 11.5996C3.0934 13.0154 3.93171 14.4657 5.38434 15.095C5.85091 15.2972 6.34286 15.399 6.83033 15.399C7.21057 15.399 7.58811 15.3371 7.94876 15.2127C8.78275 14.9252 9.42746 14.3389 9.76404 13.5622C9.81139 13.453 9.84941 13.3403 9.88308 13.2265C10.8459 13.6783 11.8446 14.2483 12.8495 14.9783L12.8515 14.9755C13.1633 15.1938 13.4967 15.3153 13.8461 15.3153C15.6147 15.3153 17.0001 12.3033 17.0001 8.45807C17.0001 4.61283 15.6146 1.60059 13.846 1.60059ZM9.14009 13.2916C8.88025 13.8912 8.37848 14.3451 7.72697 14.5698C7.06448 14.7978 6.32864 14.7629 5.65468 14.471C4.46563 13.9557 3.7829 12.7712 3.97923 11.6363C5.28176 11.7388 7.15932 12.0612 9.25433 12.9469C9.22463 13.0644 9.18847 13.1801 9.14009 13.2916ZM2.79622 10.912C2.04739 10.9192 1.28913 10.3741 0.906065 9.52445C0.601048 8.84752 0.60388 8.04955 0.91387 7.38989C1.29293 6.58262 2.02315 6.0513 2.81963 6.00315L2.96841 5.99435C4.65257 5.89482 7.9278 5.70073 11.6264 3.547C11.0474 4.78368 10.6922 6.51335 10.6922 8.458C10.6922 10.4039 11.0479 12.1344 11.6276 13.3712C7.79273 11.1393 4.2591 10.8945 2.79622 10.912ZM13.3364 8.458C13.3364 9.51961 12.5439 10.3974 11.5199 10.5364C11.4266 9.89912 11.3722 9.20489 11.3722 8.458C11.3722 7.71103 11.4266 7.01673 11.5199 6.37938C12.544 6.51846 13.3364 7.39638 13.3364 8.458ZM13.846 14.6352C13.6471 14.6352 13.4462 14.5604 13.2488 14.4286L13.2493 14.428C13.2146 14.4028 13.1801 14.3815 13.1455 14.3566C12.524 13.8687 11.9557 12.7549 11.6377 11.2056C12.9807 11.0102 14.0166 9.85433 14.0166 8.45803C14.0166 7.06159 12.9807 5.90573 11.6378 5.71026C11.9557 4.16163 12.5236 3.04807 13.1448 2.55987C13.1798 2.53484 13.2143 2.51336 13.2493 2.4879L13.2489 2.48728C13.4462 2.35549 13.6471 2.28069 13.8461 2.28069C15.0408 2.28069 16.32 4.76292 16.32 8.45803C16.32 12.1531 15.0408 14.6352 13.846 14.6352Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_469_826">
              <rect width="17" height="17" fill="currentColor" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}

export default Feed;
