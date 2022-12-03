import React from "react";

export default class SearchSongBanner extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          position: "absolute",
          width: "inherit",
          maxWidth: "inherit",
        }}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-layout-key="-f9+5u+4s-dn+7k"
        data-ad-client="ca-pub-9146142853898618"
        data-ad-slot="5689493764"
      />
    );
  }
}
