const reducer = (state = "", action) => {
  console.log(action.type);
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.message;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    message,
  };
};

export default reducer;
