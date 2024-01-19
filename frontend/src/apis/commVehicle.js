import axios from "axios";
import { baseurl } from "./url";
const API = axios.create({ baseURL: `${baseurl}/commercialVehicle` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});


export const get_comm_vehicle = () => API.get("/readCommVehicle/");
export const add_comm_vehicle = () => API.get("/addCommVehicle/");
// export const update_vehicle = (id, formdata) =>
 // API.patch(`/update/${id}`, formdata);
//export const delete_vehicle = (id) => API.delete(`/delete/${id}`);
