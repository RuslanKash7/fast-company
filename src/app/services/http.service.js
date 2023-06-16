import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      // console.log(config.url);

      // встраивание обновления токена
      const expiresDate = localStorageService.getTokenExpiresDate();
      const refreshToken = localStorageService.getRefreshToken();

      // проверяем есть ли вообще пользователь?
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grand_type: "refresh_token",
          refresh_token: refreshToken
        });
        // console.log(data);
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.expires_in,
          expiresIn: data.user_id
        });
      }
      // для авторизированного запроса
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config, auth: accessToken };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  // объект трансформирует в массив
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },

  function (error) {
    const expectedErrors =
      error.response &&
      error.respose.status >= 400 &&
      error.respose.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try it later.");
      toast("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
