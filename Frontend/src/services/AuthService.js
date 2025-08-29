import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      try {
        const { data } = await API.post("/refresh");
        localStorage.setItem("accessToken", data.accessToken);

        err.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(err.config);
      } catch (e) {
        console.error("Refresh failed", e);
        localStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(err);
  }
);

export const registerUser = (payload) => API.post("/register", payload);
export const loginUser = (payload) => API.post("/login", payload);
export const logoutUser = () => API.post("/logout");
export const getMe = () => API.get("/me");

export default API;
