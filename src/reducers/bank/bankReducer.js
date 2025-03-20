import {
  FETCH_BANKS,
  BANK_LOADING,
  BANK_FAILURE,
} from "./bankActions";

const initialState = {
  banks: [],
  isFirstOpen: false,
  isLoading: false,
};
export const bankReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANK_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BANK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_BANKS:
      return {
        ...state,
        banks: [...action.banks],
        isLoading: false,
      };
    default:
      return state;
  }
};
