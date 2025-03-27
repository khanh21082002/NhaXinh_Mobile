import {
  ADD_ORDER,
  FETCH_ORDER,
  ORDER_LOADING,
  ORDER_FAILURE,
} from "./orderActions";

const initialState = {
  orders: [],
  isLoading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ORDER:
      return {
        ...state,
        orders: action.orders,
        isLoading: false,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.orderItem],
        isLoading: false,
      };
  }
  return state;
};
