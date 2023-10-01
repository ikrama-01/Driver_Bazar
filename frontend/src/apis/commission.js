import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/commission` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const create_commission = (formdata) =>
  API.post("/createCommission/", formdata);
export const get_commission = () => API.get(`/readCommission/`);
export const update_commission = (id, formdata) =>
  API.patch(`/updateCommission/${id}`, formdata);
export const delete_commission = (id) => API.delete(`/deleteCommission/${id}`);
