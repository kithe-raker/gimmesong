import disc from "@assets/img/disc.png";
import christmasTreeEmoji from "@assets/img/christmas_tree_emoji.png";
import confuseEmoji from "@assets/img/confuse_emoji.png";
import shushEmoji from "@assets/img/shushing_emoji.png";
import priceBackground from "./assets/price_bg.png";
import highlightedPriceBackground from "./assets/highlighted_price_bg.png";

function Shop() {
  // TODO: fetch this data from api instead of hard coding
  const discs = [
    {
      disc: disc,
      emoji: shushEmoji,
      price: 0,
      highlightPrice: true,
    },
    {
      disc: disc,
      emoji: christmasTreeEmoji,
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: confuseEmoji,
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: shushEmoji,
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: christmasTreeEmoji,
      price: 0.1,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: confuseEmoji,
      price: 0.1,
      highlightPrice: true,
    },
  ];

  return (
    <div className="gimmesong-secondary-font mx-auto flex min-h-screen max-w-md flex-col py-[60px] pt-[80px]">
      <div className="mx-3 flex flex-col">
        <span className="text-3xl font-extrabold">Shop (FREE!)</span>

        <div className="mt-7 grid grid-cols-2 gap-4 overflow-x-hidden">
          {discs.map((disc, i) => (
            <button key={i}>
              <div className="flex flex-col rounded-3xl bg-white hover:bg-gray-100">
                <div className="my-0 flex flex-row justify-end py-0">
                  <div className="relative mr-5 w-[50px] cursor-pointer pt-10">
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={
                        disc.highlightPrice
                          ? highlightedPriceBackground
                          : priceBackground
                      }
                      alt="price"
                    />
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <span className="text-white">
                        {disc.price === 0 ? "Free" : disc.price + "$"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mx-4 mb-6 cursor-pointer pt-[80%]">
                  <img
                    className="absolute inset-0 h-full w-full select-none object-contain"
                    src={disc.disc}
                    alt="disc"
                  />
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                    <img
                      className="h-[27%] w-[27%] select-none rounded-full object-contain"
                      src={disc.emoji}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
