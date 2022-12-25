const { useState, useCallback, useEffect, useRef } = require("react");

/**
 * A hook similar to useState, but can be passed a callback function to be called when setState is done setting the state value. Copy & pasted from https://medium.com/geekculture/usecallbackstate-the-hook-that-let-you-run-code-after-a-setstate-operation-finished-25f40db56661
 * @param {*} initialValue the initial state. pass the same thing you would pass in useState(...) hook
 * @returns [state, setStateCallback] state is the same as in useState(...) hook and the setStateCallback is similar to useState(...) hook, but takes additional parameter as a function to be called when the state has been successfully updated.
 */
export const useStateCallback = (initialValue) => {
  const [state, _setState] = useState(initialValue);
  const callbackQueue = useRef([]);
  useEffect(() => {
    callbackQueue.current.forEach((cb) => cb(state));
    callbackQueue.current = [];
  }, [state]);
  const setState = (newValue, callback) => {
    _setState(newValue);
    if (callback && typeof callback === "function") {
      callbackQueue.current.push(callback);
    }
  };
  return [state, setState];
};
