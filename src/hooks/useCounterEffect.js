import { useState, useRef } from "react";
import { useInterval } from "usehooks-ts";

const useCounterEffect = () => {
  const [counter, setCounter] = useState(0);
  const timeoutId = useRef(null);

  useInterval(
    () => setCounter((c) => (c > 0 ? c - 1 : 0)),
    counter > 0 ? 1000 : null
  );

  /**
   * @param {void} fn
   * @param {Integer} delay seconds
   */
  const callback = (fn, delay) => {
    setCounter(delay);
    timeoutId.current = setTimeout(fn, delay * 1000);
  };

  const clear = () => {
    setCounter(0);
    clearTimeout(timeoutId.current);
  };

  return { counter, clear, callback };
};

export default useCounterEffect;
