import {
  AUTH_LOADING,
  LOGIN,
  LOGOUT,
  EDIT_INFO,
  UPLOAD_PROFILEPIC,
  SIGN_UP,
  AUTH_FAILURE,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  GET_PROFILE_SUCCESS,
} from './authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserMessages from '../../messages/user';

const initialState = {
  user: {},
  token: '',
  currentUser: {},
  notification: {},
  isLoading: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  //set user if token doesn't expire yet
  const userInformation = async () => {
    const getUser = await AsyncStorage.getItem('user');
    if (!getUser) {
      return initialState;
    }
    const parsedUser = await JSON.parse(getUser);
    return (initialState.user = parsedUser.data);
  };
  userInformation();

  switch (action.type) {
    case AUTH_LOADING: {
      return {
        ...state,
        isLoading: true,
        // error: false,
      };
    }
    case LOGIN:
      return {
        user: action.user,
        token: action.token,
        notification: UserMessages['user.login.success'],
        isLoading: false,
      };
    case SIGN_UP: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: {},
        notification: UserMessages['user.logout.sucesss'],
        isLoading: false,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.firstName,
          lastName: action.lastName,
          phone: action.phone,
          address: action.address,
        },
        isLoading: false,
      };
    case UPLOAD_PROFILEPIC:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.avatarUrl,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};
