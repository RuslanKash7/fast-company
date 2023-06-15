import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      // console.log(config.url);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : [];
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
