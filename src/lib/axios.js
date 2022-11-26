import axios from "axios";

const _apiUrl = {
  development: "https://gimmesong-api-develop-giculn566q-uc.a.run.app",
  production: "https://gimmesong-api-giculn566q-uc.a.run.app",
};

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? _apiUrl.production
      : _apiUrl.development,
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
