import {API_URL} from '../../utils/Config';
import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const CART_LOADING = 'CART_LOADING';
export const CART_FAILURE = 'CART_FAILURE';
export const FETCH_CART = 'FETCH_CART';
export const ADD_CART = 'ADD_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const RESET_CART = 'RESET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DES_CART_QUANTITY = 'DES_CART_QUANTITY';

//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    const emptyCart = {
      items: [],
    };
    dispatch({
      type: CART_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Cart/GetCartByUserId`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
          method: 'GET',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!, can't get your carts");
      }
      const resData = await response.json();
      const carts = {items: resData || emptyCart};
      dispatch({
        type: FETCH_CART,
        carts,
      });
    } catch (err) {
      throw err;
    }

    return;
  };
};

//Add Add to Cart
export const addToCart = (ProductId, VariationId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL_NHAXINH}/Cart/AddToCart?ProductId=${ProductId}&VariationId=${VariationId}&Quantity=1`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              Accept: 'application/json',
            },
            method: 'POST',
          },
        ),
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error('Something went wrong!');
      }
      dispatch({
        type: 'ADD_CART',
      });
    } catch (err) {
      throw err;
    }
  };
};

//Update Cart
export const updateCart = (cartId, quantity) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL_NHAXINH}/Cart/UpdateCart?CartId=${cartId}&Quantity=${quantity}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              Accept: 'application/json',
            },
            method: 'PUT',
          },
        ),
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error('Something went wrong!');
      }
      dispatch({
        type: 'UPDATE_CART',
        cartId,
        quantity,
      });
    } catch (err) {
      dispatch({type: 'CART_FAILURE'});
      throw err;
    }
  };
};

//Remove from Cart
export const removeFromCart = (cartId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Cart/DeleteCartItem/${cartId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        }),
      );
      console.log(response);
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error('Something went wrong!');
      }
      dispatch({
        type: 'REMOVE_FROM_CART',
        cartId,
      });
    } catch (err) {
      throw err;
    }
  };
};

// //Decrease cart quantity
// export const decCartQuantity = (cartId, itemId) => {
//   return async (dispatch, getState) => {
//     dispatch({
//       type: CART_LOADING,
//     });
//     const user = getState().auth.user;
//     try {
//       const response = await timeoutPromise(
//         fetch(`${API_URL}/carts/${cartId}`, {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'auth-token': user.token,
//           },
//           method: 'PUT',
//           body: JSON.stringify({
//             item: itemId,
//             quantity: 'decrease',
//           }),
//         }),
//       );
//       if (!response.ok) {
//         dispatch({
//           type: CART_FAILURE,
//         });
//         throw new Error('Something went wrong!');
//       }
//       dispatch({
//         type: 'DES_CART_QUANTITY',
//         cartItemId: itemId,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

//Reset Cart
export const resetCart = cartId => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/cart/${cartId}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'DELETE',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error('Something went wrong!');
      }

      dispatch({
        type: 'RESET_CART',
      });
    } catch (err) {
      throw err;
    }
  };
};
