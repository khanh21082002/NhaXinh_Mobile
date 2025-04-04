import {API_URL} from '../../utils/Config';
import {API_URL_NHAXINH} from '../../utils/Config';
import {timeoutPromise} from '../../utils/Tools';
export const MATERIAL_LOADING = 'MATERIAL_LOADING';
export const MATERIAL_FAILURE = 'MATERIAL_FAILURE';
export const FETCH_MATERIAL = 'FETCH_MATERIAL';
export const ADD_MATERIAL = 'ADD_MATERIAL';
export const ERROR = 'ERROR';


export const fetchMaterial = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: MATERIAL_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_NHAXINH}/Material/GetAllMaterials`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (!response.ok) {
        dispatch({
          type: MATERIAL_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your MATERIAL");
      }
      const resData = await response.json();
      const materials = resData || [];
      dispatch({
        type: FETCH_MATERIAL,
        materials,
      });
    } catch (err) {
      throw err;
    }
  };
};

