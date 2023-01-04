import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { conReducer } from "./reducers/conReducer";
import { errorReducer } from "./reducers/errorReducer";
import { msgReducer } from "./reducers/msgReducer";
import { userReducer } from "./reducers/userReducer";

const userData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const INITIL_REDUCER = {
  auth: { user: userData },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
    cons: conReducer,
    message: msgReducer,
  },
  preloadedState: INITIL_REDUCER,
});
