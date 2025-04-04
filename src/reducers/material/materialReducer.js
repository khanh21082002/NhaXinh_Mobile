import {
  ADD_MATERIAL,
  FETCH_MATERIAL,
  MATERIAL_LOADING,
  MATERIAL_FAILURE,
} from "./materialActions";

const initialState = {
  materials: [],
  isLoading: false,
};

export const materialReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATERIAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_MATERIAL:
      return {
        ...state,
        materials: action.materials,
        isLoading: false,
      };
    case ADD_MATERIAL:
      return {
        ...state,
        materials: [...state.materials],
        isLoading: false,
      };
  }
  return state;
};
