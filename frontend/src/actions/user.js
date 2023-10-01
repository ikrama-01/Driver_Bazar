import { login as login_api, signup as signup_api } from "../apis/user";

export const login = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await login_api(formdata);
    dispatch({ type: "LOGIN", data: data });

    if (data.role === "rider") {
      router("/rider");
    } else if (data.role === "driver") {
      router("/driver");
    } else {
      router("/admin");
    }
  } catch (error) {
    console.log(error);
    alert("Incorrect email or password");
  }
};

export const signup = async (formdata, state) => {
  try {
    const { data } = await signup_api(formdata);
    if (state) {
      state()
      alert("You have registered successfully,please login to continue");
    };
    console.log(data)
    return data.user_id
  } catch (error) {
    console.log(error);
    alert("Email already in use");
  }
};
