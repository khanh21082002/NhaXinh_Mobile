import {
  FETCH_CATEGORIES,
  CATEGORIES_LOADING,
  CATEGORIES_FAILURE,
} from "./categoryActions";
import { FIRST_OPEN } from "./checkFirstTimeActions";

const initialState = {
  categories: [],
  isFirstOpen: false,
  isLoading: false,
};
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
        isLoading: false,
      };
    case FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: true,
      };
    }
    default:
      return state;
  }
};
