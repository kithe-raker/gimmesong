import { useEffect } from "react";

const useScript = ({
  url = "",
  useAsync = false,
  cfasync = true,
  innerHTML = "",
  disableOnDevelopment,
}) => {
  useEffect(() => {
    if (disableOnDevelopment && process.env.NODE_ENV === "development") return;

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
