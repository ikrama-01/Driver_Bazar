import {
  create_driver,
  get_driver,
  update_driver,
  delete_driver,
  create_new_driver
} from "../apis/driver";

export const createDriver = async (formdata, state) => {
  try {
    const { data } = await create_driver(formdata);
    state();
    alert("Registration Successful");
    window.location.href = 'http://localhost:3000/'; 
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const createNewDriver = async (formdata, state) => {
//   try {
//     const { data } = await create_new_driver(formdata);
//     state();
//     alert("Registration Successful");
//     window.location.href = 'http://localhost:3000/'; 
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getDrivers = async () => {
  try {
    const { data } = await get_driver();
    if (localStorage.getItem("role") !== "admin") {
      return {
        data: data.filter((item) => item._id !== localStorage.getItem("id")),
      };
    }
    console.log(data)
    return { data: data };
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const updateDriver = async (id, formdata) => {
  try {
    const { data } = await update_driver(id, formdata);
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
export const deleteDriver = async (id) => {
  try {
    await get_driver(id);
    alert("Driver Deleted");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export default getDrivers;
