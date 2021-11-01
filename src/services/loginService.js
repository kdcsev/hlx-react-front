import { empty } from "utils/GlobalFunctions";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./ajaxServices";
import { urlCheckAuthSms, urlCheckCoupon, urlCheckPasswordStrength, urlCheckSponsor, urlCheckTwoFactAuth, urlConfirmPassword, urlGuestNewTicket, urlLogin, urlLoginTwoFactAuth, urlLogout, urlRegister, urlRequestResetPassword, urlSendAuthSms } from "./CONSTANTS";

export function apiLogin(userData) {
    const url = urlLogin;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    var formData = new FormData();
    formData.append("user_name", userData.user_name);
    formData.append("user_password", userData.user_password); 
  
    return new Promise((resolve, reject) => {
      axiosPost(url, formData, config)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    });   
}

export function apiRegister(params) {
  const url = urlRegister;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_name", params.user_name);
  formData.append("user_first_name", params.user_first_name);
  formData.append("user_last_name", params.user_last_name);
  formData.append("user_email", params.user_email);
  formData.append("user_password", params.user_password);
  formData.append("user_phone", params.user_phone);
  formData.append("user_type", params.user_type);
  formData.append("billing_city", params.billing_city);
  formData.append("billing_country", params.billing_country);
  formData.append("billing_state", params.billing_state);
  formData.append("billing_street", params.billing_street);
  formData.append("billing_zip_code", params.billing_zip_code);
  formData.append("card_number", params.card_number);
  formData.append("cvv", params.cvv);
  formData.append("exp_month", params.exp_month);
  formData.append("exp_year", params.exp_year);
  formData.append("owner", params.owner);
  formData.append("ref", empty(params.ref) ? "" : params.ref);
  formData.append("coupon_applied", !empty(params.coupon_applied) ? '1' : '0');
  formData.append("coupon", params.coupon);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiSendAuthSms(params) {
  const url = urlSendAuthSms;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_phone", params.user_phone);
  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiCheckAuthSms(params, code) {
  const url = urlCheckAuthSms;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_phone", params.user_phone);
  formData.append("code", code);
  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiLoginTwoFactAuth(userData, codeStr) {
  const url = urlLoginTwoFactAuth;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_name", userData.user_name);
  formData.append("user_password", userData.user_password); 
  formData.append("code", codeStr);
  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiRequestResetPassword(userData) {
  const url = urlRequestResetPassword;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("user_email", userData.user_email);
  formData.append("user_password", userData.user_password); 

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}
export function apiConfirmPassword(get_params) {
  const url = urlConfirmPassword;
  return new Promise((resolve, reject) => {
    axiosGet(url, get_params, "")
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiLogout(token) {
  const url = urlLogout;
  const get_params = {token:token}
  return new Promise((resolve, reject) => {
    axiosGet(url, get_params, "")
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiGuestNewTicket(params) {
  const url = urlGuestNewTicket;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("email", params.email);
  formData.append("title", params.subject);
  formData.append("description", params.description);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiCheckSponsor(params) {
  const url = urlCheckSponsor;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("ref", empty(params.ref) ? "" : params.ref);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiCheckPasswordStrength(password) {
  const url = urlCheckPasswordStrength;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("password", password);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}

export function apiCheckCoupon(params) {
  const url = urlCheckCoupon;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  var formData = new FormData();
  formData.append("coupon", empty(params.coupon) ? "" : params.coupon);

  return new Promise((resolve, reject) => {
    axiosPost(url, formData, config)
    .then(function (response) {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
  });   
}