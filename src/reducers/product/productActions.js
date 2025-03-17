import { API_URL, API_URL_NHAXINH } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_COLLECTIONS = "FETCH_COLLECTIONS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";

//getAllProduct
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Product/GetAllProducts?pageNumber=1&pageSize=1000`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the products");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: resData.items,
      });
    } catch (err) {
      throw err;
    }
  };
};


//Get all collections
export const fetchCollections = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Collections/GetAllCollections`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: PRODUCT_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the collections");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_COLLECTIONS,
        collections: resData.collections || resData,
      });
    } catch (err) {
      throw err;
    }
  };
};