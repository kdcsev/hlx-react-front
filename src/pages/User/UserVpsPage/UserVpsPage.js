import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { APP_NAME } from "config/CONSTANTS";
import { ROUTE_USER_VPS } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiUserCheckHasActiveLicense,
  apiUserCheckHlxPassword,
} from "services/userCommonService";
import {
  apiUserGetVpsConsoleUrl,
  apiUserGetVpsPassword,
} from "services/userVpsService";
import {
  get_data_value,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import ConfirmPasswordModal from "./inc/ConfirmPasswordModal";
import VpsInfoModal from "./inc/VpsInfoModal";


const currentPageTitle = "Virtual Private Server";
const UserVpsPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_VPS,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, []);

  const defaultPageData = {
    user: {},
    vps_username: "",
    vps_password: "azzazza",
  };
  const [pageData, setPageData] = useState(defaultPageData);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleVpsInfoModal, setVisibleVpsInfoModal] = useState(false);

  const getData = () => {
    show_loading(true);
    apiUserCheckHasActiveLicense()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const onClickReval = () => {
    const vps_password = get_data_value(pageData, "vps_password");
    //console.log('vps_password', vps_password)
    if (vps_password === "") {
      setVisibleModal(true);
    } else {
      setVisibleVpsInfoModal(true);
    }
  };

  const onClickVpsConsole = () => {
    show_loading(true);
    apiUserGetVpsConsoleUrl()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          let redirect_url = api_res.data["redirect_url"];
          if (!is_empty(redirect_url)) {
            window.open(redirect_url);
          } else {
            showToast("Invalid request", "error");
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

  const submitPassword = (modalData) => {
    console.log("modalData", modalData);
    //let user_password = get_data_value(modalData, 'user_password')
    show_loading(true);
    apiUserGetVpsPassword(modalData)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          setVisibleModal(false);
          setVisibleVpsInfoModal(true);
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  return (
    <div className="user-vps-page">
      <div
        className={`row ${
          get_data_value(pageData["user"], "license_status") === 0
            ? ""
            : "hidden"
        }`}
      >
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="r-block padding-top-20">
                  <h4>
                    Welcome to your Virtual Private Server Management Area!
                  </h4>
                  <br />
                  <p className="text-normal">
                    You need to be an active customer to access our tools and
                    software
                  </p>
                  <br />
                  <p className="text-normal">
                    Please purchase your membership under the "Membership"
                    section to receive your own secured Virtual Private Server.
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`row ${
          get_data_value(pageData["user"], "license_status") === 1
            ? ""
            : "hidden"
        }`}
      >
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="alert alert-warning mb-5 hidden" role="alert">
                  <div className="note mb-0 text-left">
                    <p>Deal HLX Member!</p>
                    <p>
                      This new VPS feature is currently in beta, therefore it
                      comes for free with your membership! If you experience any
                      issues, just send us a support ticket and we will take
                      care of it for you!
                    </p>
                  </div>
                </div>
                <div className="block text-center padding-top-20">
                  <div className="block position-relative">
                    <iframe
                      src="https://player.vimeo.com/video/544336994"
                      width="640"
                      height="360"
                      title="Video"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    ></iframe>
                    <div className="text-center mt-1 mb-3"></div>
                  </div>
                </div>

                <div className="r-block padding-top-20">
                  <h4>
                    Welcome to your Virtual Private Server Management Area!
                  </h4>
                  <br />
                  <p className="text-normal">
                    This is the area where you can access all of our available
                    tools and software.
                  </p>
                  <br />
                  <p className="text-normal">
                    If you just recently purchased your membership, please wait
                    about 10-15 minutes until your VPS is being created. All you
                    need to do is just click the link below and you will be
                    taken to your own web based VPS.
                  </p>
                  <br />
                  <p className="text-normal">
                    Please note that you must allow pop-ups to access your VPS!
                    Your session is fully safe and secure.
                  </p>
                  <br />
                  <p className="text-normal">
                    Your username is: Administrator
                    <br />
                  </p>
                  <p className="text-normal">
                    Your password is: &nbsp;{" "}
                    <button
                      type="button"
                      className="btn-show-vps-password btn btn-sm btn-success"
                      onClick={onClickReval}
                    >
                      Reveal
                    </button>
                  </p>
                  <br />
                </div>

                <div className="r-block mt-4 mb-4">
                  <h4 className="text-normal inline-block mr-4">
                    Access your VPS Here:
                  </h4>
                  <div className="vps-btn-wrapper-1">
                    <button
                      className="glow-on-hover btn-redirect-console"
                      type="button"
                      onClick={onClickVpsConsole}
                    >
                      Access Your VPS!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmPasswordModal
        modalTitle={APP_NAME}
        isVisible={visibleModal}
        setVisibleModal={setVisibleModal}
        submitModalData={submitPassword}
        modalClass="user-page confirm-password-modal"
      ></ConfirmPasswordModal>

      <VpsInfoModal
        modalTitle={APP_NAME}
        isVisible={visibleVpsInfoModal}
        setVisibleModal={setVisibleVpsInfoModal}
        modalData={pageData}
        modalClass="user-page vps=info-modal"
      ></VpsInfoModal>
    </div>
  );
};

export default UserVpsPage;
