import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;
axios.interceptors.response.use(
  (res) => res,
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
