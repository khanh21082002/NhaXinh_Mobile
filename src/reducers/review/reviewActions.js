import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const REVIEW_LOADING = 'REVIEW_LOADING';
export const REVIEW_FAILURE = 'REVIEW_FAILURE';
export const FETCH_REVIEW = 'FETCH_REVIEW';
export const ADD_REVIEW = 'ADD_REVIEW';
export const CHECK_USER_TO_REVIEW = 'CHECK_USER_TO_REVIEW';

//Fetch REVIEW
export const fetchReview = productId => {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    dispatch({
      type: REVIEW_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL_NHAXINH}/Review/GetReviewByProductId?id=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              Accept: 'application/json',
            },
            method: 'GET',
          },
        ),
      );
      if (!response.ok) {
        dispatch({
          type: REVIEW_FAILURE,
        });
        throw new Error("Something went wrong!, can't get your REVIEWs");
      }
      const resData = await response.json();
      const reviews = resData;
      dispatch({
        type: FETCH_REVIEW,
        reviews,
      });
    } catch (err) {
      throw err;
    }

    return;
  };
};

//Add Add to REVIEW
export const addToReview = (productId, comment, rating) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REVIEW_LOADING,
    });
    const jwtToken = getState().auth.token;

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Review/AddReview?productId=${productId}&comment=${comment}&rating=${rating}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }),
      );

      // Kiểm tra mã trạng thái của phản hồi
      if (!response.ok) {
        dispatch({
          type: REVIEW_FAILURE,
        });
        console.log('Response Error:', response.statusText);
        throw new Error('Something went wrong!');
      }

      // Đảm bảo là phản hồi trả về JSON hợp lệ
      const responseData = await response.json();
      dispatch({
        type: ADD_REVIEW,
        reviews: responseData,
      });
    } catch (err) {
      console.log('Error:', err); 
      throw err;
    }
  };
};

export const checkUserToReview = (productId) => {
  return async (dispatch, getState) => {
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Review/CheckUserToReview?productId=${productId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
          method: 'GET',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: REVIEW_FAILURE,
        });
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const canReview = resData;
      dispatch({
        type: CHECK_USER_TO_REVIEW,
        canReview,
      });
    } catch (err) {
      throw err;
    }
  };
};


