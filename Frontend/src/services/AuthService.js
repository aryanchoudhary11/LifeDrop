import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      try {
        const { data } = await API.post("/refresh");
        localStorage.setItem("accessToken", data.accessToken);
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        return API(err.config);
      } catch (e) {
        console.error("Refresh failed", e);
      }
    }
    return Promise.reject(err);
  }
);

export const registerUser = (payload) => API.post("/register", payload);
export const loginUser = (payload) => API.post("/login", payload);
export const logoutUser = () => API.post("/logout");
export const getMe = (token) =>
  API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default API;
