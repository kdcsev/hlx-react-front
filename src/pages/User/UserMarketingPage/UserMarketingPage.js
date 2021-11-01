import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import { ROUTE_USER_ACADEMY, ROUTE_USER_DASHBOARD, ROUTE_USER_MARKETING } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserMarketingPageDetail } from "services/userMarketingService";
import {
  empty,
  get_data_value,
  intval,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import UserActiveListPage from "./inc/UserActiveListPage";

const currentPageTitle = "Affiliate Only Section";
const UserMarketingPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_MARKETING,
        m_user_menu_collapsed: true,
      })
    );
  };
  const history = useHistory()
  useEffect(() => {
    initPage();
    getData();
  }, []);
  //const history = useHistory();
  const defaultPageData = {
    user: {},
    all_users_in_tree: [],
    missing_rank_list: {},
    missing_rank_message: "",
    next_rank_info: {},
    rank_info: {},
    rank_rule_list: {},
    tree_info: [],
    user_base_tree: [],
    destination_personal_referrals: 0,
    personal_referrals: 0,
    error_msg_arr: [],
    error_msg: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserMarketingPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          if(api_res.data['user']['user_type']!==1){
            showToast("Only affiliate can access this page", "error");
            history.push(ROUTE_USER_DASHBOARD);
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

  return (
    <div className="user-marketing-page">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="card text-left">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content affiliate-only-screen">
                <div className="block padding-bottom-5 padding-top-5">
                  <h4 className="text-normal mb-3">
                    Your current rank:{" "}
                    <span className="text-success">
                      {get_data_value(pageData["rank_info"], "rank_name", " ")}
                    </span>
                  </h4>
                  <h4 className="text-normal mb-3">
                    Your next rank:{" "}
                    <span className="text-warning">
                      {get_data_value(
                        pageData["next_rank_info"],
                        "rank_name",
                        " "
                      )}
                    </span>
                  </h4>
                </div>
                <div className="divider-1 mb-4"></div>
                <h4 className="text-normal mb-4">Requirements:</h4>
                <h4 className="text-normal personal-referrals mb-4">
                  Personal Referrals:{" "}
                  <span
                    className={`current-value ${
                      empty(pageData["error_msg"])
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {pageData["personal_referrals"]}
                  </span>
                  <span className="text-success"> / </span>
                  <span className="destination-value text-success">
                    {pageData["destination_personal_referrals"]}
                  </span>
                  <span
                    className={`pl-3 text-danger ${
                      empty(pageData["error_msg"]) ? "hidden" : ""
                    }`}
                  >
                    {pageData["error_msg"]}
                  </span>
                  <span className="pl-3">
                    <i
                      className={`text-bold ${
                        empty(pageData["error_msg"])
                          ? "text-success"
                          : "text-danger"
                      } ${
                        empty(pageData["error_msg"]) ? "ti-check" : "ti-close"
                      }`}
                    ></i>
                  </span>
                </h4>

                <h4
                  className={`text-normal personal-referrals mb-4 ${
                    intval(pageData["next_rank_info"]["rank_no"]) < 8
                      ? ""
                      : "hidden"
                  }`}
                >
                  Additional Requirements:{" "}
                  <span className="destination-value text-success">
                    {get_data_value(pageData["next_rank_info"], "description")}
                  </span>
                  <span
                    className={`pl-3 text-danger ${
                      empty(pageData["missing_rank_message"]) ? "hidden" : ""
                    }`}
                  >{`(You need ${pageData["missing_rank_message"]})`}</span>
                  <span className="pl-3">
                    <i
                      className={`text-bold ${
                        empty(pageData["missing_rank_message"])
                          ? "text-success"
                          : "text-danger"
                      } ${
                        empty(pageData["missing_rank_message"])
                          ? "ti-check"
                          : "ti-close"
                      }`}
                    ></i>
                  </span>
                </h4>
                <h4
                  className={`text-normal personal-referrals mb-4 ${
                    intval(pageData["next_rank_info"]["rank_no"]) < 8
                      ? "hidden"
                      : ""
                  }`}
                >
                  Additional Requirements:{" "}
                  <span className="destination-value text-success">None</span>
                </h4>

                <div className="lane-box">
                  {pageData["tree_info"].map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-3">
                        <h4 className="text-normal lane-max mb-3">
                          Lane{index + 1}:{" "}
                          <span
                            className={`current-value ${
                              intval(
                                pageData["tree_info"][index][
                                  "active_member_cnt"
                                ]
                              ) >= pageData["next_rank_info"]["line_max"][index]
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {pageData["tree_info"][index]["active_member_cnt"]}
                          </span>
                          <span className="text-success"> / </span>
                          <span className="destination-value text-success">
                            {pageData["next_rank_info"]["line_max"][index]}
                          </span>
                          <span className="pl-3">
                            <i
                              className={`text-bold ${
                                intval(
                                  pageData["tree_info"][index][
                                    "active_member_cnt"
                                  ]
                                ) >=
                                pageData["next_rank_info"]["line_max"][index]
                                  ? "text-success ti-check"
                                  : "text-danger ti-close"
                              }`}
                            ></i>
                          </span>
                        </h4>
                      </div>
                      <div className="col-md-9">
                        <h4 className="text-normal lane-qualifying mb-3">
                          Qualifying:{" "}
                          <span
                            className={`current-value ${
                              item["percent"] >= 100 * RULE_PERCENT
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {item["percent"]}%
                          </span>
                          <span className="text-success"> / </span>
                          <span className="destination-value text-success">
                            {RULE_PERCENT * 100}%
                          </span>
                          <span className="pl-3">
                            <i
                              className={`text-bold ${
                                item["percent"] >= 100 * RULE_PERCENT
                                  ? "text-success ti-check"
                                  : "text-danger ti-close"
                              }`}
                            ></i>
                          </span>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`block ${
          empty(get_data_value(pageData, "all_users_in_tree")) ? "hidden" : ""
        }`}
      >
        <UserActiveListPage pageData={pageData} />
      </div>
    </div>
  );
};

export default UserMarketingPage;
