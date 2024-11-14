import axios, { AxiosHeaders } from "axios";
import { useToastStore } from "@/stores/toast-store";

const axiosInstance = axios.create({
  baseURL: "https://6734c937a042ab85d11b9e03.mockapi.io/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const toastStore = useToastStore();
    toastStore.showToast("Error sending the request.", "error");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return Promise.reject(new Error("No data found in the response."));
  },
  (error) => {
    const toastStore = useToastStore();
    const errorMessage =
      error.response?.data?.message || "Error with server connection";
    toastStore.showToast(errorMessage, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;