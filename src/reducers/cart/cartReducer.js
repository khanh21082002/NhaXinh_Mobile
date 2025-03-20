import {Cart} from '../../models/Cart';
import {
  ADD_CART,
  UPDATE_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  DES_CART_QUANTITY,
  RESET_CART,
  CART_LOADING,
  CART_FAILURE,
} from './cartActions';
import {LOGOUT} from '../auth/authActions';

const emptyCart = {
  items: [],
};
const initialState = {
  cartItems: emptyCart,
  isLoading: false,
};

const findIndex = (cartList, id) => {
  const index = cartList.findIndex(cart => {
    return cart.item._id === id;
  });
  return index;
};
export const cartReducer = (state = initialState, action) => {
  const cartList = state.cartItems.items;
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CART:
      return {
        ...state,
        cartItems: action.carts,
        isLoading: false,
      };
    case UPDATE_CART:
      // console.log('Before update:', state.cartItems.items);
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          items: state.cartItems.items.map(item =>
            item.cartId === action.cartId
              ? {...item, quantity: action.quantity}
              : item,
          ),
        },
        isLoading: false,
      };
    case ADD_CART:
      // const id = action.cartItem._id;
      // if (cartList.length !== 0) {
      //   const index = findIndex(cartList, id);
      //   if (index >= 0) {
      //     cartList[index] = new Cart(
      //       action.cartItem,
      //       +cartList[index].quantity + 1
      //     );
      //   } else {
      //     const newItem = new Cart(action.cartItem, 1);
      //     cartList.push(newItem);
      //   }
      // } else {
      //   const newItem = new Cart(action.cartItem, 1);
      //   cartList.push(newItem);
      // }

      return {
        ...state,
        // cartItems: { ...state.cartItems },
        isLoading: false,
      };
      case "REMOVE_FROM_CART":
        const { cartId } = action; 
        const updatedCartItems = state.cartItems.items.filter(
          (item) => item.cartId !== cartId
        );
      
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            items: updatedCartItems, 
          },
          isLoading: false,
        };
    case DES_CART_QUANTITY:
      const {cartItemId} = action;
      const index = findIndex(cartList, cartItemId);
      cartList[index].quantity = +cartList[index].quantity - 1;
      return {
        ...state,
        cartItems: {...state.cartItems},
        isLoading: false,
      };
    case RESET_CART:
      state.cartItems.items = [];
      return {
        ...state,
        cartItems: {...state.cartItems},
        isLoading: false,
      };
    case LOGOUT: {
      return {
        cartItems: emptyCart,
        isLoading: false,
      };
    }
  }
  return state;
};
