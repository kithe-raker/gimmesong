import { useState } from "react";
import { useStateCallback } from "./useStateCallback";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useStateCallback(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue, callback) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue, callback);
  };
  return [storedValue, setValue];
};
