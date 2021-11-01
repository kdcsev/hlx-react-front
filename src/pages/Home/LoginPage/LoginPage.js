import HomeLayout from "layouts/HomeLayout/HomeLayout";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_FREE_BOOK,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_USER_DASHBOARD,
} from "navigation/CONSTANTS";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import ReCAPTCHA from "react-google-recaptcha";
import { googleKey } from "config/CONSTANTS";
import { Link, withRouter } from "react-router-dom";
import TwoFactorCodeModal from "components/TwoFactorCodeModal/TwoFactorCodeModal";
import {
  empty,
  get_data_value,
  isEmpty,
  is_empty,
  showToast,
  show_loading,
  to_array,
} from "utils/GlobalFunctions";
import {
  apiCheckTwoFactAuth,
  apiLogin,
  apiLoginTwoFactAuth,
  apiLogout,
} from "services/loginService";
import { updateUser } from "redux/actions/userActions";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowconfirmModal] = useState(false);
  const initPage = () => {
    let page_title = "Login";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_LOGIN,
        license_cancelled_message: "",
      })
    );
  };

  useEffect(() => {
    initPage();
    doLogout()
  }, []);

  const showTwoStepCodeModal = () => {
    setShowconfirmModal(true);
  };

  //////////////////////////////////////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  const userInfo = userDataStore;
  console.log("userInfo", userInfo);
  const initUserData = { user_name: "", user_password: "" };
  const [userData, setUserData] = useState(initUserData);
  const [errorField, setErrorField] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const getLoginAttemptCount = () => {
    let login_attempt_count = get_data_value(userInfo, "login_attempt_count");
    if (is_empty(login_attempt_count)) {
      login_attempt_count = 0;
    } else {
      login_attempt_count = parseInt(login_attempt_count);
    }
    return login_attempt_count;
  };
  const checkCaptchaEnabled = () => {
    let login_attempt_count = getLoginAttemptCount();
    if (login_attempt_count >= 3) {
      return true;
    } else {
      return false;
    }
  };
  const [recaptchaEnable, setRecaptchaEnable] = useState(checkCaptchaEnabled());
  const updateLoginAttemptCount = (count) => {
    if (count === null || count === undefined) {
      count = getLoginAttemptCount();
      count++;
    }
    userInfo["login_attempt_count"] = count;
    dispatch(updateUser({ login_attempt_count: count }));
    setRecaptchaEnable(checkCaptchaEnabled());
  };

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
    errorList = isEmpty(userData, "user_name", errorList);
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
  const submitModalData = (codeData) => {
    let codeStr = to_array(codeData).join("");
    console.log("codeStr", codeStr);
    show_loading(true);
    apiLoginTwoFactAuth(userData, codeStr)
      .then((api_res) => {
        if (api_res.status === "1") {
          doLogin(api_res.data);
        } else {
          show_loading(false);
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };
  const onClickLogin = () => {
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
      apiLogin(userData)
        .then((api_res) => {
          console.log("api_res", api_res);
          if (api_res.status === "1") {
            let data = api_res["data"];
            if (!empty(data["2fa_secret"]) && data["2fa_secret"] !== "") {
              show_loading(false);
              showTwoStepCodeModal();
            } else {
              doLogin(data);
            }
          } else {
            show_loading(false);
            showToast(api_res.message, "error");
            updateLoginAttemptCount();
            if (recaptchaEnable) {
              setRecaptchaValid(false);
              resetCaptcha()
            }
          }
        })
        .catch((err) => {
          show_loading(false);
          showToast(err, "error");
          if (recaptchaEnable) {
            setRecaptchaValid(false);
            resetCaptcha()
          }
        });
    }
  };
  const doLogin = (data) => {
    showToast("You are in!", "success");
    dispatch(updateUser(data));
    setTimeout(() => {
      show_loading(false);
      if (data["is_admin"] === "1") {
        props.history.replace({ pathname: ROUTE_ADMIN_DASHBOARD });
      } else {
        props.history.replace({ pathname: ROUTE_USER_DASHBOARD });
      }
    }, 500);
    updateLoginAttemptCount(0);
  };
  const doLogout = () => {
    if(empty(userDataStore['token'])){
      return false
    }

    apiLogout(userDataStore['token'])
    .then((api_res) => {
      console.log("api_res", api_res)
    })
    .catch((err) => {
       
    });
    dispatch(updateUser({token:""}));
  };
  const onChangeKeyInput = (e, field_name) => {
    if(field_name === 'user_password'){
      if (e.key === 'Enter') {
        onClickLogin()
      }
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
                <form className="login-form" method="post">
                  <div className="logo-wrapper">
                    <img
                      src="/assets/home/images/higherlevelfx_logo_tm.png"
                      className="img-responsive img-logo"
                      alt=""
                    />
                  </div>
                  <h3 className="box-title text-normal-spacing mt-0 mb-20">
                    Login
                  </h3>
                  <div className="form-group">
                    <label htmlFor="user_name">Username or Email:</label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className={`form-control ${
                        errorField.includes("user_name") ? "is-invalid" : ""
                      }`}
                      placeholder="Username or Email"
                      value={get_data_value(userData, "user_name")}
                      onChange={(e) => {
                        onChangeFormField(e, "user_name");
                      }}
                      onKeyDown={(e)=>{
                        onChangeKeyInput(e, "user_name")
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user_password">Password:</label>
                    <input
                      type="password"
                      id="user_password"
                      name="user_password"
                      className={`form-control ${
                        errorField.includes("user_password") ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                      value={get_data_value(userData, "user_password")}
                      onChange={(e) => {
                        onChangeFormField(e, "user_password");
                      }}
                      onKeyDown={(e)=>{
                        onChangeKeyInput(e, "user_password")
                      }}
                    />
                  </div>
                  <div
                    className={`form-group recaptcha-wrap ${
                      recaptchaEnable ? "" : "hidden"
                    }`}
                  >
                    <ReCAPTCHA
                      ref={(r) => setCaptchaRef(r)}
                      sitekey={googleKey}
                      onChange={reCaptchaChanged}
                    ></ReCAPTCHA>
                  </div>

                  <div className="form-group">
                    <div className="custom-checkbox">
                      <input type="checkbox" id="agree-terms-condition" />
                      <label htmlFor="agree-terms-condition">Remember me</label>
                    </div>
                  </div>
                  <div className="form-group text-center padding-top-10">
                    <input type="hidden" name="action" value="submit" />
                    <button
                      className="btn btn-green btn-login"
                      type="button"
                      onClick={onClickLogin}
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="form-group text-center padding-top-10">
                    <div className="row">
                      <div className="col-md-4 register-btn-wrapper">
                        <Link
                          to={ROUTE_REGISTER}
                          className="btn-register text-desc text-normal-spacing"
                        >
                          Sign Up
                        </Link>
                      </div>
                      <div className="col-md-8 reset-password-btn-wrapper">
                        <Link
                          to={ROUTE_FORGOT_PASSWORD}
                          className="btn-reset-password text-desc text-normal-spacing"
                        >
                          Forgot Your Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {showConfirmModal && (
          <TwoFactorCodeModal
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

export default withRouter(LoginPage);
