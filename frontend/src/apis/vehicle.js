import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/vehicle` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const create_vehicle = (formdata) =>
  API.post("/createVehicle/", formdata);
export const get_vehicle = () => API.get("/readVehicle/");
export const readCommercialVehicle = () => API.get("/readCommercialVehicle/");
export const update_vehicle = (id, formdata) =>
  API.patch(`/update/${id}`, formdata);
export const delete_vehicle = (id) => API.delete(`/delete/${id}`);
