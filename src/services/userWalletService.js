import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserDeletePayoutRow, urlUserDeleteWithdrawalRow, urlUserGetWalletPageDetail, urlUserRequestWithdrawal} from "./CONSTANTS";

export const apiGetUserWalletPageDetail = () => {
  const url = urlUserGetWalletPageDetail;
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
 
export const apiUserRequestWithdrawal = (params) => {
  const url = urlUserRequestWithdrawal;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("payout_amount", params.payout_amount); 
  formData.append("paypal_address", params.paypal_address); 
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

export const apiDeleteUserPayoutRow = (params) => {
  const url = urlUserDeletePayoutRow;
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
};

export const apiDeleteUserWithdrawalRow = (params) => {
  const url = urlUserDeleteWithdrawalRow;
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
};

