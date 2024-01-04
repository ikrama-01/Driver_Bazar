import {
  create_vehicle,
  get_vehicle,
  update_vehicle,
  delete_vehicle,
  readCommercialVehicle,
} from "../apis/vehicle";

export const createVehicle = async (formdata) => {
  try {
    const { data } = await create_vehicle({
      ...formdata,
      ownerId: localStorage.getItem("id"),
    });
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getVehicles = async () => {
  try {
    const { data } = await get_vehicle();
    if (localStorage.getItem("role") !== "admin") {
      let filter = data.filter(
        (item) =>
          item.ownerId === localStorage.getItem("id") ||
          item.driverId === localStorage.getItem("id")
      );
      return filter;
    }
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getCommercialVehicles = async () => {
  try {
    const { data } = await readCommercialVehicle();
    return data;
  } catch (error) {
    console.error("Error fetching commercial vehicles:", error);
    throw new Error("Failed to fetch commercial vehicles");
  }
};


export const updateVehicle = async (id, formdata) => {
  try {
    const { data } = await update_vehicle(id, formdata);
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
export const deleteVehicle = async (id) => {
  try {
    await delete_vehicle(id);
    alert("vehicle Deleted");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
