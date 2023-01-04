import history from "../../history";
import api from "../api";
export const Sign_Up = (recData) => async (dispatch) => {
  try {
    dispatch({ type: "DATA_FETCHING" });
    await api.post("/api/user/create", recData);
    dispatch({ type: "SIGN_UP", payload: {} });
    dispatch({ type: "SUCCESS", payload: 200 });
  } catch (err) {
    dispatch({
      type: "IS_ERROR",
      payload: err.response.data.message,
      pay: 500,
    });
  }
};

export const Sign_In = (recData) => async (dispatch) => {
  try {
    dispatch({ type: "DATA_FETCHING" });
    const { data } = await api.post("/api/user/login", recData);
    dispatch({ type: "SIGN_IN", payload: data });
    dispatch({ type: "SUCCESS" });
    localStorage.setItem("user", JSON.stringify(data));
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Users = () => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState().auth;
  try {
    dispatch({ type: "DATA_FETCHING" });
    const { data } = await api.get("/api/user", {
      headers: {
        Authorization: "bearer " + token,
      },
    });
    dispatch({ type: "FETCH_USERS", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Conversation = () => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState().auth;
  try {
    dispatch({ type: "DATA_FETCHING" });
    const { data } = await api.get("/api/con", {
      headers: {
        Authorization: "bearer " + token,
      },
    });
    dispatch({ type: "FETCH_CON", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Create_Conversation = (recData) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState().auth;
  try {
    dispatch({ type: "DATA_FETCHING" });
    const { data } = await api.post("/api/con/create", recData, {
      headers: {
        Authorization: "bearer " + token,
      },
    });
    dispatch({ type: "CREATE_CON", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Create_Message = (recData) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState().auth;
  try {
    dispatch({ type: "DATA_FETCHING" });
    await api.post("/api/message/create", recData, {
      headers: {
        Authorization: "bearer " + token,
      },
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Message = (id) => async (dispatch, getState) => {
  const {
    user: { token },
  } = getState().auth;
  try {
    dispatch({ type: "DATA_FETCHING" });
    const { data } = await api.get(`/api/message/${id}`, {
      headers: {
        Authorization: "bearer " + token,
      },
    });
    dispatch({ type: "FETCH_MSG", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Log_Out = () => {
  return {
    type: "LOG_OUT",
  };
};
