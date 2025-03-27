import { API_URL_NHAXINH } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const CATEGORIES_LOADING = "CATEGORIES_LOADING";
export const CATEGORIES_FAILURE = "CATEGORIES_FAILURE";

//get all categories
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: CATEGORIES_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Categories/GetAllCategory`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: CATEGORIES_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the CATEGORIES");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_CATEGORIES,
        categories: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};

