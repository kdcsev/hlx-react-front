import { UPDATE_USER } from "redux/actions/userActions";

const initialState = {
  
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
