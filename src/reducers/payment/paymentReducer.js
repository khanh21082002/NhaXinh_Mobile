import {
    ADD_PAYMENT,
    FETCH_PAYMENT,
    PAYMENT_LOADING,
    PAYMENT_FAILURE,
  } from "./paymentAction";
  
  const initialState = {
    payment: null,  // Đổi từ payments: [] thành payment: null
    isLoading: false,
  };
  
  export const PAYMENTReducer = (state = initialState, action) => {
    switch (action.type) {
      case PAYMENT_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case PAYMENT_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
      case FETCH_PAYMENT:
        return {
          ...state,
          payment: action.payment,
          isLoading: false,
        };
      case ADD_PAYMENT:
        return {
          ...state,
          payment: action.paymentItem, 
          isLoading: false,
        };
      default:
        return state;
    }
  };
  