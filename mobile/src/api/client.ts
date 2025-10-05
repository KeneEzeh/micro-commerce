import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getLogoutFunction } from "../context/AuthContext";

const BACKEND = process.env.BACKEND_URL;

const api = axios.create({ baseURL: Constants.expoConfig.extra.backendUrl });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      const logout = getLogoutFunction();
      if (logout) await logout();
      return Promise.reject({ message: "Token expired" });
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  //   console.log("Request:", config.method, config.url, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error);
    console.error(
      "Axios error:",
      error.response?.status,
      error.response?.data,
      error.message
    );
    return Promise.reject(error);
  }
);

export default api;
