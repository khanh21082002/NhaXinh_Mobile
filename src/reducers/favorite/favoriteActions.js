import {API_URL, API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const FAVORITE_LOADING = 'FAVORITE_LOADING';
export const FAVORITE_FAILURE = 'FAVORITE_FAILURE';
export const FETCH_FAVORITE = 'FETCH_FAVORITE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

//Fetch Favorite
export const fetchFavorite = () => {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    dispatch({
      type: FAVORITE_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Wishlist/GetAllWishlistsByuserId`, {
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
          type: FAVORITE_FAILURE,
        });
        throw new Error("Something went wrong!, can't get favorite list");
      }
      const resData = await response.json();
      const items = resData || [];
      dispatch({
        type: FETCH_FAVORITE,
        favoriteList: items,
      });
    } catch (err) {
      throw err;
    }

    return;
  };
};
//Add Favorite
export const addFavorite = (product )=> {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    dispatch({type: FAVORITE_LOADING});

    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL_NHAXINH}/Wishlist/AddWishlist?prodcutId=${product.productId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        ),
      );

      const resData = await response.json();
      if (!response.ok) {
        dispatch({type: FAVORITE_FAILURE});
        throw new Error('Không thể thêm vào danh sách yêu thích!');
      }

      dispatch({
        type: ADD_FAVORITE,
        newItem: resData,
      });
    } catch (err) {
      dispatch({type: FAVORITE_FAILURE});
      console.error(err);
    }
  };
};

export const removeFavorite = wishlistId => {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    dispatch({ type: FAVORITE_LOADING });

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Wishlist/DeleteWishlist/${wishlistId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        })
      );

      const resData = await response.json();
      if (!response.ok || !resData.wishlistId) {
        dispatch({ type: FAVORITE_FAILURE });
        throw new Error('Something went wrong!');
      }

      // Cập nhật Redux state mà không gọi lại API
      const favoriteState = getState().fav || {};
      const updatedList = (favoriteState.favoriteList || []).filter(
        item => item.wishlistId !== resData.wishlistId
      );
      dispatch({
        type: REMOVE_FAVORITE,
        favoriteList: updatedList,
      });
    } catch (err) {
      dispatch({ type: FAVORITE_FAILURE });
      console.error(err);
    }
  };
};
