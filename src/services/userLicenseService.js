import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserGetLicensePageDetail, urlUserUpdateLicenseInfo} from "./CONSTANTS";

export const apiGetUserLicensePageDetail = () => {
  const url = urlUserGetLicensePageDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url, {}, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};

export const apiUserUpdateLicenseInfo = (params) => {
  const url = urlUserUpdateLicenseInfo;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id); 
  formData.append("user_id", params.user_id); 
  formData.append("license_number", params.license_number); 
  
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