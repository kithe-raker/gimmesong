import { useState, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import useSession from "@hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ReceivedSongs from "./components/ReceivedSongs";
import Empty from "./components/Empty";

import Ads from "@lib/ads";
import toast from "react-hot-toast";

import GimmesongAPI from "@lib/gimmesong_api";

function ViewRequest() {
  const { id: shareLinkId } = useParams();
  const navigate = useNavigate();

  const [pageLayout, setPageLayout] = useState("multiple");
  const [loading, setLoading] = useState(false);
  const [requestInfo, setRequestInfo] = useState(null);

  const { user } = useSession();
  const [value, copy] = useCopyToClipboard();

  const copyToClipboard = (val) => {
    copy(val);
    toast("Copied!", {
      style: {
        borderRadius: "25px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (!shareLinkId) return;
    const fetchRequestDetails = async () => {
      setLoading(true);
      try {
        // implement api here
        const results = await GimmesongAPI.SongRequest.GetDetailsByLinkId(
          shareLinkId
        );
        console.log(results);

        if (results.exists) {
          setRequestInfo(results.details);
          GimmesongAPI.SongRequest.IncrementView(
            results.details.language,
            results.details.id
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [shareLinkId]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  return (
    <div className="relative mx-auto flex max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="gimmesong-bg fixed top-0 z-50 flex h-16 w-full max-w-md items-center justify-between px-2.5">
        <button
          onClick={() => navigate("/request")}
          className="group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>
        {requestInfo && (
          <div className="flex">
            <button className="group mr-1.5 flex h-[42px] shrink-0 items-center justify-center rounded-full bg-white px-4 text-sm shadow-sm">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span className="gimmesong-secondary-font ml-1">Share</span>
            </button>
            <button
              onClick={() => navigate(`/playlist/${shareLinkId}/add`)}
              className="group flex h-[42px] shrink-0 items-center justify-center rounded-full bg-black px-4 text-sm text-white shadow-sm"
            >
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="gimmesong-secondary-font ml-1">Songs</span>
            </button>
          </div>
        )}
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
      ) : requestInfo ? (
        <div className="flex w-full max-w-md flex-col items-center">
          <span className="mt-2 bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-center text-2xl font-semibold text-transparent">
            {requestInfo.isAnonymous
              ? "Anonymous"
              : `@${requestInfo.requester.username}`}
          </span>
          <span className="mt-1 px-4 text-center font-semibold line-clamp-2">
            {requestInfo.message}
          </span>
          <div className="gimmesong-bg sticky top-[60px] z-[49] mt-2 flex w-full flex-col items-center p-3">
            <div className="inline-flex rounded-full" role="group">
              <button
                type="button"
                onClick={() => setPageLayout("single")}
                className={`rounded-l-xl ${
                  pageLayout === "single"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="13"
                    viewBox="0 0 23 13"
                    fill="none"
                  >
                    <rect
                      x="5"
                      width="13"
                      height="13"
                      rx="6.5"
                      fill="currentColor"
                    />
                    <path
                      d="M0 4H0.5C1.88071 4 3 5.11929 3 6.5C3 7.88071 1.88071 9 0.5 9H0V4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M23 9H22.5C21.1193 9 20 7.88071 20 6.5C20 5.11929 21.1193 4 22.5 4H23V9Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="gimmesong-secondary-font ml-2 text-sm">
                    Full
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPageLayout("multiple")}
                className={`rounded-r-xl ${
                  pageLayout === "multiple"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                  >
                    <rect width="3" height="3" rx="1.5" fill="currentColor" />
                    <rect
                      y="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      y="12"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      y="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      y="12"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="gimmesong-secondary-font ml-2 text-sm">
                    Grid
                  </span>
                </div>
              </button>
            </div>
          </div>
          <ReceivedSongs
            shareLinkId={requestInfo.shareLinkId}
            requestId={requestInfo.id}
            language={requestInfo.language}
            layout={pageLayout}
            onLayoutChange={setPageLayout}
          />
        </div>
      ) : (
        <Empty
          title="Not found"
          message="Playlist that you are looking for may not exist."
        />
      )}
    </div>
  );
}

export default ViewRequest;
