import { APP_NAME, SYSTEM_ERROR } from "config/CONSTANTS";
import { axiosGet, axiosPost, axiosPostMultipart } from "./ajaxServices";
import { urlUserCloseTicket, urlUserDeleteTicket, urlUserGetTicketInfoPageDetail, urlUserGetTicketListPageDetail, urlUserSubmitTicket, urlUserSubmitTicketMessage } from "./CONSTANTS";

export const apiGetUserTicketListPageDetail = () => {
  const url = urlUserGetTicketListPageDetail;
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

export const apiSubmitUserTicket = (params, uploadFile) => {
  const url = urlUserSubmitTicket;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("title", params.title.trim()); 
  formData.append("description", params.description.trim()); 
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

export const apiSubmitUserTicketMessage = (params, uploadFile) => {
  const url = urlUserSubmitTicketMessage;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("ticket_id", params.ticket_id); 
  formData.append("description", params.description.trim()); 
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
export const apiCloseUserTicket = (ticketid) => {
  const url = urlUserCloseTicket;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", ticketid); 
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
export const apiDeleteUserTicket = (params) => {
  const url = urlUserDeleteTicket;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("id", params.id); 
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

export const apiGetUserTickeDetailPageDetail = (ticketid) => {
  const url = urlUserGetTicketInfoPageDetail;
  return new Promise((resolve, reject) => {
    axiosGet(url, {ticketid:ticketid}, SYSTEM_ERROR)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
};