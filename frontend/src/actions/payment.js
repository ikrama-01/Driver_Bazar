import { get_payments } from "../apis/payment";

export const getPayments = async () => {
    try {
      const { data } = await get_payments();
      return data;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };