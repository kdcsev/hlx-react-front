import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import {
  urlAdminDeleteFeed,
  urlAdminGetFeedInfoPageDetail,
  urlAdminGetTicketInfoPageDetail,
  urlAdminStatsPageDetail,
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

export const apiGetAdminStatsPageDetail = () => {
  const url = urlAdminStatsPageDetail;
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