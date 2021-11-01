import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlUserAssignTankUser, urlUserGetAcademyData, urlUserGetAcademyPageDetail, urlUserGetTankUserList, urlUserGetTreeUpLevelUser, urlUserTeamPageDetail} from "./CONSTANTS";

export const apiGetUserTeamPageDetail = (rootUserId) => {
  const url = urlUserTeamPageDetail;
  return new Promise((resolve, reject) => {
    let params = {
      root_user_id: rootUserId
    }
    axiosGet(url, params, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};

export const apiGetUserTankList = (rootUserId) => {
  const url = urlUserGetTankUserList;
  return new Promise((resolve, reject) => {
    let params = {
      user_id: rootUserId
    }
    axiosGet(url, params, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });
};


export const apiUserAssignChildUser = (params) => {
  const url = urlUserAssignTankUser;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("parent_id", params.parent_id); 
  formData.append("position", params.position); 
  formData.append("user_id", params.user_id); 

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
export const apiUserGetTreeUpLevelUser = (user_id) => {
  const url = urlUserGetTreeUpLevelUser;
  return new Promise((resolve, reject) => {
    let params = {
      user_id: user_id
    }
    axiosGet(url, params, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });
};