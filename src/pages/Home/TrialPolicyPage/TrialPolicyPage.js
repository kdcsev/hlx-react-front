import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_TRIAL_POLICY } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const TrialPolicyPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "7-Day Trial Policy";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_TRIAL_POLICY,
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
              <div className="row d-margin-top-20">
                <div className="col-md-12 md-margin-bottom-30">
                  <h4 className="text-normal-spacing d-margin-bottom-40">
                    7-Day Trial Policy
                  </h4>
                  <p className="desc-v1-1">
                    If your membership isn't cancelled within the 7-day trial
                    period it will automatically roll over to a normal
                    membership of $159 per month. Higher Level FX does NOT issue
                    refunds under any circumstances.
                    <br />
                  </p>
                  <p className="desc-v1-1"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default TrialPolicyPage;
