import { API_URL_NHAXINH } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';
export const PAYMENT_LOADING = 'PAYMENT_LOADING';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
export const FETCH_PAYMENT = 'FETCH_PAYMENT';
export const ADD_PAYMENT = 'ADD_PAYMENT';
export const ERROR = 'ERROR';

// Fetch PAYMENT
export const fetchCreatePayment = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PAYMENT_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Payment/CreatePayment?IdOrder=${orderId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      );

      if (!response.ok) {
        dispatch({
          type: PAYMENT_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your PAYMENT");
      }

      const resData = await response.json();
      const paymentUrl = resData|| null; 
      return paymentUrl;  // Trả về paymentUrl

    } catch (err) {
      dispatch({
        type: PAYMENT_FAILURE,
      });
      console.error("Error fetching payment:", err);  // Log lỗi nếu có
      throw err;
    }
  };
};

