import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost } from "./ajaxServices";
import {urlAdminGetTreeUpLevelUser, urlAdminTeamPageDetail, urlUserAssignTankUser, urlUserGetAcademyData, urlUserGetAcademyPageDetail, urlUserGetTankUserList, urlUserTeamPageDetail} from "./CONSTANTS";

export const apiGetAdminTeamPageDetail = (rootUserId) => {
  const url = urlAdminTeamPageDetail;
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

export const apiAdminGetTreeUpLevelUser = (user_id) => {
  const url = urlAdminGetTreeUpLevelUser;
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