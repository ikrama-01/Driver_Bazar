import {
  create_commission,
  get_commission,
  update_commission,
  delete_commission,
} from "../apis/commission";

export const createCommission = async (formdata) => {
  try {
    const { data } = await create_commission(formdata);
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const getCommissions = async () => {
  try {
    const { data } = await get_commission();
    if (localStorage.getItem("role") !== "admin") {
      let filter = data.filter(
        (item) => item.driverId === localStorage.getItem("id") || item.passenger === localStorage.getItem("id")
      );
      return filter;
    }
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

export const updateCommission = async (id, formdata) => {
  try {
    const { data } = await update_commission(id, formdata);
    return data;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
export const deletecommission = async (id) => {
  try {
    await get_commission(id);
    alert("commission Deleted");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
