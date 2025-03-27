import {API_URL} from '../../utils/Config';
import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER_FAILURE = 'ORDER_FAILURE';
export const FETCH_ORDER = 'FETCH_ORDER';
export const ADD_ORDER = 'ADD_ORDER';
export const ERROR = 'ERROR';

//Fetch order
export const fetchOrder = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Order/GetOrderByUserId`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: ORDER_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your order");
      }
      const resData = await response.json();
      console.log("Order", resData);
      const orders = resData || [];
      dispatch({
        type: FETCH_ORDER,
        orders,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Add order
// export const addOrder = (
//   token,
//   orderItems,
//   name,
//   totalAmount,
//   paymentMethod,
//   fullAddress,
//   phone,
// ) => {
//   return async (dispatch, getState) => {
//     dispatch({
//       type: ORDER_LOADING,
//     });
//     const user = getState().auth.user;
//     try {
//       const response = await timeoutPromise(
//         fetch(`${API_URL}/order/post`, {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'auth-token': user.token,
//           },
//           method: 'POST',
//           body: JSON.stringify({
//             token,
//             orderInfo: {
//               userId: user.userid,
//               items: orderItems,
//               name,
//               totalAmount,
//               paymentMethod,
//               address: fullAddress,
//               phone,
//             },
//           }),
//         }),
//       );
//       if (!response.ok) {
//         dispatch({
//           type: ORDER_FAILURE,
//         });
//         throw new Error('Something went wrong!');
//       }
//       const resData = await response.json();
//       dispatch({
//         type: ADD_ORDER,
//         orderItem: resData.content,
//       });
//     } catch (err) {
//       throw error;
//     }
//   };
// };

export const CreateOrderFromCart = (
  Address,
  Note,
  method,
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Order/CreateOrderFromCart?Address=${Address}&Note=${Note}&method=${method}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: ORDER_FAILURE,
        });
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      dispatch({
        type: ADD_ORDER,
        orderItem: resData,
      });
    } catch (err) {
      throw error;
    }
  };
};
