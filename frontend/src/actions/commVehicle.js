import {
  add_comm_vehicle,
  get_comm_vehicle,
 // update_vehicle,
  //delete_vehicle,
} from "../apis/commVehicle";

export const addCommVehicle = async (formdata) => {
  try {
    const { data } = await add_comm_vehicle({
      ...formdata,
      ownerId: localStorage.getItem("id"),
    });
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getCommercialVehicles = async () => {
  try {
    const { data } = await get_comm_vehicle();
    if (localStorage.getItem("role") !== "admin") {
      let filter = data.filter(
        (item) =>
          item.ownerId === localStorage.getItem("id")
      );
      console.log(localStorage.getItem("id"))
      return filter;
    }
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

// export const updateVehicle = async (id, formdata) => {
//   try {
//     const { data } = await update_vehicle(id, formdata);
//     return data;
//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong");
//   }
// };
// export const deleteVehicle = async (id) => {
//   try {
//     await delete_vehicle(id);
//     alert("vehicle Deleted");
//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong");
//   }
// };
