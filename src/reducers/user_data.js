const user_data = (state = null, action) => {
  switch (action.type) {
    case "set_user_data":
      localStorage.setItem("user_data", JSON.stringify(action.playload));
      return (state = action.playload);
    default:
      return state;
  }
};

export { user_data };
