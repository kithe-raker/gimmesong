import React from "react";
import goldenDisc from "@assets/img/goldenDisc.png";
import support_btn_bg from "@assets/img/support_btn_bg.png";
import noAds from "@assets/img/no_ads_icon.png";

function PaymentDetail() {
  return (
    <div className="relative mx-auto flex h-full max-w-md items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="text-8xl">🤗</span>
        <h1 className="gimmesong-primary-font pt-6 text-4xl">
          Support GIMMESONG :)
        </h1>
        <span className="gimmesong-secondary-font px-9 pt-4 text-center text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <div className="flex items-center px-7 pt-7">
          <div className="flex flex-col">
            <span className=" gimmesong-secondary-font text-lg font-bold">
              1. Remove Ads
            </span>
            <span className=" gimmesong-secondary-font text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </span>
          </div>
          <img className=" h-[75px]" src={noAds} />
        </div>
        <div className="flex items-center px-7 pt-5">
          <div className="flex flex-col">
            <span className="gimmesong-secondary-font text-lg font-bold">
              2. Golden Disc
            </span>
            <span className="gimmesong-secondary-font text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </span>
          </div>
          <img className=" h-[75px]" src={goldenDisc} />
        </div>
        <div className="flex w-full items-center justify-center pt-16">
          <button className="relative w-fit h-fit flex items-center justify-center">
            <span className="absolute text-white gimmesong-secondary-font h-max w-max text-base">Support for 59</span>
            <img src={support_btn_bg} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetail;
