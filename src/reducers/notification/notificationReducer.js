import {
  ADD_NOTIFICATION,
  FETCH_NOTIFICATION,
  NOTIFICATION_LOADING,
  NOTIFICATION_FAILURE,
} from "./notificationActions";

const initialState = {
  notifications: [],
  isLoading: false,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications,
        isLoading: false,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications],
        isLoading: false,
      };
  }
  return state;
};
