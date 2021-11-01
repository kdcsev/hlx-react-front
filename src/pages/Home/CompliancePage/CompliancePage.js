import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_COMPLIANCE } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const CompliancePage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Compliance";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_COMPLIANCE,
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
            className="section page-section container has-header content-sm"
            id="page-section1"
          >
            <div className="container d-padding-top-20">
              <div className="row">
                <div className="col-md-12 md-margin-bottom-30">
                  <h4 className="text-normal-spacing text-underline text-center">
                    COMPLIANCE
                  </h4>
                  <div className="intro-video-box text-center">
                    <iframe
                      src="https://player.vimeo.com/video/568618990"
                      className="vimeo-iframe"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      title="Rewards Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h5 className="text-normal-spacing text-center d-padding-bottom-20 d-padding-top-20">
                    Download the Disclaimer{" "}
                    <a
                      className="text-blue text-underline"
                      href="/assets/images/Disclaimer.jpg?v=2"
                      download
                    >
                      Here
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default CompliancePage;
