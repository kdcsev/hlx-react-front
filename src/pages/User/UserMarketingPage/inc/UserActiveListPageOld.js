import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import {
  ROUTE_USER_ACADEMY,
  ROUTE_USER_MARKETING,
  ROUTE_USER_TICKET_DETAIL,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserMarketingPageDetail,
  apiGetUserMarketingRankDetail,
} from "services/userMarketingService";
import Select from "react-select";
// import "react-select-2/dist/css/react-select-2.css";

import {
  empty,
  get_data_value,
  intval,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import UserRankDetailModal from "./UserRankDetailModal";

const currentPageTitle = "Affiliate Only Section";
const UserActiveListPageOld = (props) => {
  const { pageData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    updateUserSelectList();
  }, [pageData]);
  //const history = useHistory();

  var userList = [];
  var defaultUserList = [{ value: 0, label: "All" }];

  const updateUserSelectList = () => {
    userList = defaultUserList;
    for (var key in pageData["all_users_in_tree"]) {
      var item = pageData["all_users_in_tree"][key];
      var option_item = { value: item["id"], label: item["user_name"] };
      userList.push(option_item);
    }
    setSelectUserList(userList);
  };

  const [selectUserList, setSelectUserList] = useState(userList);
  const [selectedUserID, setSelectedUserID] = useState(0);

  function onUserChange(val) {
    console.log("Selected: ", val);
    setSelectedUserID(get_data_value(val, "value", 0));
  }

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: "#f16857",
          color: "white",
        },
        ":hover": {
          ...styles[":active"],
          backgroundColor: "#f16857",
          color: "white",
        },
      };
    },
    input: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
    placeholder: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
  };

  const defaultUserRankDetail = {
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
  const [selectedUserItem, setSelectedUserItem] = useState({});
  const [selectedUserRankDetail, setSelectedUserRankDetail] = useState(
    defaultUserRankDetail
  );
  const [showRankModal, setShowRankModal] = useState(false);

  const onClickUserRank = (item) => {
    console.log("item", item);

    setSelectedUserItem(item);
    var user_id = item["id"];
    show_loading(true);
    apiGetUserMarketingRankDetail(user_id)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setSelectedUserRankDetail(api_res.data);
          setShowRankModal(true);
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
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="card-content affiliate-only-screen">
              <div className="block padding-bottom-5 padding-top-5">
                <h4 className="text-normal mb-3">Active users in your tree:</h4>
              </div>
              <div className="divider-1 mb-4"></div>
              <div className="row">
                <div className="col-md-6 text-left m-text-center">
                  <form className="navbar-form margin-0" role="search">
                    <div
                      className="form-group form-search is-empty"
                      style={{
                        position: "relative",
                        maxWidth: "360px",
                        paddingRight: "50px",
                      }}
                    >
                      <Select
                        className="select2-box basic-single"
                        classNamePrefix="select"
                        defaultValue={defaultUserList[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={selectUserList}
                        styles={colorStyles}
                        onChange={onUserChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive padding-bottom-20">
                    <table
                      id="datatables"
                      className="table "
                      cellSpacing="0"
                      width="100%"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>USERNAME</th>
                          <th>STATUS</th>
                          <th>LANE</th>
                          <th>RANK</th>
                          <th>GO TO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData["all_users_in_tree"].map((item, index) => (
                          <tr
                            key={index}
                            data-user-id={item["id"]}
                            data-user-name={item["user_name"]}
                            data-user-type={item["user_type"]}
                            className={`${
                              selectedUserID === item["id"]
                                ? ""
                                : selectedUserID !== 0
                                ? "hidden"
                                : ""
                            }`}
                          >
                            <td>{item["user_name"]}</td>
                            <td>
                              <span
                                className={item["status_class"]}
                                data-user-type={item["user_type"]}
                              >
                                {item["status"]}
                              </span>
                            </td>
                            <td>{item["lane_number"]}</td>
                            <td>
                              <button
                                className={`a-btn btn-view-user-rank-info btn-user-rank1 badge badge-sm badge-success badge-rounded text-center ${
                                  intval(item["user_type"]) === 1
                                    ? ""
                                    : "hidden"
                                }`}
                                style={{
                                  paddingLeft: "1rem",
                                  paddingRight: "1rem",
                                }}
                                onClick={(e) => {
                                  onClickUserRank(item);
                                }}
                              >
                                {get_data_value(
                                  item["rank_info"],
                                  "rank_name",
                                  "NO RANK"
                                )}
                              </button>
                              <span
                                className={`text-success ${
                                  intval(item["user_type"]) === 1
                                    ? "hidden"
                                    : ""
                                }`}
                              >
                                NONE
                              </span>
                            </td>
                            <td>
                              <Link
                                className="a-btn badge badge-sm badge-success badge-rounded text-center"
                                to={`/user/team/detail/${item["id"]}`}
                                style={{ minWidth: "50px" }}
                              >
                                GO
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserRankDetailModal
        modalTitle={get_data_value(selectedUserItem, "user_name")}
        isVisible={showRankModal}
        setVisibleModal={setShowRankModal}
        modalInitialData={selectedUserRankDetail}
        submitModalData=""
        modalClass="user-page marketing-user-rank-modal"
      />
    </div>
  );
};

export default UserActiveListPageOld;
