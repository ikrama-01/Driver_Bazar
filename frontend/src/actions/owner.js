import {
  create_owner,
  get_owner,
  update_owner,
  delete_owner,
  create_new_driver
} from "../apis/owner";

export const createOwner = async (formdata, state) => {
  try {
    const { data } = await create_owner(formdata);
    console.log(formdata)
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

export const getOwner = async () => {
  try {
    const { data } = await get_owner();
    if (localStorage.getItem("role") !== "admin") {
      return {
        data: data.filter((item) => item._id !== localStorage.getItem("id")),
      };
    }
    return { data: data };
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const updateOwner = async (id, formdata) => {
  try {
    const { data } = await update_owner(id, formdata);
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
export const deleteOwner = async (id) => {
  try {
    await get_owner(id);
    alert("Driver Deleted");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export default getOwner;
