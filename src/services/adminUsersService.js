import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { curl_post } from "utils/GlobalFunctions";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlAdminDownloadUserList, urlAdminGetUsersPageDetail, urlAdminSetUserTmpPassword, urlAdminUpdateUserInfo, urlAdminUpdateUserStatus, urlUserDeletePaymentRow, urlUserGetPaymentListPageDetail } from "./CONSTANTS";

export const apiGetAdminUsersPageDetail = () => {
  const url = urlAdminGetUsersPageDetail;
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
export function apiAdminSetUserTmpPassword(params) {
  const url = urlAdminSetUserTmpPassword;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_id", params.user_id);
  formData.append("tmp_password", params.tmp_password);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
} 
export function apiAdminUpdateUserInfo(params) {
  const url = urlAdminUpdateUserInfo;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);
  formData.append("user_email", params.user_email.trim());
  formData.append("user_first_name", params.user_first_name.trim());
  formData.append("user_last_name", params.user_last_name.trim());
  formData.append("balance", params.balance);
  formData.append("user_password", params.user_password);
  
  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
} 
export function apiAdminUpdateUserStatus(params) {
  const url = urlAdminUpdateUserStatus;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_id", params.user_id);
  formData.append("status", params.status);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
} 

  