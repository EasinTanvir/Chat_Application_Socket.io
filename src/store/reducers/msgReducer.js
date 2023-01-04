export const msgReducer = (state = { message: [] }, action) => {
  switch (action.type) {
    case "FETCH_MSG":
      return { ...state, message: action.payload };

    default:
      return state;
  }
};
