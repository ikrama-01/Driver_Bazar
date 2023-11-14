import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/user` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const signup = (formdata) => API.post("/signup/", formdata);
export const login = (formdata) => API.post("/login/", formdata);
export const reset_password = (formdata) =>
  API.post("/reset_Password", formdata);
export const switchRole = (data) => API.post("/switch_role", data); // Update with your endpoint
export const check_id_match = (data) => API.post("/check_id_match", data); // Update with your endpoint
export default API;