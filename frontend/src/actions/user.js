import { login as login_api, signup as signup_api } from "../apis/user";
import { switchRole as switchRole_api } from "../apis/user";
// import { check_id_match } from '../apis/user';
import API from '../api/user';


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

export const switchRole = (email, newRole) => async (dispatch) => {
  try {
    const response = await switchRole_api({ email, new_role: newRole });
    return response;
  } catch (error) {
    console.log(error);
    // Handle errors
  }
};

// export const check_id_match = (id) => async (dispatch) => {
//   try {
//     const response = await check_id_action(id);

//     // Assuming your API returns an object with a 'match' property
//     if (response === true) {// Dispatch action for match found
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log(error);
//     // Handle errors
//     return false;
//   }
// };
export const check_id_match = (id) => async () => {
  try {
      const response = await API.post('/user/check_id_match', { id });
      console.log(response);
      return response.data;
  } catch (error) {
      console.log(error);
      // Handle errors
  }
};
