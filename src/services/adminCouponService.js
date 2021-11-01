import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import {
  urlAdminDeleteCoupon,
  urlAdminGetCouponInfo,
  urlAdminSubmitCoupon,
} from "./CONSTANTS";

export const apiSubmitAdminCoupon = (params) => {
  const url = urlAdminSubmitCoupon;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);
  formData.append("name", params.name.trim());
  formData.append("type", params.type);
  formData.append("type_desc", params.type_desc);
  return new Promise((resolve, reject) => {
    axiosPostMultipart(url, formData, config)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const apiGetAdminCounponDetail = (coupon_id) => {
  const url = urlAdminGetCouponInfo;
  return new Promise((resolve, reject) => {
    axiosGet(url, { coupon_id: coupon_id }, SYSTEM_ERROR)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const apiDeleteAdminCoupon = (params) => {
  const url = urlAdminDeleteCoupon;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);
  return new Promise((resolve, reject) => {
    axiosPostMultipart(url, formData, config)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};