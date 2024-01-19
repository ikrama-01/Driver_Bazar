import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/owner` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const create_owner = (formdata) => API.post("/createOwner/", formdata);
// export const create_new_driver = (formdata) => API.post("/add_new_driver/", formdata);
export const get_owner = () => API.get("/read/");
export const update_owner = (id, formdata) =>
  API.patch(`/update/${id}`, formdata);
export const delete_owner = (id) => API.delete(`/${id}`);
