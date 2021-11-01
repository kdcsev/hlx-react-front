import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import { urlAdminGetProfile, urlAdminSetUserTmpPassword, urlAdminUpdateProfile, urlUserCheckHasActiveLicense, urlUserCheckHlxPassword, urlUserGetProfileInfo } from "./CONSTANTS";

export const apiAdminGetProfileInfo = () => {
  const url = urlAdminGetProfile;
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

export const apiAdminUpdateProfile = (params) => {
  const url = urlAdminUpdateProfile;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("admin_name", params.admin_name.trim());
  formData.append("admin_email", params.admin_email.trim());
  formData.append("admin_password", params.admin_password);
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
