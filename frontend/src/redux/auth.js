// const reducer = (
//   state = localStorage.getItem("profile")
//     ? JSON.parse(localStorage.getItem("profile"))
//     : null,
//   actions
// ) => {
//   switch (actions.type) {
//     case "LOGIN":
//       localStorage.setItem("id", actions.data._id);
//       localStorage.setItem("role", actions.data.role);
//       localStorage.setItem("profile", JSON.stringify({ ...actions.data }));
//       return { ...actions.data };
//     case "LOGOUT":
//       localStorage.clear();
//       return null;
//     case "UPDATE_PROFILE":
//       localStorage.setItem("profile", JSON.stringify({ ...actions.data }));
//       return { ...state, ...actions.data };
//     default:
//       return { ...state };
//   }
// };

// export default reducer;

const reducer = (
  state = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,
  action // Changed 'actions' to 'action' for consistency
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("id", action.data._id);
      localStorage.setItem("role", action.data.role);
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...action.data };
    case "LOGOUT":
      localStorage.clear();
      return null;
    case "UPDATE_PROFILE":
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      return { ...state, ...action.data };
    // case "ROLE_SWITCH_SUCCESS": // Handle the role switch success action
    //   localStorage.setItem("role", action.payload.newRole);
    //   return { ...state, role: action.payload.newRole }; // Update the role in the state
    default:
      return { ...state };
  }
};

export default reducer;
