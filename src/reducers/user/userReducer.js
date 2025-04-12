import {
  FETCH_USER,
  USER_LOADING,
  USER_FAILURE,
} from "./userActions";

const initialState = {
  users: [],
  isLoading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_USER:
      return {
        ...state,
        users: action.users,
        isLoading: false,
      };
  }
  return state;
};
