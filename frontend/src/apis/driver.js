import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/driver` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const create_driver = (formdata) => API.post("/createDriver/", formdata);
export const get_driver = () => API.get("/read/");
export const update_driver = (id, formdata) =>
  API.patch(`/update/${id}`, formdata);
export const delete_driver = (id) => API.delete(`/${id}`);
