import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserCancelVerification, urlUserCompleteVerification, urlUserConfirmVerificationCode, urlUserDeletePayoutRow, urlUserDeleteWithdrawalRow, urlUserDisableVerification, urlUserGetVerificationPageDetail, urlUserGetWalletPageDetail, urlUserRequestWithdrawal, urlUserSendTwoFactVerificationEmail} from "./CONSTANTS";

export const apiGetUserVerificationPageDetail = () => {
  const url = urlUserGetVerificationPageDetail;
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
 
export const apiUserSendTwoFactVerificationEmail = () => {
  const url = urlUserSendTwoFactVerificationEmail;
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

export const apiUserConfirmVerificationCode = (params) => {
  const url = urlUserConfirmVerificationCode;
  return new Promise((resolve, reject) => {
    axiosGet(url, params, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};

export const apiUserCompleteVerification = (params) => {
  const url = urlUserCompleteVerification;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("secret", params.secret); 
  formData.append("otp", params.otp); 
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

export const apiUserCancelVerification = (params) => {
  const url = urlUserCancelVerification;
  return new Promise((resolve, reject) => {
    axiosGet(url, params, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};

export const apiUserDisableVerification = (params) => {
  const url = urlUserDisableVerification;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("otp", params.otp); 
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