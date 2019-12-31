"use strict";

// import Vue from "vue";
import axios from "axios";
import store from "@/store";
import qs from "qs";
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_baseUrl || "/";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 默认请求超时时间
const defaultTimeOut = 3000;
let config = {
  baseURL: process.env.VUE_APP_baseUrl || "/",
  timeout: defaultTimeOut, // Timeout
  withCredentials: true // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    config.headers["Authorization"] = store.state.token || "";
    switch (String.prototype.toLowerCase.call(config.method)) {
      case "get":
        // get 请求添加时间戳 清除IE缓存
        config.params["timestamp"] = new Date().getTime().toString();
        break;

      default:
        break;
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.data.code == 0) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
    // return response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Plugin.install = function(Vue, options) {
//   console.log(options);
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     }
//   });
// };

// Vue.use(Plugin);
let requestFunc = {
  /**
   * 请求方法封装
   * url 请求链接
   * data 请求数据
   * headers 覆写的头信息
   * timeout 覆写的请求超时时间
   * isFormData 是否是 formData -》需要 qs.stringify
   */
  get: (url = "", data = {}, headers = {}, timeout = defaultTimeOut) => {
    return _axios.get(url, { params: data, headers, timeout });
  },
  delete: (url = "", data = {}, headers = {}, timeout = defaultTimeOut) => {
    return _axios.get(url, { params: data, headers, timeout });
  },
  post: (
    url = "",
    data = {},
    headers = {},
    timeout = defaultTimeOut,
    isFormData
  ) => {
    return _axios.post(url, isFormData ? qs.stringify(data) : data, {
      headers,
      timeout
    });
  },
  put: (
    url = "",
    data = {},
    headers = {},
    timeout = defaultTimeOut,
    isFormData
  ) => {
    return _axios.post(url, isFormData ? qs.stringify(data) : data, {
      headers,
      timeout
    });
  }
};
export default requestFunc;
