import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import {
  urlAdminDeleteFeed,
  urlAdminGetFeedInfoPageDetail,
  urlAdminGetTicketInfoPageDetail,
  urlAdminSubmitAnnouncement,
  urlAdminSubmitFeed,
  urlAdminSubmitTicketMessage,
  urlUserCloseTicket,
  urlUserDeleteTicket,
  urlUserGetTicketInfoPageDetail,
  urlUserGetTicketListPageDetail,
  urlUserSubmitTicket,
  urlUserSubmitTicketMessage,
} from "./CONSTANTS";

export const apiSubmitAdminAnnouncement = (params) => {
  const url = urlAdminSubmitAnnouncement;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("download_option", params.user_kind);
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
 
 