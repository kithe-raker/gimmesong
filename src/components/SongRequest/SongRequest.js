function SongRequest({ data }) {
  const { counter, shareLinkId, isAnonymous, views, message } = data;
  var createdAt = new Date(data.createdAt._seconds);

  var recentlyAdded = [];
  recentlyAdded = data.recentlyAdded;

  var requesterName = "Anonymous";
  if (!isAnonymous) requesterName = data.requester.username;

  return (
    <div className="flex h-48 w-72 flex-col items-center justify-evenly overflow-hidden rounded-3xl bg-white">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-black">
            {requesterName}
          </span>
          <span className="text-xs text-black">{createdAt.toString()}</span>
        </div>

        <span className="text-sm font-semibold text-black">icon</span>
      </div>

      <h4 className=" w-full items-start">{message}</h4>

      <div className="flex w-full flex-row justify-between">
        {recentlyAdded.length > 0 ? (
          <div className="flex w-full flex-row ">
            {recentlyAdded.map((item) => {
              return (
                <img
                  className="h-[27%] w-[27%] select-none rounded-full object-contain"
                  key={item.itemId}
                  src={item.thumbnail.url}
                  alt="thumbnail"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              );
            })}
          </div>
        ) : (
          <div className="flex w-full flex-row ">
            <span className="mr-2 text-sm font-semibold text-black">
              song {counter}
            </span>
            <span className="text-sm font-semibold text-black">
              view {views}
            </span>
          </div>
        )}

        <span className="text-sm font-semibold text-black">share</span>
      </div>
    </div>
  );
}

export default SongRequest;
