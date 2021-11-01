import HomeLayout from "layouts/HomeLayout/HomeLayout";
import {
  ROUTE_COMPLIANCE,
  ROUTE_LOGIN,
  ROUTE_USER_WALLET,
  ROUTE_WELCOME,
} from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Congratulations! You're in!";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_WELCOME,
      })
    );
  };

  useEffect(() => {
    initPage();
  });

  return (
    <div>
      <HomeLayout>
        <div className="main-content">
          <div
            className="section page-section container has-header content-sm pb-40"
            id="page-section1"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12 margin-bottom-30">
                  <div className="reg-form margin-bottom-40">
                    <div className="logo-wrapper">
                      <img
                        src="/assets/home/images/higherlevelfx_logo_tm.png"
                        className="img-responsive img-logo"
                        alt=""
                      />
                    </div>
                  </div>
                  <h2 className="text-center text-bold mt-20 mb-20">
                    Congratulations! You're in! <br />
                    <span style={{ fontSize: "0.9em" }}>Start HERE:</span>
                  </h2>
                  <div
                    className="intro-video-box text-center"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <iframe
                      src="https://player.vimeo.com/video/566885272"
                      className="vimeo-iframe"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title="video"
                    ></iframe>
                  </div>
                  <div className="text-center text-bold mt-20 mb-20">
                    <a
                      href="https://www.facebook.com/groups/thefreedomsocietygroup"
                      className="btn-join-fb btn btn-lg btn-green"
                      rel="noreferrer"
                      target="_blank"
                    >
                      JOIN THE FB COMMUNITY!
                    </a>
                  </div>
                  <p className="desc-v1 text-center mt-10 mb-10">
                    ... Or if you have already joined, click{" "}
                    <Link className="text-green" to={ROUTE_LOGIN}>
                      here
                    </Link>{" "}
                    to login to your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default WelcomePage;
