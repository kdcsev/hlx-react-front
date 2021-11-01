import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import {
  urlAdminGetTicketInfoPageDetail,
  urlAdminSubmitTicketMessage,
  urlUserCloseTicket,
  urlUserDeleteTicket,
  urlUserGetTicketInfoPageDetail,
  urlUserGetTicketListPageDetail,
  urlUserSubmitTicket,
  urlUserSubmitTicketMessage,
} from "./CONSTANTS";

export const apiSubmitAdminTicketMessage = (params, uploadFile) => {
  const url = urlAdminSubmitTicketMessage;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("ticket_id", params.ticket_id);
  formData.append("description", params.description.trim());
  formData.append("to_email", params.to_email ? "1" : "0");
  formData.append("upload_file", uploadFile);
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

export const apiGetAdminTickeDetailPageDetail = (ticketid) => {
  const url = urlAdminGetTicketInfoPageDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url, { ticketid: ticketid }, SYSTEM_ERROR)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
