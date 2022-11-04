import axios from "axios";

const instance = axios.create({
  baseURL: "https://gimmesong-api-giculn566q-uc.a.run.app",
});

const getToken = () => {
  const value = localStorage.getItem("user");
  const user = JSON.parse(value);
  return user?.token;
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance as axios };
