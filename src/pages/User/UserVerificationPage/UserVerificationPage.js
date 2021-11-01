import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import TwoFactorCodeModal from "components/TwoFactorCodeModal/TwoFactorCodeModal";
import { ROUTE_USER_VERIFICATION } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserVerificationPageDetail,
  apiUserConfirmVerificationCode,
  apiUserDisableVerification,
  apiUserSendTwoFactVerificationEmail,
} from "services/userVerificationService";
import {
  empty,
  get_data_value,
  showToast,
  show_loading,
  to_array,
} from "utils/GlobalFunctions";
import TwoFactQRCodeModal from "./inc/TwoFactQRCodeModal";
import "./UserVerificationPage.css";

const currentPageTitle = "Two-Step Verification";
const UserVerificationPage = (props) => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_VERIFICATION,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
    //checkVerificationCode();
  }, []);
  const defaultPageData = {
    user: {},
    two_fact_secret: "",
    two_fact_qr_code_url: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserVerificationPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          checkVerificationCode();
          if (api_res.data["user"]["2fa_status"] === 1) {
            setShowTwoFactQRCodeModal(true);
          }
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const checkVerificationCode = () => {
    let code = "";
    try {
      if (!empty(props.match.params.code)) {
        code = props.match.params.code;
      }
    } catch (e) {}
    if (code === "") {
      return false;
    }
    let get_params = {
      code: code,
    };
    console.log(get_params);
    //return false;
    show_loading(true);
    apiUserConfirmVerificationCode(get_params)
      .then((api_res) => {
        console.log("api_res", api_res);
        if (api_res.status === "1") {
          showToast(api_res.message, "success");
        } else {
          showToast(api_res.message, "error");
        }
        show_loading(false);
        props.history.replace({ pathname: ROUTE_USER_VERIFICATION });
      })
      .catch((err) => {
        showToast(err, "error");
        props.history.replace({ pathname: ROUTE_USER_VERIFICATION });
      });
  };

  const [confirmModalContent, setConfirmModalContent] = useState(
    <div className="alert alert-warning mt-0 mb-0" role="alert">
      <div className="note mb-0 text-center">
        <p>
          To confirm you're trying to enable 2-step verification, we need to
          send you an email.
        </p>
      </div>
    </div>
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const sendVerificationEmail = () => {
    show_loading(true);
    apiUserSendTwoFactVerificationEmail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowConfirmModal(false);
          showToast(
            "Confirmation email has been sent!",
            "success"
          );
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [showTwoFactQRCodeModal, setShowTwoFactQRCodeModal] = useState(false);

  const completeTwoFactVerification = () => {
    getData();
  };

  /////////////////////////////////code for disable 2fa////////////////////////////////////////////////
  const [showVerificationCodeModal, setShowVerificationCodeModal] =
    useState(false);

  const showTwoFactVerificationDlg = () => {
    setShowVerificationCodeModal(true);
  };
  const cancelTwoStepVerification = () => {
    setShowVerificationCodeModal(false);
  };
  const submitVerificationCodeData = (codeData) => {
    let codeStr = to_array(codeData).join("");
    console.log("codeStr", codeStr);
    show_loading(true);
    let params = {
      otp: codeStr,
    };
    apiUserDisableVerification(params)
      .then((api_res) => {
        if (api_res.status === "1") {
          showToast(api_res.message, "success");
          setShowVerificationCodeModal(false);
          getData();
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

  return (
    <div className="user-verification-page">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="d-padding-20">
                  <div className="row">
                    <div className="col-md-7">
                      <div
                        className={`block-has-verification ${
                          get_data_value(pageData["user"], "2fa_secret") !== ""
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="block-verification">
                          <span className="text-success text-bold">
                            Great news!
                          </span>{" "}
                          You're all set!
                        </div>
                        <div className="block-verification">
                          <p className="text-normal">
                            Your Two-Step Authentication is active!
                          </p>
                        </div>
                        <div className="block m-text-center mt-3 mb-4">
                          <button
                            className="glow-on-hover btn-enable-2fact-auth mr-4"
                            type="button"
                            style={{ width: "180px" }}
                            onClick={(e) => {
                              setShowConfirmModal(true);
                            }}
                          >
                            New Device?
                          </button>
                          <button
                            className="glow-on-hover btn-enable-2fact-auth"
                            type="button"
                            style={{ width: "180px" }}
                            onClick={(e) => {
                              showTwoFactVerificationDlg();
                            }}
                          >
                            Disable 2FA
                          </button>
                        </div>
                      </div>
                      <div
                        className={`block-has-no-verification ${
                          get_data_value(pageData["user"], "2fa_secret") === ""
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="block-verification">
                          <p className="text-normal font-size-normal text-bold">
                            &#183; Add an extra layer of security
                          </p>
                          <p className="text-normal">
                            Protect your account with an extra unique code sent
                            to your mobile device
                          </p>
                        </div>
                        <div className="block-verification">
                          <p className="text-normal font-size-normal text-bold">
                            &#183; Keep the bad guys out
                          </p>
                          <p className="text-normal">
                            Even if someone gets your password, it won't be
                            enough to sign in
                          </p>
                        </div>
                        <div className="block-verification">
                          <p className="text-normal font-size-normal text-bold">
                            &#183; Keep your Virtual Cloud safe!
                          </p>
                          <p className="text-normal">
                            2-step verification gives your account the HIGHEST
                            level of protection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="img-wrapper text-center">
                        <img
                          className="img-responsive"
                          style={{ width: "180px" }}
                          src="/assets/user/images/2fa.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`enable-2fa-block ${
                      get_data_value(pageData["user"], "2fa_secret", "aaaa") ===
                      ""
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <div className="block text-center mt-5">
                      <button
                        className="glow-on-hover btn-enable-2fact-auth"
                        type="button"
                        style={{ width: "180px" }}
                        onClick={(e) => {
                          setShowConfirmModal(true);
                        }}
                      >
                        Enable Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title="Confirm it's really you!"
        content={confirmModalContent}
        textBtnYes="Send"
        textBtnNo="Cancel"
        onClickYes={sendVerificationEmail}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page confirm-modal"
      />

      <TwoFactQRCodeModal
        pageData={pageData}
        isVisible={showTwoFactQRCodeModal}
        setVisibleModal={setShowTwoFactQRCodeModal}
        submitModalData={completeTwoFactVerification}
        modalClass="user-page two-fact-qrcode-modal"
      />

      <TwoFactorCodeModal
        isVisible={showVerificationCodeModal}
        setShowconfirmModal={setShowVerificationCodeModal}
        submitModalData={submitVerificationCodeData}
        onCancelModal={cancelTwoStepVerification}
        modalClass="user-page two-fact-verification-code-dlg"
      />
    </div>
  );
};

export default UserVerificationPage;
