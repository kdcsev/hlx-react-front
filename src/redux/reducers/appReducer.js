import { ROUTE_USER_DASHBOARD } from "navigation/CONSTANTS";
import { MENU_COLLAPSED_CHANGED, SIZE_CHANGED, CURRENT_ROUTE, CURRENT_TITLE, UPDATE_APP_DATA } from "redux/actions/appActions";

const initialState = {
  width: 1024,
  height: 768,
  user_menu_collapsed: false,
  m_user_menu_collapsed: true,
  current_route: ROUTE_USER_DASHBOARD
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APP_DATA:
      return {
        ...state,
        ...action.payload
      }
    case SIZE_CHANGED:
      return {
        ...state,
        ...action.payload
      }
    case MENU_COLLAPSED_CHANGED:
      return {
        ...state,
        ...action.payload
      }
    case CURRENT_ROUTE:
      return {
        ...state,
        ...action.payload
      }
    case CURRENT_TITLE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
