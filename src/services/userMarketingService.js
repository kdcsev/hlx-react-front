import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserGetMarketingPageDetail, urlUserGetMarketingRankDetail} from "./CONSTANTS";

export const apiGetUserMarketingPageDetail = () => {
  const url = urlUserGetMarketingPageDetail;
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

export const apiGetUserMarketingRankDetail = (user_id) => {
  const url = urlUserGetMarketingRankDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url, {user_id:user_id}, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};