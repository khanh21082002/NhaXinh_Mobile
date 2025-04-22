import {
  ADD_ORDER,
  FETCH_ORDER,
  FETCH_ORDERHISTORY,
  FETCH_TOTAL_SPENT,
  ORDER_LOADING,
  ORDER_FAILURE,
} from "./orderActions";

const initialState = {
  orders: [],
  orderHistory: [],
  totalSpent: 0,
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
    case FETCH_ORDERHISTORY:
      return {
        ...state,
        orderHistory: action.orderHistory,
        isLoading: false,
      };
    case FETCH_TOTAL_SPENT:
      return {
        ...state,
        totalSpent: action.totalSpent,
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
