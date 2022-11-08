import { useEffect } from "react";

const useScript = (url, useAsync = false, cfasync = true) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = useAsync;
    if (!cfasync) {
      script["data-cfasync"] = false;
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
