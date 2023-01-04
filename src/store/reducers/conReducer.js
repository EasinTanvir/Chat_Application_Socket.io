export const conReducer = (state = { con: [] }, action) => {
  switch (action.type) {
    case "FETCH_CON":
      return { ...state, con: action.payload };

    default:
      return state;
  }
};



