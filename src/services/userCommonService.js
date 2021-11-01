import { axiosGet, axiosPost } from "./ajaxServices";
import { urlUserCheckHasActiveLicense, urlUserCheckHlxPassword, urlUserGetProfileInfo } from "./CONSTANTS";

export const apiUserGetProfileInfo = () => {
  const url = urlUserGetProfileInfo;
  return new Promise((resolve, reject) => {
    axiosGet(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const apiUserCheckHasActiveLicense = () => {
  const url = urlUserCheckHasActiveLicense;
  return new Promise((resolve, reject) => {
    axiosGet(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const apiUserCheckHlxPassword = (userData) => {
  const url = urlUserCheckHlxPassword;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_password", userData.user_password); 

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};
