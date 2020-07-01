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

export const setNotification = (message, seconds = 3) => {
  return async (dispatch) => {
    await dispatch({
      type: "SET_NOTIFICATION",
      message,
    });
    // remove notification after specified time
    return setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default reducer;
