export const userReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};