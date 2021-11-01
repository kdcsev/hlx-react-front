import { axiosGet } from "./ajaxServices";
import { urlUserDashboardDetail } from "./CONSTANTS";

export const apiGetUserDashboardDetail = () => {
  const url = urlUserDashboardDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
