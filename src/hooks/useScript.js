import { useEffect } from "react";

const useScript = ({
  url = "",
  useAsync = false,
  cfasync = true,
  innerHTML = "",
  disable,
  disableInDevMode,
}) => {
  useEffect(() => {
    if (disable) return;
    if (
      disableInDevMode &&
      (process.env.NODE_ENV !== "production" ||
        process.env.REACT_APP_ENV !== "production")
    )
      return;

    const script = document.createElement("script");

    if (url) {
      script.src = url;
    }
    script.async = useAsync;
    if (!cfasync) {
      script["data-cfasync"] = false;
    }
    script.innerHTML = innerHTML;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
