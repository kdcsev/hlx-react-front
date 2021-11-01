import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import {
  urlAdminDeleteFeed,
  urlAdminGetFeedInfoPageDetail,
  urlAdminGetTicketInfoPageDetail,
  urlAdminSubmitFeed,
  urlAdminSubmitTicketMessage,
  urlUserCloseTicket,
  urlUserDeleteTicket,
  urlUserGetTicketInfoPageDetail,
  urlUserGetTicketListPageDetail,
  urlUserSubmitTicket,
  urlUserSubmitTicketMessage,
} from "./CONSTANTS";

export const apiSubmitAdminFeed = (params) => {
  const url = urlAdminSubmitFeed;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id);
  formData.append("subject", params.subject.trim());
  formData.append("message", params.message);
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

export const apiGetAdminFeedDetailPageDetail = (feedid) => {
  const url = urlAdminGetFeedInfoPageDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url, { feedid: feedid }, SYSTEM_ERROR)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const apiDeleteAdminFeed = (params) => {
  const url = urlAdminDeleteFeed;
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