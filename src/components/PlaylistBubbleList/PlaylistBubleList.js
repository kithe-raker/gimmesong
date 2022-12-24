import NativeBanner from "@components/Adsense/NativeBanner";
import Empty from "./components/Empty";
import PlaylistBubble from "@components/PlaylistBubble/PlaylistBubble";
import { useInView } from "react-cool-inview";

/**
 * A vertical list of playlist bubbles, containing ads bubble. This component also handle load more on scroll.
 * @param isLoading whether to show a loading animation, or to show the component itself.
 * @param items the list of items to be rendered in each playlist bubble.
 * @param loadMore a function that takes in a number, and will load more items in that specified amount of number.
 * @param isLoadingMore whether or not to show loading more animation.
 * @param canLoadMore whether or not this component should load more items (or all items has already been loaded or any other cases, then pass false here).
 * @returns
 */
function PlaylistBubbleList({
  items,
  canLoadMore,
  loadMore,
  isLoadingMore,
  isLoading,
}) {
  // How many feed item per one ads banner
  const _adsRate = 10;
  var _feedCounter = 0;

  const { observe: loadMoreRef } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: () => {
      if (canLoadMore && !isLoadingMore) loadMore(20);
    },
  });

  return (
    <div className="flex w-full flex-col px-4 pb-[80px]">
      <div className="flex items-center justify-between"></div>

      {isLoading ? (
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
        <>
          <div className="mt-6">
            {items.map((item) => {
              _feedCounter++;
              const showAds = _feedCounter >= _adsRate;

              if (showAds) _feedCounter = 0;

              return showAds ? (
                <div key={`${item.id}`}>
                  <div className="mb-4">
                    <NativeBanner />
                  </div>

                  <PlaylistBubble data={item} />
                </div>
              ) : (
                <PlaylistBubble key={`${item.id}`} data={item} />
              );
            })}
          </div>

          {canLoadMore && (
            <div
              ref={loadMoreRef}
              className={`my-12 flex items-center justify-center`}
            >
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
          )}
        </>
      ) : (
        <Empty
          title="Oops, What an empty space"
          message="Let's create the world of music together."
        />
      )}
    </div>
  );
}

export default PlaylistBubbleList;
