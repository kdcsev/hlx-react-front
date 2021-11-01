import HomeLayout from "layouts/HomeLayout/HomeLayout";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_FREE_BOOK,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
} from "navigation/CONSTANTS";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import ReCAPTCHA from "react-google-recaptcha";
import { googleKey } from "config/CONSTANTS";
import { Link, withRouter } from "react-router-dom";
import TwoFactorCodeModal from "components/TwoFactorCodeModal/TwoFactorCodeModal";
import {
  get_data_value,
  isEmpty,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import { apiLogin, apiRequestResetPassword } from "services/loginService";
import { updateUser } from "redux/actions/userActions";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Forgot password";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_FORGOT_PASSWORD,
      })
    );
    //document.title = page_title;
  };

  useEffect(() => {
    initPage();
  });

  //////////////////////////////////////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  const userInfo = userDataStore;
  console.log("userInfo", userInfo);
  const initUserData = { user_name: "", user_password: "" };
  const [userData, setUserData] = useState(initUserData);
  const [errorField, setErrorField] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const checkCaptchaEnabled = () => {
    return true;
  };
  const [recaptchaEnable, setRecaptchaEnable] = useState(checkCaptchaEnabled());
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const reCaptchaChanged = (value) => {
    console.log("reCaptchaChanged", value);
    setRecaptchaValid(true);
  };

  let captcha;
  const setCaptchaRef = (ref) => {
    if (ref) {
      return (captcha = ref);
    }
  };
  const resetCaptcha = () => {
    // maybe set it till after is submitted
    captcha.reset();
  };

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(userData, "user_email", errorList);
    errorList = isEmpty(userData, "user_password", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };
  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    userData[field_name] = e.target.value;
    setUserData({ ...userData });
  };

  const onClickResetPassword = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      if (recaptchaEnable) {
        if (!recaptchaValid) {
          showToast("Please confirm that you're not a robot", "error");
          return false;
        }
      }
      show_loading(true);
      apiRequestResetPassword(userData)
        .then((api_res) => {
          console.log("api_res", api_res);
          if (api_res.status === "1") {
            //let data = api_res["data"];
            show_loading(false)
            showToast(api_res.message, 'success');
          } else {
            show_loading(false);
            showToast(api_res.message, "error");
          }
          if (recaptchaEnable) {
            setRecaptchaValid(false);
            resetCaptcha();
          }
        })
        .catch((err) => {
          show_loading(false);
          showToast(err, "error");
          setRecaptchaValid(false);
          resetCaptcha();
        });
    }
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
                <form className="login-form reset-password-form" method="post">
                  <div className="logo-wrapper">
                    <img
                      src="/assets/home/images/higherlevelfx_logo_tm.png"
                      className="img-responsive img-logo"
                      alt=""
                    />
                  </div>
                  <div className="form-group text-center">
                    <div className="margin-bottom-20 font-normal">
                      Enter the email address for your account and a new
                      password below.
                      <br />
                      You will receive a confirmation email, please click the
                      link in the email to activate your new password.
                    </div>
                  </div>
                  <div
                    className="block"
                    style={{ maxWidth: "400px", margin: "auto" }}
                  >
                    <div className="form-group">
                      <label htmlFor="user_email">Email:</label>
                      <input
                        type="text"
                        id="user_email"
                        name="user_email"
                        className={`form-control ${
                          errorField.includes("user_email") ? "is-invalid" : ""
                        }`}
                        placeholder=""
                        value={get_data_value(userData, "user_email")}
                        onChange={(e) => {
                          onChangeFormField(e, "user_email");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user_password">New Password:</label>
                      <input
                        type="text"
                        id="user_password"
                        name="user_password"
                        className={`form-control ${
                          errorField.includes("user_password")
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder=""
                        value={get_data_value(userData, "user_password")}
                        onChange={(e) => {
                          onChangeFormField(e, "user_password");
                        }}
                      />
                    </div>
                    <div className="form-group recaptcha-wrap">
                      <ReCAPTCHA
                        ref={(r) => setCaptchaRef(r)}
                        sitekey={googleKey}
                        onChange={reCaptchaChanged}
                      ></ReCAPTCHA>
                    </div>

                    <div className="form-group text-center padding-top-10">
                      <input type="hidden" name="action" value="submit" />
                      <button
                        className="btn btn-green btn-login"
                        type="button"
                        onClick={onClickResetPassword}
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="form-group text-center padding-top-10">
                      <div className="row">
                        <div className="col-md-6 register-btn-wrapper">
                          <Link
                            to={ROUTE_LOGIN}
                            className="btn-register text-desc text-normal-spacing"
                          >
                            Login
                          </Link>
                        </div>
                        <div className="col-md-6 reset-password-btn-wrapper">
                          <Link
                            to={ROUTE_REGISTER}
                            className="btn-reset-password text-desc text-normal-spacing"
                          >
                            Sign up
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default withRouter(ForgotPasswordPage);