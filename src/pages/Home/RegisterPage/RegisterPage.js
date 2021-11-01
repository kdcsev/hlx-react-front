import HomeLayout from "layouts/HomeLayout/HomeLayout";
import {
  ROUTE_COMPLIANCE,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_TERMS_CONDITIONS,
  ROUTE_TRIAL_POLICY,
  ROUTE_USER_DASHBOARD,
  ROUTE_WELCOME,
} from "navigation/CONSTANTS";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import { Link, withRouter } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  empty,
  get_data_value,
  isEmpty,
  is_empty,
  showToast,
  show_loading,
  to_array,
  trim_phone,
  ValidateEmail,
  jQuery,
} from "utils/GlobalFunctions";
import {
  apiCheckAuthSms,
  apiCheckCoupon,
  apiCheckPasswordStrength,
  apiCheckSponsor,
  apiLogin,
  apiLogout,
  apiRegister,
  apiSendAuthSms,
} from "services/loginService";
import { updateUser } from "redux/actions/userActions";
import { countryList } from "utils/countryList";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import { SMS_FUNC } from "config/CONSTANTS";
import AuthSmsCodeModal from "components/AuthSmsCodeModal/AuthSmsCodeModal";

const RegisterPage = (props) => {
  const query_params = new URLSearchParams(props.location.search);

  const ref_id = query_params.get("ref");
  console.log("---------ref_id--------", ref_id);
  const default_sponsor_name = empty(ref_id) ? "Admin" : ref_id;
  const [defaultSponsorName, setDefaultSponsorName] =
    useState(default_sponsor_name);
  const [sponsorName, setSponsorName] = useState(default_sponsor_name);

  const dispatch = useDispatch();
  const [showConfirmModal, setShowconfirmModal] = useState(false);
  const initPage = () => {
    let page_title = "Register";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_REGISTER,
        license_cancelled_message: "",
      })
    );
    //document.title = page_title;
  };

  useEffect(() => {
    initPage();
    doLogout();
  }, []);
  const showTwoStepCodeModal = () => {
    setShowconfirmModal(true);
  };

  //////////////////////////////////////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  let curYear = new Date().getFullYear();
  const initUserData = {
    user_name: "",
    user_first_name: "",
    user_last_name: "",
    user_phone: "",
    user_email: "",
    user_confirm_email: "",
    user_password: "",
    user_password1: "",
    user_type: "0",
    billing_street: "",
    billing_city: "",
    billing_state: "",
    billing_zip_code: "",
    billing_country: "US",
    owner: "",
    card_number: "",
    cvv: "",
    exp_month: "01",
    exp_year: curYear - 2000,
    card_type: "",
    card_is_valid: false,
    agree_terms_condition: false,
    watched_compliance: false,
    trial_policy: false,
  };
  const [userData, setUserData] = useState(initUserData);
  const [errorField, setErrorField] = useState([]);
  //const [isBusy, setIsBusy] = useState(false);

  const validateFields = () => {
    console.log("userData", userData);
    var errorList = [];
    errorList = isEmpty(userData, "user_name", errorList);
    errorList = isEmpty(userData, "user_first_name", errorList);
    errorList = isEmpty(userData, "user_last_name", errorList);
    errorList = isEmpty(userData, "user_phone", errorList);
    errorList = isEmpty(userData, "user_email", errorList);
    errorList = isEmpty(userData, "user_confirm_email", errorList);
    errorList = isEmpty(userData, "user_password", errorList);
    errorList = isEmpty(userData, "user_password1", errorList);
    errorList = isEmpty(userData, "user_type", errorList);
    errorList = isEmpty(userData, "billing_street", errorList);
    errorList = isEmpty(userData, "billing_city", errorList);
    errorList = isEmpty(userData, "billing_state", errorList);
    errorList = isEmpty(userData, "billing_zip_code", errorList);
    errorList = isEmpty(userData, "billing_country", errorList);
    errorList = isEmpty(userData, "owner", errorList);
    errorList = isEmpty(userData, "card_number", errorList);
    errorList = isEmpty(userData, "cvv", errorList);
    errorList = isEmpty(userData, "exp_month", errorList);
    errorList = isEmpty(userData, "exp_year", errorList);
    errorList = isEmpty(userData, "card_is_valid", errorList);
    errorList = isEmpty(userData, "agree_terms_condition", errorList);
    errorList = isEmpty(userData, "watched_compliance", errorList);
    errorList = isEmpty(userData, "trial_policy", errorList);

    setErrorField([...errorList]);
    console.log("errorList", errorList);
    console.log("ErrorField", errorField);
    console.log("userData", userData);
    return errorList.length > 0 || errorField.length > 0 ? false : true;
  };
  const onChangeFormField = (e) => {
    console.log("-----------e--------", e);
    let field_name = e.target.name;
    let field_value = e.target.value;
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    userData[field_name] = field_value;
    setUserData({ ...userData });
    if (field_name === "user_password") {
      checkPasswordStrength(field_value);
    }
  };
  const onChangeFormCheckboxField = (e) => {
    console.log("-----------e--------", e);
    let field_name = e.target.name;
    let checked = e.target.checked;
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    userData[field_name] = checked;
    setUserData({ ...userData });
  };
  const onChangePhoneField = (value, country, e, formattedValue) => {
    console.log("phone changed", value, country, e, formattedValue);
    let phone_number = trim_phone(formattedValue);
    console.log("phone_number", phone_number);
    if (errorField.includes("user_phone")) {
      let errors = errorField.filter((x) => x !== "user_phone");
      setErrorField([...errors]);
    }
    userData["user_phone"] = phone_number;
    setUserData({ ...userData });
  };
  const onChangeUserType = (e, user_type) => {
    userData["user_type"] = user_type;
    setUserData({ ...userData });
  };
  const submitModalData = (codeData) => {
    console.log("codeData", codeData);
    let codeStr = to_array(codeData).join("");
    console.log("codeStr", codeStr);
    show_loading(true);
    apiCheckAuthSms(userData, codeStr)
      .then((data) => {
        console.log("data", data);
        show_loading(false);
        if (data.status === "1") {
          doRegister();
        } else {
          showToast(data.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };
  const onClickRegister = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      if (sponsorChecking) {
        showToast(
          "Please wait until sponsor checking has been finished",
          "error"
        );
        return false;
      }
      if (sponsorModified) {
        showToast(
          "Please finish editing the sponsor name by clicking the check button",
          "error"
        );
        return false;
      }
      if (userData["user_email"] !== userData["user_confirm_email"]) {
        showToast("Invalid or not matching email address", "error");
        return false;
      }
      if (!ValidateEmail(userData["user_confirm_email"])) {
        showToast("Invalid or not matching email address", "error");
        return false;
      }
      if (userData["user_password"] !== userData["user_password1"]) {
        showToast("Password must match!", "error");
        return false;
      }
      if (!userData["agree_terms_condition"]) {
        showToast("Please agree to the terms and conditions", "error");
        return false;
      }
      if (!userData["watched_compliance"]) {
        showToast("Please watch the compliance first", "error");
        return false;
      }
      if (!userData["trial_policy"]) {
        showToast("Please agree to the 7-Day trial policy", "error");
        return false;
      }
      if (SMS_FUNC === "disabled") {
        //if test mode then register directly
        doRegister();
      } else {
        //if live mode then first verify phone number
        show_loading(true);
        apiSendAuthSms(userData)
          .then((data) => {
            console.log("=========data===========", data);
            show_loading(false);
            if (data.status === "1") {
              showToast(data.message, "success");
              showTwoStepCodeModal();
            } else {
              showToast(data.message, "error");
            }
          })
          .catch((err) => {
            console.log("=========err===========", err);
            show_loading(false);
            showToast(err, "error");
          });
      }
    } else {
      window.scrollTo(0, 0); //
    }
  };
  const doRegister = () => {
    show_loading(true);
    apiRegister({ ...userData, ref: defaultSponsorName, coupon_applied: couponApplied, coupon: couponName })
      .then((data) => {
        console.log("=========data===========", data);
        if (data.status === "1") {
          //showToast("You are in", "success");
          dispatch(updateUser(data.data));
          setTimeout(() => {
            show_loading(false);
            props.history.replace({ pathname: ROUTE_WELCOME });
          }, 500);
        } else {
          show_loading(false);
          showToast(data.message, "error");
        }
      })
      .catch((err) => {
        console.log("=========err===========", err);
        show_loading(false);
        showToast(err, "error");
      });
  };

  const doLogout = () => {
    if (empty(userDataStore["token"])) {
      return false;
    }

    apiLogout(userDataStore["token"])
      .then((api_res) => {
        console.log("api_res", api_res);
      })
      .catch((err) => {});
    dispatch(updateUser({ token: "" }));
  };

  const [sponsorEdiable, setSponsorEdiable] = useState(false);
  const [sponsorModified, setSponsorModified] = useState(false);
  const [sponsorChecking, setSponsorChecking] = useState(false);
  const onClickEditSponsor = () => {
    setSponsorEdiable(true);
    setTimeout(function () {
      jQuery("#sponsor-name").focus();
    }, 100);
  };
  const onChangeSponsorName = (e) => {
    let field_value = e.target.value;
    setSponsorName(field_value);
    if (field_value === defaultSponsorName) {
      setSponsorModified(false);
    } else {
      setSponsorModified(true);
    }
  };
  const onClickCheckSponsor = () => {
    if (sponsorChecking || !sponsorModified) {
      return false;
    }
    setSponsorChecking(true);
    setTimeout(function () {
      doCheckSponsor();
    }, 500);
  };
  const doCheckSponsor = () => {
    apiCheckSponsor({ ref: sponsorName })
      .then((data) => {
        setSponsorChecking(false);
        console.log("=========data===========", data);
        if (data.status === "1") {
          setSponsorModified(false);
          setDefaultSponsorName(data.data);
          setSponsorName(data.data);
          setSponsorEdiable(false);
          showToast(data.message, "success");
        } else {
          setSponsorModified(false);
          setSponsorName(defaultSponsorName);
          setSponsorEdiable(false);
          showToast(data.message, "error");
        }
      })
      .catch((err) => {
        console.log("=========err===========", err);
        setSponsorChecking(false);
        showToast(err, "error");
      });
  };

  const [passwdStrengthGood, setPasswdStrengthGood] = useState(true);
  const [passwdStrengthErrMessage, setPasswdStrengthErrMessage] = useState("");

  const checkPasswordStrength = (password) => {
    if (password === "") {
      return false;
    }
    apiCheckPasswordStrength(password)
      .then((data) => {
        setSponsorChecking(false);
        console.log("=========data===========", data);
        if (data.status === "1") {
          setPasswdStrengthGood(true);
        } else {
          setPasswdStrengthGood(false);
          setPasswdStrengthErrMessage(data.message);
        }
      })
      .catch((err) => {
        console.log("=========err===========", err);
        setSponsorChecking(false);
        showToast(err, "error");
      });
  };

  const [couponName, setCouponName] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponAppliedTxt, setCouponAppliedTxt] = useState("");
  const [couponChecking, setCouponChecking] = useState(false);
  const onChangeCouponName = (e) => {
    let field_value = e.target.value;
    setCouponName(field_value);
  };
  const onClickCheckCoupon = () => {
    if (couponChecking) {
      return false;
    }
    if(couponName === ""){
      setTimeout(function () {
        jQuery("#coupon-name").focus();
      }, 100);
      return false;
    }
    setCouponChecking(true);
    setTimeout(function () {
      doCheckCoupon();
    }, 500);
  };
  const doCheckCoupon = () => {
    apiCheckCoupon({ coupon: couponName })
      .then((data) => {
        setCouponChecking(false);
        console.log("=========data===========", data);
        if (data.status === "1") {
          setCouponApplied(true);
          setCouponAppliedTxt(data.message)
          showToast(data.message, "success");
        } else {
          setCouponApplied(false);
          showToast(data.message, "error");
        }
      })
      .catch((err) => {
        console.log("=========err===========", err);
        setCouponChecking(false);
        showToast(err, "error");
      });
  };

  return (
    <div>
      <HomeLayout>
        <div className="main-content">
          <div
            className="section page-section container has-header content-sm"
            id="page-section1"
          >
            <div className="container">
              <div className="form-container margin-auto">
                <div className="reg-form">
                  <div className="logo-wrapper hidden">
                    <img
                      src="/assets/home/images/higherlevelfx_logo_tm.png"
                      className="img-responsive img-logo"
                      alt=""
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="user-info-block">
                        <h3 className="box-title text-normal-spacing mt-0 mb-20">
                          Registration:
                        </h3>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Your Sponsor:</label>
                              <div className="sponsor-check-block">
                                <div className="sponsor-edit-block">
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="sponsor-name"
                                      value={sponsorName}
                                      disabled={
                                        !sponsorEdiable || sponsorChecking
                                      }
                                      onChange={(e) => {
                                        onChangeSponsorName(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="sponsor-btn-block">
                                  <button
                                    className={`btn btn-spiner btn-check-sponsor ${
                                      sponsorModified
                                        ? `btn-outline-success`
                                        : `btn-outline-gray`
                                    } ${sponsorChecking ? `loading` : ``}`}
                                    onClick={(e) => {
                                      onClickCheckSponsor();
                                    }}
                                  >
                                    <span>Check</span>
                                    <i className="fa fa-refresh fa-spin"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="block margin-top-5">
                                <span className="text-black">
                                  Not the right Sponsor?
                                </span>{" "}
                                <span
                                  className="cursor-pointer text-orange"
                                  onClick={(e) => {
                                    onClickEditSponsor();
                                  }}
                                >
                                  Edit <i className="ti-pencil-alt"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Username:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_name")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_name"
                                name="user_name"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Mobile Number:</label>
                              <div className="phone-number-box">
                                <PhoneInput
                                  country={"us"}
                                  value={get_data_value(userData, "user_phone")}
                                  placeholder=""
                                  onChange={(
                                    value,
                                    country,
                                    e,
                                    formattedValue
                                  ) => {
                                    onChangePhoneField(
                                      value,
                                      country,
                                      e,
                                      formattedValue
                                    );
                                  }}
                                  inputProps={{
                                    type: "tel",
                                    className: "form-control phone_number",
                                    id: "phone",
                                    name: "user_phone",
                                    placeholder: "",
                                  }}
                                />

                                <input type="hidden" name="phone_number" />
                                <input type="hidden" name="dial_code" />
                                <button
                                  className="a-btn btn-remove-tel"
                                  onClick={(e) => {
                                    onChangePhoneField("", "us", e, "");
                                  }}
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                              <div className="block margin-top-5">
                                <span className="text-green">
                                  You will receive a verification code by text!
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>First Name:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_first_name")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_first_name"
                                name="user_first_name"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Last Name:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_last_name")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_last_name"
                                name="user_last_name"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Email:</label>
                              <input
                                type="email"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_email")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_email"
                                name="user_email"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Confirm Email:</label>
                              <input
                                type="email"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_confirm_email")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_confirm_email"
                                name="user_confirm_email"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Password:</label>
                              <input
                                type="password"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_password")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_password"
                                name="user_password"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Confirm Password:</label>
                              <input
                                type="password"
                                className={
                                  "form-control" +
                                  (errorField.includes("user_password1")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="user_password1"
                                name="user_password1"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className={`row ${
                            passwdStrengthGood ? `hidden` : ``
                          }`}
                        >
                          <div className="col-md-12">
                            <div
                              className="block"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-10px",
                                marginBottom: "15px",
                              }}
                            >
                              <img
                                src="/assets/home/images/warning.svg"
                                alt="warning"
                                style={{ width: "2rem", marginRight: "0.6rem" }}
                              />
                              <span className="text-danger">
                                {passwdStrengthErrMessage}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="user-type-block" style={{minHeight: '444px'}}>
                        <h3 className="box-title text-normal-spacing mt-0 mb-0">
                          Choose your membership:
                        </h3>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="plan-item-box">
                              <label htmlFor="plan_type_0" className="margin-0">
                                <img
                                  src="/assets/home/images/20210314/gold-membership.jpg"
                                  className="plan-thumb-img"
                                  alt=""
                                />
                              </label>
                              <div className="text-center margin-bottom-20">
                                <input
                                  type="radio"
                                  name="plan_type"
                                  className="custom-radio plan_type"
                                  id="plan_type_0"
                                  value="0"
                                  onChange={(e) => {
                                    onChangeUserType(e, "0");
                                  }}
                                  checked={
                                    get_data_value(
                                      userData,
                                      "user_type",
                                      "0"
                                    ) === "0"
                                  }
                                />
                                <label htmlFor="plan_type_0"></label>
                              </div>
                              <div className="text-center">
                                <label
                                  className="radio-desc-wrapper"
                                  htmlFor="plan_type_0"
                                >
                                  <p className="radio-desc-str">
                                    $1 for 7 days, then
                                    <br />
                                    $159.00 / month{" "}
                                    <span className="text-green">if not</span>
                                    <br />
                                    <span className="text-green">
                                      cancelled!
                                    </span>
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="plan-item-box">
                              <label htmlFor="plan_type_1" className="margin-0">
                                <img
                                  src="/assets/home/images/20210314/affiliate.jpg"
                                  className="plan-thumb-img"
                                  alt=""
                                />
                              </label>

                              <div className="text-center margin-bottom-20">
                                <input
                                  type="radio"
                                  name="plan_type"
                                  className="custom-radio plan_type"
                                  id="plan_type_1"
                                  value="1"
                                  onChange={(e) => {
                                    onChangeUserType(e, "1");
                                  }}
                                  checked={
                                    get_data_value(
                                      userData,
                                      "user_type",
                                      "0"
                                    ) === "1"
                                  }
                                />
                                <label htmlFor="plan_type_1"></label>
                              </div>
                              <div className="text-center">
                                <label
                                  className="radio-desc-wrapper"
                                  htmlFor="plan_type_1"
                                >
                                  <p className="radio-desc-str">
                                    $15.00 / month
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="block">
                        <div className="form-group">
                          <label>Enter Promo Code:</label>
                          <div className="coupon-check-block">
                            <div className="coupon-edit-block">
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="coupon-name"
                                  value={couponName}                               
                                  onChange={(e) => {
                                    onChangeCouponName(e);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="coupon-btn-block">
                              <button
                                className={`btn btn-spiner btn-check-coupon btn-outline-success 
                                ${couponChecking ? `loading` : ``}`}
                                onClick={(e) => {
                                  onClickCheckCoupon();
                                }}
                              >
                                <span>Check</span>
                                <i className="fa fa-refresh fa-spin"></i>
                              </button>
                            </div>
                          </div>
                          <div className={`block margin-top-5 ${couponApplied ? "" : "hidden"}`}>
                            <span className="text-green">
                              {couponAppliedTxt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className="billing-info-block"
                        id="billing-info-block"
                      >
                        <h3 className="box-title text-normal-spacing mt-0 mb-20">
                          Billing Info:
                        </h3>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Street Address:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("billing_street")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="billing_street"
                                name="billing_street"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>City:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("billing_city")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="billing_city"
                                name="billing_city"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>State/Province:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("billing_state")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="billing_state"
                                name="billing_state"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Zip code:</label>
                              <input
                                type="text"
                                className={
                                  "form-control" +
                                  (errorField.includes("billing_zip_code")
                                    ? " is-invalid"
                                    : "")
                                }
                                id="billing_zip_code"
                                name="billing_zip_code"
                                placeholder=""
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Country:</label>
                              <select
                                id="billing_country"
                                name="billing_country"
                                className={
                                  "form-control" +
                                  (errorField.includes("billing_country")
                                    ? " is-invalid"
                                    : "")
                                }
                                onChange={(e) => {
                                  onChangeFormField(e);
                                }}
                                value={get_data_value(
                                  userData,
                                  "billing_country",
                                  "US"
                                )}
                              >
                                {countryList.map((countryItem, index) => (
                                  <option key={index} value={countryItem.code}>
                                    {countryItem.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="credit-card-block" id="credit-card-block">
                        <h3 className="box-title text-normal-spacing mt-0 mb-20">
                          Card Details:
                        </h3>
                        <div>
                          <CreditCardForm
                            userData={userData}
                            setUserData={setUserData}
                            errorField={errorField}
                            setErrorField={setErrorField}
                          ></CreditCardForm>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="terms-condition-block">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="custom-checkbox form-group padding-top-20">
                              <input
                                type="checkbox"
                                id="agree-terms-condition"
                                name="agree_terms_condition"
                                onChange={(e) => {
                                  onChangeFormCheckboxField(e);
                                }}
                              />
                              <label htmlFor="agree-terms-condition">
                                &nbsp;I Agree to the{" "}
                                <Link
                                  to={ROUTE_TERMS_CONDITIONS}
                                  className="text-green"
                                  target="_blank"
                                >
                                  Terms and Conditions
                                </Link>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="custom-checkbox form-group">
                              <input
                                type="checkbox"
                                id="watched-compliance"
                                name="watched_compliance"
                                onChange={(e) => {
                                  onChangeFormCheckboxField(e);
                                }}
                              />
                              <label htmlFor="watched-compliance">
                                &nbsp;I watched and I understood the{" "}
                                <Link
                                  to={ROUTE_COMPLIANCE}
                                  className="text-green"
                                  target="_blank"
                                >
                                  Compliance
                                </Link>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="custom-checkbox form-group">
                              <input
                                type="checkbox"
                                id="trial-policy"
                                name="trial_policy"
                                onChange={(e) => {
                                  onChangeFormCheckboxField(e);
                                }}
                              />
                              <label htmlFor="trial-policy">
                                &nbsp;I read and fully understood the{" "}
                                <Link
                                  to={ROUTE_TRIAL_POLICY}
                                  className="text-green"
                                  target="_blank"
                                >
                                  7-Day Trial Policy
                                </Link>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="reg-button-block">
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-normal-spacing register-desc form-group text-center">
                              When you join Higher Level FX you have 2 ways to
                              participate. Once your account has been created
                              you can change the type of membership you have
                              inside of your back office! Please note that the
                              billing cycle for both memberships is every 30
                              days.
                            </p>
                            <p className="text-normal-spacing register-desc form-group text-center">
                              This transaction may appear on the cardholder bank
                              statement as “HIGHER LEVEL FX”.
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group text-center">
                              <input
                                type="hidden"
                                name="action"
                                value="submit"
                              />
                              <button
                                className="btn btn-green btn-login btn-register btn-login-register"
                                onClick={onClickRegister}
                                id="confirm-update"
                              >
                                Pay & Register
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showConfirmModal && (
          <AuthSmsCodeModal
            isVisible={true}
            setShowconfirmModal={setShowconfirmModal}
            submitModalData={submitModalData}
            modalClass="home-page"
          />
        )}
      </HomeLayout>
    </div>
  );
};
export default withRouter(RegisterPage);
