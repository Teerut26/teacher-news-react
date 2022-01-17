const is_dark = (state = false, action) => {
  switch (action.type) {
    case "set_is_dark":
      localStorage.setItem("theme_is_dark", Boolean(action.playload));
      return (state = action.playload);
    default:
      if (localStorage.getItem("theme_is_dark") === null) return state;
      let isTrueSet = (localStorage.getItem("theme_is_dark") === 'true')
      return isTrueSet;
  }
};

export { is_dark };
