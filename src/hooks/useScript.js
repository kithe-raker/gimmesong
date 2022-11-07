import { useEffect } from "react";

const useScript = (url, useAsync = false) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = useAsync;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
