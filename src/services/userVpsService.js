import { axiosGet, axiosPost } from "./ajaxServices";
import { urlUserCheckHasActiveLicense, urlUserCheckHlxPassword, urlUserGetVpsConsoleUrl, urlUserGetVpsPassword } from "./CONSTANTS";

 export const apiUserGetVpsPassword = (userData) => {
  const url = urlUserGetVpsPassword;
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

export const apiUserGetVpsConsoleUrl = () => {
  const url = urlUserGetVpsConsoleUrl;
  return new Promise((resolve, reject) => {
    axiosGet(url, {}, "")
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};
