import React from "react";

export default class NativeBanner extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-f9+5u+4s-dn+7k"
        data-ad-client="ca-pub-9146142853898618"
        data-ad-slot="8876508853"
      />
    );
  }
}
