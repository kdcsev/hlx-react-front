import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  get_data_value,
  isEmpty,
  jQuery,
  showToast,
} from "utils/GlobalFunctions";
import { APP_NAME, LICENSE_PRICE, LICENSE_TRIAL_PRICE } from "config/CONSTANTS";
import {
  ROUTE_USER_DASHBOARD,
  ROUTE_USER_PAY_LICENSE,
} from "navigation/CONSTANTS";
import { useHistory } from "react-router-dom";

function UserLicenseIntroPage(props) {
  const { currentPageTitle, pageData } = props;

  const history = useHistory();
  const goPayLicensePage = () => {
    console.log("pageData", pageData);
    if (get_data_value(pageData, "is_active_customer") === 0) {
      history.push(ROUTE_USER_PAY_LICENSE);
    } else {
      showToast("Invalid request", "error");
      history.push(ROUTE_USER_DASHBOARD);
    }
  };

  return (
    <>
      <div className={`row`}>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-horizontal">
                    <div className="card-content">
                      <div className="row d-margin-top-20">
                        <div className="col-md-12">
                          <h4 className="test-normal">
                            You need to become a member to access all of our
                            products.
                          </h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="block mt-4">
                            <h4>Here is what you get:</h4>
                            <div className="pl-3">
                              <ul>
                                <li>Two software licenses</li>
                                <li>advanced HLX Academy</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="img-wrapper mt-4 text-center">
                            <img
                              className="img-responsive"
                              style={{ maxWidth: "120px" }}
                              src="/assets/home/images/20210314/alpha-gold.png"
                              alt=""
                            />
                          </div>
                          <div className="membership-desc text-center mt-4">
                            <span
                              className={`text-underline ${
                                pageData["user"]["trial_used"] === 0
                                  ? ""
                                  : "hidden"
                              }`}
                            >
                              ${LICENSE_TRIAL_PRICE} for 7 days, then $
                              {LICENSE_PRICE} / month if not cancelled!
                            </span>
                            <span
                              className={`text-underline ${
                                pageData["user"]["trial_used"] === 0
                                  ? ""
                                  : "hidden"
                              }`}
                            >
                              ${LICENSE_PRICE} / month
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block mt-4">
            <div className="text-center">
              <span
                className={`text-normal ${
                  pageData["user"]["trial_used"] === 0 ? "" : "hidden"
                }`}
              >
                Upgrade Notice: If membership isn't cancelled within the 7-days
                trial it will automatically go to a normal membership and begin
                being charged ${LICENSE_PRICE} per month.
              </span>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="btn btn-md btn-success add-license-number"
                style={{ width: "120px" }}
                onClick={(e) => {
                  goPayLicensePage();
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLicenseIntroPage;
