import { UPDATE_SOCKET } from "redux/actions/socketActions";

const initialState = { socket: null, pagesWithListener: [] };

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SOCKET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
