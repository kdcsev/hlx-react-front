import axios from "axios";
import { BASE_FRONT_URL, SYSTEM_ERROR } from "config/CONSTANTS";
import { ROUTE_LOGIN } from "navigation/CONSTANTS";

export function postRequest(url, param, callback) {
  return axios
    .post(url, param)
    .then(function (response) {
      const { data } = response;
      if (data.status === "1") {
        callback(null);
      } else {
        callback(response.data);
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
      return null;
    });
}
export function putRequest(url, param, callback) {
  return axios
    .put(url, param)
    .then(function (response) {
      const { data } = response;
      if (data.status === "1") {
        callback(null);
      } else {
        callback(response.data);
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
      return null;
    });
}
export function getRequest(url, callback) {
  axios
    .get(url)
    .then(function (response) {
      const { data } = response;
      if (data.status === "1") {
        callback(null);
      } else {
        callback(response.data);
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
}

export function deleteRequest(url, callback) {
  axios
    .delete(url)
    .then(function (response) {
      const { data } = response;
      if (data.status === "1") {
        callback(null);
      } else {
        callback(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
}
export function deleteRequestWithParam(url, param, callback) {
  axios
    .delete(url, { data: param })
    .then(function (response) {
      const { data } = response;
      if (data.status === "1") {
        callback(null);
      } else {
        callback(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
}

///////////////////////////////////////////////////////////////////////////////////

export const axiosPost = (url, param, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, param)
        .then((res) => {
          const { data } = res;
          // if (data.status === '1') {
          //   resolve(data.data);
          // } else {
          //   reject(data.message);
          // }
          if (data.data.login_required === "1") {
            window.location.href = BASE_FRONT_URL + "/" + ROUTE_LOGIN;
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(errorMessage, err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};
export const axiosPostMultipart = (url, param, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const { data } = res;
          // if (data.status === '1') {
          //   resolve(data.data);
          // } else {
          //   reject(data.message);
          // }
          if (data.data.login_required === "1") {
            window.location.href = BASE_FRONT_URL + "/" + ROUTE_LOGIN;
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(errorMessage, err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};
export const axiosPut = (url, param, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(url, param)
        .then((res) => {
          const { data } = res;
          // if (data.status === '1') {
          //   resolve(data.data);
          // } else {
          //   reject(data.message);
          // }
          if (data.data.login_required === "1") {
            window.location.href = BASE_FRONT_URL + "/" + ROUTE_LOGIN;
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(errorMessage, err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};
export const axiosGet = (url, param, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url, { params: param })
        .then((res) => {
          const { data } = res;
          // if (data.status === '1') {
          //   resolve(data.data);
          // } else {
          //   reject(data.message);
          // }
          if (data.data.login_required === "1") {
            let redirect_url = BASE_FRONT_URL + ROUTE_LOGIN;
            window.location.href = redirect_url;
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          console.log("errorMessage, error", errorMessage, err);
          reject(errorMessage, err);
        });
    } catch (error) {
      console.log("errorMessage, error", errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};
export const axiosDelete = (url, param, errorMessage = "") => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(url, { data: param })
        .then((res) => {
          const { data } = res;
          // if (data.status === '1') {
          //   resolve(data.data);
          // } else {
          //   reject(data.message);
          // }
          if (data.data.login_required === "1") {
            window.location.href = BASE_FRONT_URL + "/" + ROUTE_LOGIN;
          } else {
            resolve(data);
          }
        })
        .catch((err) => {
          reject(errorMessage, err);
        });
    } catch (error) {
      console.error(errorMessage, error);
      reject(SYSTEM_ERROR);
    }
  });
};
