import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { get_data_value } from "utils/GlobalFunctions";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserGetLicensePageDetail, urlUserPayAffiliate, urlUserPayLicense, urlUserPayLicensePageDetail, urlUserUpdateLicenseInfo} from "./CONSTANTS";

export const apiGetUserPayLicensePageDetail = () => {
  const url = urlUserPayLicensePageDetail;
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

export const apiUserPayLicense = (params) => {
  const url = urlUserPayLicense;
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
  formData.append("card_type", params.card_type); 
  formData.append("payment_type", get_data_value(params, 'payment_type', 'newly'));
  
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

export const apiUserPayAffiliate = (params) => {
  const url = urlUserPayAffiliate;
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
  formData.append("card_type", params.card_type); 
  formData.append("payment_type", get_data_value(params, 'payment_type', 'newly'));
  
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