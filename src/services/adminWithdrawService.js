import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { get_data_value } from "utils/GlobalFunctions";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlAdminChangeWithdrawStatus, urlAdminDeletePaymentHistory, urlAdminGetUsersPageDetail, urlAdminSetUserTmpPassword, urlAdminUpdateUserInfo, urlAdminUpdateUserStatus, urlUserDeletePaymentRow, urlUserGetPaymentListPageDetail } from "./CONSTANTS";
 
export function apiAdminChaneWithdrawStatus(params) {
  const url = urlAdminChangeWithdrawStatus;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);
  formData.append("status", get_data_value(params, 'status'))
  formData.append("action", get_data_value(params, 'action'))

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