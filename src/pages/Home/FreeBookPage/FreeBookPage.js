import { SMS_FUNC } from "config/CONSTANTS";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_FREE_BOOK } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const FreeBookPage = () => {
  console.log('---------SMS_FUNC----------', SMS_FUNC)

  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Free Book"
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_FREE_BOOK,
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
            className="section page-section container content-sm"
            id="page-section1"
          >
            <div className="container">
              <div className="block-1 d-padding-top-40">
                <div className="row d-padding-top-20">
                  <div className="col-md-6 d-margin-bottom-30">
                    <h4 className="text-normal-spacing text-bold">
                      <span className="text-green">What you will learn:</span>
                    </h4>
                    <h5 className="text-normal-spacing">
                      ALL the key things you MUST look at before even looking at
                      any chart!
                    </h5>
                    <h5 className="text-normal-spacing">
                      Your fundamental analysis will be taken to a higher level!
                    </h5>
                    <h5 className="text-normal-spacing">
                      Learn about the tools of the Central Bank!
                    </h5>
                    <h5 className="text-normal-spacing">
                      Learn about the absolute best times on when to get in and
                      get out of the market!
                    </h5>
                    <div className="block text-center padding-top-20 padding-bottom-10 text-normal-spacing">
                      <a
                        href="https://m.me/higherlevelfx?ref=w12757602"
                        className="btn alpha-btn alpha-btn1"
                      >
                        Send me my FREE book!
                      </a>
                    </div>
                    <h5 className="text-normal-spacing text-center mt-2">
                      It will be Sent To Your Facebook Messenger Inbox!
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <div className="intro-video-box text-center">
                      <img
                        style={{ width: "65%" }}
                        src="/assets/home/images/20200826/bookimage.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default FreeBookPage;
