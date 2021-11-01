import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_SUPPORT } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const SupportPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Support";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_SUPPORT,
      })
    );
  };

  useEffect(() => {
    initPage();
  });

  function openTicketPopup() {
    //console.log("on click support");
    window.openChatBox(true);
  }

  return (
    <div>
      <HomeLayout>
        <div className="main-content">
          <div
            className="section page-section container has-header content-sm"
            id="page-section1"
          >
            <div className="container d-padding-top-20">
              <div className="row d-margin-top-20">
                <div className="col-md-12 md-margin-bottom-30 aboutus-left-block">
                  <h4 className="text-normal-spacing d-margin-bottom-40">
                    We are here to help!
                  </h4>
                  <h5 className="text-normal-spacing">
                    For questions and support: Send us a support ticket! (
                    <button
                      className="a-btn text-green"
                      onClick={openTicketPopup}
                    >
                      Click here
                    </button>
                    )
                  </h5>
                  <h5 className="text-normal-spacing">
                    For business inquiries: admin@higherlevelfx.com
                  </h5>
                  <h5 className="text-normal-spacing d-margin-top-40">
                    We respond to all tickets in the order they are received and
                    will respond directly to yours as quickly as we can. Please
                    allow up to 48 hours for a reply. Rest assured, we will get
                    back to you as soon as possible.
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

export default SupportPage;
