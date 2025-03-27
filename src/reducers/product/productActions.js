import { API_URL, API_URL_NHAXINH } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_COLLECTIONS = "FETCH_COLLECTIONS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_FAILURE = "PRODUCT_FAILURE";
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";



//getAllProduct
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Product/GetProductToDispaly`, {
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
        products: resData,
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

//Search product
export const searchProduct = (name, categoryId, subCategoryId , materialId , collectionId ) => {
  return async (dispatch) => {
    dispatch({
      type: PRODUCT_LOADING,
    }); 
    try {
      const bodyData = JSON.stringify({
        name: name || "",
        categoryId: categoryId || "",
        subCategoryId: subCategoryId || "",
        materialId: materialId || "",
        collectionId: collectionId || ""
      });
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Product/SearchProduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyData,
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
        type: SEARCH_PRODUCT_SUCCESS,
        productFilter: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};