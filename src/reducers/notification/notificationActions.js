import {API_URL} from '../../utils/Config';
import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const NOTIFICATION_LOADING = 'NOTIFICATION_LOADING';
export const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE';
export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const ERROR = 'ERROR';


export const fetchNotification = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: NOTIFICATION_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Notification/GetNotificationByUserId`, {
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
          type: NOTIFICATION_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your NOTIFICATION");
      }
      const resData = await response.json();
      console.log("NOTIFICATION", resData);
      const notifications = resData || [];
      dispatch({
        type: FETCH_NOTIFICATION,
        notifications,
      });
    } catch (err) {
      throw err;
    }
  };
};

