export const UPDATE_SOCKET = "act-update-socket-obj";

export const updateSocket = (socketObj) => ({
  type: UPDATE_SOCKET,
  payload: {...socketObj},
});
