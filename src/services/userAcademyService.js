import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserGetAcademyData, urlUserGetAcademyPageDetail} from "./CONSTANTS";

export const apiGetUserAcademyPageDetail = () => {
  const url = urlUserGetAcademyPageDetail;
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

export const apiGetUserAcademyData = (type) => {
  const url = urlUserGetAcademyData;
  return new Promise((resolve, reject) => {
    let get_param = {
      type:type
    }
    axiosGet(url, get_param, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};