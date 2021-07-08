import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_SUCCESS,
  LOADING,
  REMOVE_USER_DATA,
  SET_USER,
  UPDATE_USER,
} from "./types";

const loading = (state, { flag }) => ({
  ...state,
  loading: flag,
});
const getUserDataSuccess = (state, { userData }) => ({
  ...state,
  userData: [...userData],
});

const getUserDataError = (state, { error }) => ({
  ...state,
  error: [...state.error, ...error],
});

const removeUserData = (state, { id }) => {
  console.log(state.userData.filter((user) => user.id !== id));
  let temp = state.userData;
  temp.splice(id, 1);
  return {
    ...state,
    userData: temp,
  };
};
const setUser = (state, { id }) => ({
  ...state,
  selectedUser: state.userData.find((x) => x.id === id),
});

const updateUser = (state, { user }) => {
  var index = state.userData.findIndex((x) => x.id === user.id);
  var temp = state.userData[index];
  temp = { ...temp, ...user };
  return {
    ...state,
    userData: [
      ...state.userData.filter((x) => x.id !== user.id),
      (state.userData[index] = temp),
    ],
  };
};

export const reducer = {
  [FETCH_USER_DATA_SUCCESS]: getUserDataSuccess,
  [FETCH_USER_DATA_ERROR]: getUserDataError,
  [LOADING]: loading,
  [REMOVE_USER_DATA]: removeUserData,
  [SET_USER]: setUser,
  [UPDATE_USER]: updateUser,
};
