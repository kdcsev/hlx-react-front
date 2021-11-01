import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {
  urlUserCancelAffiliate,
  urlUserCancelMembership,
  urlUserDeletePayoutRow,
  urlUserDeleteWithdrawalRow,
  urlUserGetProfile,
  urlUserGetProfilePageDetail,
  urlUserGetWalletPageDetail,
  urlUserRemoveCardInfo,
  urlUserRequestWithdrawal,
  urlUserUpdateCardInfo,
  urlUserUpdateProfile,
} from "./CONSTANTS";

export const apiGetUserProfilePageDetail = () => {
  const url = urlUserGetProfilePageDetail;
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

export const apiGetUserProfile = () => {
  const url = urlUserGetProfile;
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

export const apiUserUpdateProfile = (params) => {
  const url = urlUserUpdateProfile;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_email", params.user_email);
  formData.append("user_first_name", params.user_first_name);
  formData.append("user_last_name", params.user_last_name);
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
};

export const apiUserUpdateCardInfo = (params) => {
  const url = urlUserUpdateCardInfo;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("owner", params.owner);
  formData.append("card_number", params.card_number);
  formData.append("cvv", params.cvv);
  formData.append("exp_month", params.exp_month);
  formData.append("exp_year", params.exp_year);
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
};
export const apiUserRemoveCardInfo = () => {
  const url = urlUserRemoveCardInfo;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
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
export const apiUserCancelMembership = () => {
  const url = urlUserCancelMembership;
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
export const apiUserCancelAffiliate = () => {
  const url = urlUserCancelAffiliate;
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
