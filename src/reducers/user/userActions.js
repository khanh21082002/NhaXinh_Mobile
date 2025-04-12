import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const USER_LOADING = 'USER_LOADING';
export const USER_FAILURE = 'USER_FAILURE';
export const FETCH_USER = 'FETCH_USER';
export const ERROR = 'ERROR';

//Fetch USER
export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const adminResponse = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/User/GetUserByRole?role=admin`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (!adminResponse.ok) {
        dispatch({
          type: USER_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your USER");
      }

      const employeeResponse = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/User/GetUserByRole?role=employee`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',  
          },
          method: 'GET',
        }),
      );
      if (!employeeResponse.ok) {
        dispatch({  
          type: USER_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your USER");
      }

      const adminData = await adminResponse.json();
      const employeeData = await employeeResponse.json();

      const resData = [...adminData, ...employeeData];
      const users = resData || [];
      dispatch({
        type: FETCH_USER,
        users: users,
      });
    } catch (err) {
      throw err;
    }
  };
};
