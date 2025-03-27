import {
  FETCH_PRODUCTS,
  FETCH_COLLECTIONS,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
  SEARCH_PRODUCT_SUCCESS
} from "./productActions";
import { FIRST_OPEN } from "./checkFirstTimeActions";

const initialState = {
  products: [],
  productFilter: [],
  collections: [],
  isFirstOpen: false,
  isLoading: false,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        isLoading: false,
      };
      case SEARCH_PRODUCT_SUCCESS:
        return {
          ...state,
          productFilter: [...action.productFilter],
          isLoading: false,
        };
    case FETCH_COLLECTIONS:
      return {
        ...state,
        collections: [...action.collections],
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
