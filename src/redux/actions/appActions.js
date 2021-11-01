// You can use CONSTANTS.js file for below definitions of constants and import here.
export const SIZE_CHANGED = "SIZE_CHANGED";
export const MENU_COLLAPSED_CHANGED = "MENU_COLLAPSED_CHANGED";
export const CURRENT_ROUTE = "CURRENT_ROOT";
export const CURRENT_TITLE = "CURRENT_TITLE";
export const UPDATE_APP_DATA = "UPDATE_APP_DATA";

export const UpdateAppData = (payload) => ({
  type: UPDATE_APP_DATA,
  payload
})

export const ChangeSize = (payload) => ({
  type: SIZE_CHANGED,
  payload
})

export const ChangeMenuCollapsed = (payload) => ({
  type: MENU_COLLAPSED_CHANGED,
  payload
})

export const UpdateCurrentRoot = (payload) => ({
  type: CURRENT_ROUTE,
  payload
})



