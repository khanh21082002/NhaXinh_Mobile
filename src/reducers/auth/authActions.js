import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
// import { API_URL } from '../../utils/Config';
import { API_URL_NHAXINH } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const EDIT_INFO = 'EDIT_INFO ';
export const UPLOAD_PROFILEPIC = 'UPLOAD_PROFILEPIC';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_ERROR = 'RESET_ERROR';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';


import AskingExpoToken from '../../components/Notification/AskingNotiPermission';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

export const SignUp = (firstname,lastname, email, password ,rePassword) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Login/RegisterForCustomer`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            firstName:firstname,
            lastName:lastname,
            email,
            password,
            rePassword
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData);
      }
      const resData = await response.json();
      console.log("Kết quả từ API:", resData);     
        dispatch({ type: SIGN_UP });
    } catch (err) {
      throw err;
    }
  };
};

//SentOTP
export const SentOTP = (email , Otp) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Login/VerifyOTPForCustomer`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            userOtp: Otp,
          }),
        }),
      );
      console.log('response', response);
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const pushToken = await AskingExpoToken();
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Login/Login`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            pushTokens: [pushToken],
          }),
        }),
      );

      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData);
      }
      const resData = await response.json();
      console.log('resData', resData);
      let decodedToken;
      try {
        decodedToken = jwtDecode(resData);
        console.log('Thông tin từ token:', decodedToken);
      } catch (decodeError) {
        console.error('Lỗi giải mã token:', decodeError.message);
        throw new Error('Lỗi token không hợp lệ');
      }
      //Get User
      const jwtToken = resData;
      const userResponse = await fetch(`${API_URL_NHAXINH}/Profile/GetCurrentUserProfile`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Không thể lấy thông tin người dùng! Lỗi: ${errorText}`);
      }

      const userData = await userResponse.json();
      console.log('Dữ liệu người dùng:', userData);

      saveDataToStorage('users', userData);
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: userData,
        token: jwtToken,
      });
    } catch (err) {
      throw err;
    }
  };
};

//EditInfo
export const EditInfo = (firstName, lastName, phone, address) => {
  return async (dispatch, getState) => {
    // const user = getState().auth.user;
    const jwtToken = getState().auth.token;
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const formData = new FormData();
      formData.append('FirstName', firstName);
      formData.append('LastName', lastName);
      formData.append('Phone', phone);
      formData.append('Address', address);

      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Profile/UpdateProfile`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',

          },
          method: 'POST',
          body: formData,
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        Error(errorResData.err);
      }

      dispatch({
        type: EDIT_INFO,
        firstName,
        lastName,
        phone,
        address,
      });
    } catch (err) {
      console.error('Error saving data:', err);
      throw err;
    }
  };
};


//UploadProfilePic
export const UploadProfilePic = (imageUri, filename, type) => {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTH_LOADING,
    });
    // const user = getState().auth.user;
    const jwtToken = getState().auth.token;
    const formData = new FormData();
    // Infer the type of the image
    formData.append('image', {
      uri: imageUri,
      name: filename,
      type: type,
    });
    try {
      console.log('FormData gửi đi:', formData);
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Profile/UpdateProfileImage`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
          method: 'POST',
          body: formData,
        }),
      );

      console.log('Response:', response);
      if (!response.ok) {
        const errorResData = await response.json();
        console.error("Error:", errorResData);
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }

      dispatch({
        type: UPLOAD_PROFILEPIC,
        avatarUrl: imageUri
      });
    } catch (err) {
      throw err;
    }
  };
};

//ForgetPassword
export const ForgetPassword = (Email) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Login/ResetPassword?email=${Email}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorMessage);
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: FORGET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//ChangePassword
export const ChangePassword = (oldpassword, newpassword) => {
  return async (dispatch , getState) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const jwtToken = getState().auth.token;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Profile/UpdateProfilePassword?oldPass=${oldpassword}&newPass=${newpassword}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
          }),
        }),
      );
      const responseJson = await response.json();
      if (!response.ok) {
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(responseJson);
      }
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer(); //clear setTimeout when logout
    AsyncStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert('Logout section expired');
    }, expirationTime);
  };
};
