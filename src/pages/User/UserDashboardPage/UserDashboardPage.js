import {
  ROUTE_LOGIN,
  ROUTE_USER_DASHBOARD,
  ROUTE_USER_SOFTWARE,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

import { TickerTape } from "react-tradingview-embed";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    empty,
  get_data_value,
  jQuery,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import { apiGetUserDashboardDetail } from "services/userDashboardService";
import { useHistory, withRouter } from "react-router-dom";
import { BASE_FRONT_URL, RULE_PERCENT, SMS_FUNC } from "config/CONSTANTS";
import { updateUser } from "redux/actions/userActions";
import UserReferralListPage from "./inc/UserReferralListPage";

const UserDashboardPage = (props) => {
  console.log("---------SMS_FUNC----------", SMS_FUNC);

  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: "Dashboard",
        current_route: ROUTE_USER_DASHBOARD,
        m_user_menu_collapsed: true,
      })
    );
  };

  useEffect(() => {
    initPage();
    getData();
  }, []);
  const history = useHistory();
  const userDataStore = useSelector((x) => x.userDataStore);
  if (userDataStore["is_active"] === 0) {
    history.push(ROUTE_USER_SOFTWARE);
  }

  const defaultPageData = {
    user: {},
    sponsor_name: "",
    check_in_holding_tank: false,
    ref_url: "",
    rank_info: {},
    tree_info: [],
    active_personal_referral_cnt: 0,
    active_member_count: 0,
    percent0: 0,
    percent1: 0,
    percent2: 0,
    all_personal_referrals_in_tree: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserDashboardDetail()
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

  const onUrlCopied = () => {
    jQuery("#referral_url").focus();
    showToast("Referral link copied.", "success");
  };

  const tradingViewSymbols = [
    {
      description: "EURUSD",
      proName: "FX:EURUSD",
    },
    {
      description: "USDJPY",
      proName: "FX:USDJPY",
    },
    {
      description: "AUDUSD",
      proName: "FX:AUDUSD",
    },
    {
      description: "GBPCAD",
      proName: "FX:GBPCAD",
    },
    {
      description: "GBPUSD",
      proName: "FX:GBPUSD",
    },
    {
      description: "GBPJPY",
      proName: "FX:GBPJPY",
    },
    {
      description: "NZDCAD",
      proName: "FX:NZDCAD",
    },
    {
      description: "NZDUSD",
      proName: "FX:NZDUSD",
    },
    {
      description: "USDCAD",
      proName: "FX:USDCAD",
    },
    {
      description: "XAUUSD",
      proName: "OANDA:XAUUSD",
    },
    {
      description: "AUDCAD",
      proName: "FX:AUDCAD",
    },
  ];

  return (
    <div>
      <div className="trading-widget-block mb-4">
        <TickerTape
          widgetProps={{
            theme: "dark",
            colorTheme: "dark",
            isTransparent: true,
            displayMode: "adaptive",
            locale: "en",
            symbols: tradingViewSymbols,
          }}
        ></TickerTape>
      </div>

      <div
        className={`dashboardForAffiliate ${
          pageData["user"]["user_type"] > 0 ? "" : "hidden"
        }`}
      >
        <div
          className={`row ${
            pageData["user"]["user_type"] === 1 ? "" : "hidden"
          }`}
        >
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Your Rank</h4>
                    <h4 className="text-success mt-3 text-bold">
                      {get_data_value(pageData["user"], "rank_name")}
                      &nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-warning">
                    <i className="ti-announcement gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Your Sponsor</h4>
                    <h4 className="text-success mt-3">
                      {get_data_value(pageData, "sponsor_name")}
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-user gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div
              className={`card ${
                pageData["check_in_holding_tank"] ? "hidden" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="referral-url-box">
                    <h4>Referral Url</h4>
                    <h4 className="text-white mt-3 position-relative">
                      <input
                        type="text"
                        placeholder="Referral url"
                        className="form-control"
                        id="referral_url"
                        name="referral_url"
                        value={pageData["ref_url"]}
                        readOnly={true}
                      />
                      <CopyToClipboard
                        text={pageData["ref_url"]}
                        onCopy={onUrlCopied}
                      >
                        <span
                          className="btn-copy-text"
                          data-clipboard-action="copy"
                          data-clipboard-target="#referral_url"
                        >
                          Copy Link
                        </span>
                      </CopyToClipboard>
                    </h4>
                  </div>

                  <CopyToClipboard
                    text={pageData["ref_url"]}
                    onCopy={onUrlCopied}
                  >
                    <div className="icon-box icon-box-bg-image-info btn-url-copy">
                      <i className="ti-files gradient-card-icon"></i>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div
              className={`${pageData["check_in_holding_tank"] ? "" : "hidden"}`}
            >
              <div className="card-body padding-0">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="text-white mt-1 width-100 text-normal">
                    <div className="alert alert-warning margin-0" role="alert">
                      Your sponsor hasn't placed you yet. Once your sponsor
                      places you in the tree, your tree will become available.
                      <br />
                      NOTE: If your sponsor doesn’t place you within 10 days
                      then you will automatically be placed.
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Active Personal Referrals (Customers Only)</h4>
                    <h4 className="text-success mt-3 text-bold">
                      {pageData["active_personal_referral_cnt"]}
                      &nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-pie-chart gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Active members</h4>
                    <h4 className="text-success mt-3 text-bold">
                      {pageData["active_member_count"]}
                      &nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-pie-chart gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Total Earnings</h4>
                    <h4 className="text-success mt-3 text-bold">
                      ${pageData["user"]["balance"]}&nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-pie-chart gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-12 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Network Summary</h4>
                <div className="table-responsive">
                  <table className="table1" style={{ minWidth: "550px" }}>
                    <thead>
                      <tr>
                        <th className="pt-1 pl-0"></th>
                        <th className="pt-1 text-primary">Lane 1</th>
                        <th className="pt-1 text-primary">Lane 2</th>
                        <th className="pt-1 text-primary">Lane 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-primary">Affiliates</td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][0],
                            "affiliate_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][1],
                            "affiliate_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][2],
                            "affiliate_cnt"
                          )}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="text-primary">
                          Active Personal Referrals
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][0],
                            "active_personal_referral_all_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][1],
                            "active_personal_referral_all_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][2],
                            "active_personal_referral_all_cnt"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-primary">Active Customers</td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][0],
                            "active_customer_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][1],
                            "active_customer_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][2],
                            "active_customer_cnt"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-primary">Total Active Users</td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][0],
                            "active_member_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][1],
                            "active_member_cnt"
                          )}
                        </td>
                        <td>
                          {get_data_value(
                            pageData["tree_info"][2],
                            "active_member_cnt"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-primary">Qualifying</td>
                        <td>
                          <label
                            className={`badge badge-success ${
                              pageData["percent0"] / 100 < RULE_PERCENT
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {pageData["percent0"]}%
                          </label>
                        </td>
                        <td>
                          <label
                            className={`badge badge-success ${
                              pageData["percent1"] / 100 < RULE_PERCENT
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {pageData["percent1"]}%
                          </label>
                        </td>
                        <td>
                          <label
                            className={`badge badge-success ${
                              pageData["percent2"] / 100 < RULE_PERCENT
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {pageData["percent2"]}%
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-primary">Users in holding tank:</td>
                        <td>{pageData["holding_user_cnt"]}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`dashboardForCustomer ${
          pageData["user"]["user_type"] === 0 ? "" : "hidden"
        }`}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-xl-12 grid-margin">
            <div
              className={`card ${
                pageData["check_in_holding_tank"] ? "hidden" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="referral-url-box">
                    <h4>Referral Url</h4>
                    <h4 className="text-white mt-3 position-relative">
                      <input
                        type="text"
                        placeholder="Referral url"
                        className="form-control"
                        id="referral_url"
                        name="referral_url"
                        value={pageData["ref_url"]}
                        readOnly={true}
                      />
                      <CopyToClipboard
                        text={pageData["ref_url"]}
                        onCopy={onUrlCopied}
                      >
                        <span
                          className="btn-copy-text"
                          data-clipboard-action="copy"
                          data-clipboard-target="#referral_url"
                        >
                          Copy Link
                        </span>
                      </CopyToClipboard>
                    </h4>
                  </div>

                  <CopyToClipboard
                    text={pageData["ref_url"]}
                    onCopy={onUrlCopied}
                  >
                    <div className="icon-box icon-box-bg-image-info btn-url-copy">
                      <i className="ti-files gradient-card-icon"></i>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div
              className={`${pageData["check_in_holding_tank"] ? "" : "hidden"}`}
            >
              <div className="card-body padding-0">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="text-white mt-1 width-100 text-normal">
                    <div className="alert alert-warning margin-0" role="alert">
                      Your sponsor hasn't placed you yet. Once your sponsor
                      places you in the tree, your tree will become available.
                      <br />
                      NOTE: If your sponsor doesn’t place you within 10 days
                      then you will automatically be placed.
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Active Personal Referrals (Customers Only)</h4>
                    <h4 className="text-success mt-3 text-bold">
                      {pageData["active_personal_referral_cnt"]}
                      &nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-pie-chart gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Total Earnings</h4>
                    <h4 className="text-success mt-3 text-bold">
                      ${pageData["user"]["balance"]}&nbsp;
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-pie-chart gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-xl-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Your Sponsor</h4>
                    <h4 className="text-success mt-3">
                      {get_data_value(pageData, "sponsor_name")}
                    </h4>
                    <h6 className="text-muted">&nbsp;</h6>
                  </div>
                  <div className="icon-box icon-box-bg-image-danger">
                    <i className="ti-user gradient-card-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {pageData["user"]["user_type"] === 0 && pageData["user"]["is_active"] === 1 && !empty(pageData["all_personal_referrals_in_tree"]) && (
            <div className="row">
                <div className="col-md-12">
                <UserReferralListPage pageData={pageData} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(UserDashboardPage);
