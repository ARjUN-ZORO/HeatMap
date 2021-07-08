import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { initialState as usersState } from "./initialState";
import { reducer as usersReducer } from "./reducer";
import { debug } from "./debug";

const initialState = {
  ...usersState,
};

const reducers = {
  ...usersReducer,
};

function reducer(state, action) {
  const { type } = action;
  const newState = !reducers[type] ? state : reducers[type](state, action);
  debug(type, newState);
  return newState;
}

export const StateContext = createContext(initialState);

const asyncer = (dispatch, state) => (action) =>
  typeof action === "function" ? action(dispatch, state) : dispatch(action);

export const StoreProvider = ({ children }) => {
  const [state, dispatchBase] = useReducer(reducer, initialState);
  const dispatch = useCallback(asyncer(dispatchBase, state), []);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStore = () => useContext(StateContext);
