
import { API_URL_BANK } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_BANKS = "FETCH_BANKS";
export const BANK_LOADING = "BANK_LOADING";
export const BANK_FAILURE = "BANK_FAILURE";

export const fetchBanks = (depth) => {
  return async (dispatch) => {
    dispatch({
      type: BANK_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_BANK}`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: BANK_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the bank");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_BANKS,
        banks: resData.data,
      });
      return resData.data;
    } catch (err) {
      throw err;
    }
  };
};
