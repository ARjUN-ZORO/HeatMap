import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_SUCCESS,
  REMOVE_USER_DATA,
  LOADING,
  SET_USER,
  UPDATE_USER,
} from "./types";
import { fetchAllData } from "../api/userAPI";

export const loading = (flag) => ({ type: LOADING, flag });

export const getUserDataSuccess = (userData) => ({
  type: FETCH_USER_DATA_SUCCESS,
  userData,
});

export const getUserDataError = (error) => ({
  type: FETCH_USER_DATA_ERROR,
  error,
});

export const getData = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const { data } = await fetchAllData();
    dispatch(getUserDataSuccess(data));
    dispatch(loading(false));
  } catch (err) {
    console.log(err);
    dispatch(getUserDataError(err));
  }
};

export const removeUserData = (id) => ({ type: REMOVE_USER_DATA, id });

export const setUser = (id) => ({ type: SET_USER, id });

export const updateUser = (user) => ({ type: UPDATE_USER, user });
