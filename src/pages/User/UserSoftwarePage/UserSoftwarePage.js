import { ROUTE_USER_SOFTWARE } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiUserGetProfileInfo } from "services/userCommonService";
import { showToast, show_loading } from "utils/GlobalFunctions";
import "./UserSoftwarePage.css";

const currentPageTitle = "Getting Started";
const UserSoftwarePage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_SOFTWARE,
        m_user_menu_collapsed: true,
      })
    );
  };

  useEffect(() => {
    initPage();
    getData();
  }, []);
  const history = useHistory();
  const defaultPageData = {
    user: {},
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiUserGetProfileInfo()
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

  return (
    <div className="user-getting-started-page">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="block padding-bottom-5 padding-top-5">
                  <h3 className="text-bold text-center">
                    Ready to Reach a Higher Level?
                  </h3>
                  <h4 className="r-item text-center">
                    Please watch the following steps to get started!
                  </h4>
                  <h4 className="r-item text-center">
                    Join our Telegram Channel for Updates and Announcements:{" "}
                    <a
                      className="text-primary"
                      href="https://t.me/higherlevelfx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://t.me/higherlevelfx
                    </a>
                  </h4>
                </div>
                <div
                  className="sub-block margin-top-0"
                  style={{ border: "none" }}
                >
                  <h4 className="text-bold text-underline text-uppercase">
                    WELCOME! (WATCH THIS FIRST!)
                  </h4>
                  <div className="block text-center padding-top-20">
                    <div className="block position-relative">
                      <iframe
                        src="https://player.vimeo.com/video/540906064"
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        title="WELCOME! (WATCH THIS FIRST!)"
                        allowFullScreen
                      ></iframe>
                      <div className="text-center mt-1 mb-3"></div>
                    </div>
                  </div>
                </div>
                <div className="sub-block">
                  <h4 className="text-bold text-underline text-uppercase">
                    Getting Started
                  </h4>
                  <div className="block text-center padding-top-20">
                    <div
                      className="block position-relative"
                      style={{ marginBottom: "20px" }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/539867350"
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        title="Getting Started"
                        allowFullScreen
                      ></iframe>
                      <h4>
                        <b></b>
                      </h4>
                      <div className="hidden">
                        <a
                          className="text-primary"
                          href="/downloads/Alpha-V2-NX.zip"
                          target="_blank"
                          download="Alpha-V2V.zip"
                        >
                          (Click Here to Download)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="sub-block">
                        <h4 className="text-bold text-underline text-uppercase">Alpha 2.0 - Settings Explained</h4>
                        <div className="block text-center padding-top-20">
                            <div className="block position-relative" style={{marginBottom: "20px"}}>
                                <iframe src="https://player.vimeo.com/video/471858129" width="640" height="360" frameBorder="0"
                      allow="autoplay; fullscreen"
                      title="Rewards Video"
                      allowFullScreen></iframe>
                                <h4><b></b></h4>
                            </div>
                        </div>
                    </div> */}
                <div className="sub-block">
                  <h4 className="text-bold text-underline">
                    ALPHA 2.5 EXPLAINED
                  </h4>
                  <div className="block text-center padding-top-20">
                    <div
                      className="block position-relative"
                      style={{ marginBottom: "20px" }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/582318051"
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        title="ALPHA 2.5 EXPLAINED"
                        allowFullScreen
                      ></iframe>
                      <h4>
                        <b></b>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sub-block">
                  <h4 className="text-bold text-underline">
                    ALPHA GR EXPLAINED
                  </h4>
                  <div className="block text-center padding-top-20">
                    <div
                      className="block position-relative"
                      style={{ marginBottom: "20px" }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/540321957"
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        title="ALPHA GR EXPLAINED"
                        allowFullScreen
                      ></iframe>
                      <h4>
                        <b></b>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sub-block">
                  <h4 className="text-bold text-underline">
                    ALPHA GO EXPLAINED
                  </h4>
                  <div className="block text-center padding-top-20">
                    <div
                      className="block position-relative"
                      style={{ marginBottom: "20px" }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/540541325"
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        title="ALPHA GO EXPLAINED"
                        allowFullScreen
                      ></iframe>
                      <h4>
                        <b></b>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSoftwarePage;
