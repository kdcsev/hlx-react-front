import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserDeletePaymentRow, urlUserGetPaymentListPageDetail } from "./CONSTANTS";

export const apiGetUserPaymentListPageDetail = () => {
  const url = urlUserGetPaymentListPageDetail;
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

export const apiDeleteUserPaymentRow = (params) => {
  const url = urlUserDeletePaymentRow;
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
