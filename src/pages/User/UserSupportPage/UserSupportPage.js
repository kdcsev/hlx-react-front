import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import {
  ROUTE_REWARDS_PLAN,
  ROUTE_USER_SOFTWARE,
  ROUTE_USER_SUPPORT,
  ROUTE_USER_TICKET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiUserGetProfileInfo } from "services/userCommonService";
import { showToast, show_loading } from "utils/GlobalFunctions";

const currentPageTitle = "FAQ";
const UserSupportPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_SUPPORT,
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
    <div className="user-support-page">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <p className="card-description hidden"></p>
              <div className="block">
                <div className="accordion" id="accordion" role="tablist">
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-1">
                      <h6 className="mb-0">
                        <a
                          data-toggle="collapse"
                          href="#collapse-1"
                          aria-expanded="true"
                          aria-controls="collapse-1"
                        >
                          How do I change my credit card information?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-1"
                      className="collapse show"
                      role="tabpanel"
                      aria-labelledby="heading-1"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p className="">1- Click on “Profile”</p>
                            <p className="">
                              2- In the “Credit Card” section put your Card
                              details in
                            </p>
                            <p className="">3- Click on “Update” </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-2">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-2"
                          aria-expanded="false"
                          aria-controls="collapse-2"
                        >
                          How do I cancel my account (all my subscriptions)?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-2"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-2"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>1- Click on “profile”</p>
                            <p>
                              2- You can find the “Cancellation” section under
                              user information
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-3">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-3"
                          aria-expanded="false"
                          aria-controls="collapse-3"
                        >
                          How do I update my broker account number of my
                          license?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-3"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-3"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>1- Click on “Membership”</p>
                            <p>
                              2- Click on the small “pen” at your current
                              license
                            </p>
                            <p>3- Put your new account number in</p>
                            <p>4- Press “Update”</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-4">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-4"
                          aria-expanded="false"
                          aria-controls="collapse-4"
                        >
                          How much does Higher Level FX cost?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-4"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-4"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>Customer - Fixed price of $159 per month.</p>
                            <p>
                              Affiliate - An affiliate pays $15 per month on top
                              of their software license. An affiliate receives
                              additional services and benefits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-5">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-5"
                          aria-expanded="false"
                          aria-controls="collapse-5"
                        >
                          How do I set up the software?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-5"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-5"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              For explanation{" "}
                              <Link
                                to={ROUTE_USER_SOFTWARE}
                                className="text-primary"
                              >
                                CLICK HERE
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" role="tab" id="heading-6">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-6"
                          aria-expanded="false"
                          aria-controls="collapse-6"
                        >
                          What does the software settings mean?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-6"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-6"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              For explanation{" "}
                              <Link
                                to={ROUTE_USER_SOFTWARE}
                                className="text-primary"
                              >
                                CLICK HERE
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-7">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-7"
                          aria-expanded="false"
                          aria-controls="collapse-7"
                        >
                          Can you tell me about your rewards plan?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-7"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-7"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Sure! For a detailed explanation{" "}
                              <Link
                                to={ROUTE_REWARDS_PLAN}
                                className="text-primary"
                                target="_blank"
                              >
                                CLICK HERE
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" role="tab" id="heading-9">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-9"
                          aria-expanded="false"
                          aria-controls="collapse-9"
                        >
                          Why do I need a VPS to run the software?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-9"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-9"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>
                              The Forex market runs 24 hours a day when the
                              market is open. Unless you can have a computer
                              that is constantly on and constantly connected,
                              your trades won't be monitored. A VPS (Virtual
                              Private Server) is a remote desktop on a server
                              that's always on, 24/7.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" role="tab" id="heading-10">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-10"
                          aria-expanded="false"
                          aria-controls="collapse-10"
                        >
                          How do I cancel my affiliate package?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-10"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-10"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>1- Click on “profile”</p>
                            <p>2- Click on “Cancel Affiliate” </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" role="tab" id="heading-12">
                      <h6 className="mb-0">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          href="#collapse-12"
                          aria-expanded="false"
                          aria-controls="collapse-12"
                        >
                          Can I cancel at any time?
                        </a>
                      </h6>
                    </div>
                    <div
                      id="collapse-12"
                      className="collapse"
                      role="tabpanel"
                      aria-labelledby="heading-12"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <p>Absolutely!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="mt-4"></div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="r-block">
                            <p>
                              For any other questions or inquiries, please send
                              us a support ticket! (
                              <Link
                                to={ROUTE_USER_TICKET}
                                className="text-primary"
                              >
                                Click Here
                              </Link>
                              )
                            </p>
                            <p className="hidden">
                              For business inquiries only:
                              admin@higherlevelfx.com
                            </p>
                            <p className="padding-top-10">
                              Please allow up to 48 hours for a reply. Rest
                              assured, we will get back to you as soon as
                              possible!
                            </p>
                          </div>
                        </div>
                      </div>
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

export default UserSupportPage;
