import {
  ADD_REVIEW,
  FETCH_REVIEW,
  FETCH_REVIEWHISTORY,
  REVIEW_LOADING,
  REVIEW_FAILURE,
  CHECK_USER_TO_REVIEW,
} from "./reviewActions";

const initialState = {
  reviews: [],
  canReview: false,
  isLoading: false,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_REVIEW:
      return {
        ...state,
        reviews: action.reviews,
        isLoading: false,
      };
    case FETCH_REVIEWHISTORY:
      return {
        ...state,
        isLoading: false,
      };
    case CHECK_USER_TO_REVIEW:
      return {
        ...state,
        canReview: action.canReview,
        isLoading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews , action.reviews],
        isLoading: false,
      };
  }
  return state;
};
