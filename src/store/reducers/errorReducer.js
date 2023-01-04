const INITIAL_STATE = {
  isLoading: false,
  error: null,
  status: null,
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DATA_FETCHING":
      return { ...state, isLoading: true, error: null, status: null };

    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        status: action.payload || 201,
      };

    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        status: action.pay || 404,
      };

    default:
      return state;
  }
};
