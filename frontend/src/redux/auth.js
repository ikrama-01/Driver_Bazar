const reducer = (
  state = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,
  actions
) => {
  switch (actions.type) {
    case "LOGIN":
      localStorage.setItem("id", actions.data._id);
      localStorage.setItem("role", actions.data.role);
      localStorage.setItem("profile", JSON.stringify({ ...actions.data }));
      return { ...actions.data };
    case "LOGOUT":
      localStorage.clear();
      return null;
    case "UPDATE_PROFILE":
      localStorage.setItem("profile", JSON.stringify({ ...actions.data }));
      return { ...state, ...actions.data };
    default:
      return { ...state };
  }
};

export default reducer;
