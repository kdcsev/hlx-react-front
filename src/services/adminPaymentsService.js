import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlAdminDeletePaymentHistory, urlAdminGetUsersPageDetail, urlAdminSetUserTmpPassword, urlAdminUpdateUserInfo, urlAdminUpdateUserStatus, urlUserDeletePaymentRow, urlUserGetPaymentListPageDetail } from "./CONSTANTS";
 
export function apiAdminDeletePaymentHistory(params) {
  const url = urlAdminDeletePaymentHistory;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);

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