import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import {
  ROUTE_ADMIN_TEAM,
  ROUTE_USER_DASHBOARD,
  ROUTE_USER_TEAM,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserAcademyPageDetail } from "services/userAcademyService";

import {
  empty,
  get_data_value,
  intval,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import Select from "react-select";
import { BASE_FRONT_URL } from "config/CONSTANTS";
import AdminTankUserListModal from "./inc/AdminTankUserListModal";
import { apiAdminGetTreeUpLevelUser, apiGetAdminTeamPageDetail } from "services/adminTeamService";
import AdminLayout from "layouts/AdminLayout/AdminLayout";

const currentPageTitle = "MLM Tree";
const AdminTeamPage = (props) => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_TEAM,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, [props]);
  const history = useHistory();
  const defaultPageData = {
    user: {},
    user_tree: [],
    check_in_holding_tank: "",
    all_users_in_tree: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    const rootUserId = getRootUserId();
    setSelectedUserID(rootUserId);
    apiGetAdminTeamPageDetail(rootUserId)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          updateUserSelectList(api_res.data["all_users_in_tree"]);
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const getRootUserId = () => {
    let rootUseId = 0;
    try {
      if (!empty(props.match.params.userid)) {
        rootUseId = props.match.params.userid;
      }
    } catch (e) {}
    return rootUseId;
  };

  /////////////////////////////////////////////// select box///////////////////////////////////////////
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
  var userList = [];
  var defaultUserList = [{ value: 0, label: "Root User" }];
  const updateUserSelectList = (all_users_in_tree) => {
    userList = defaultUserList;
    for (var key in all_users_in_tree) {
      var item = all_users_in_tree[key];
      var option_item = { value: item["id"], label: item["user_name"] };
      userList.push(option_item);
    }
    setSelectUserList(userList);
  };

  const [selectUserList, setSelectUserList] = useState(userList);
  const [selectedUserID, setSelectedUserID] = useState(0);

  function onUserChange(val) {
    console.log("Selected: ", val);
    //setSelectedUserID(get_data_value(val, "value", 0));
    let child_user_id = get_data_value(val, "value", 0);
    history.push("/admin/team/detail/" + child_user_id);
  }
  ///////////////////////////////////////////////end select box///////////////////////////////////////////

  const goDownLine = (item) => {
    console.log("item", item);
    const child_user_id = item["user_info"]["id"];
    history.push("/admin/team/detail/" + child_user_id);
  };
  const backToTop = () => {
    history.push(ROUTE_ADMIN_TEAM);
  };
  const backToUp = () => {
    console.log('selectedUserID',selectedUserID)
    if(empty(selectedUserID)){
      return false;
    }
    show_loading(true);
    apiAdminGetTreeUpLevelUser(selectedUserID)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          dispatch(updateUser(api_res.data["user"]));
          let up_user = api_res.data['up_user'];
          if(up_user['id']===1) {
            history.push(ROUTE_ADMIN_TEAM);
          }else{
            history.push("/admin/team/detail/" + up_user['id']);
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

  const [tankUserList, setTankUserList] = useState([]);
  const [showTankModal, setShowTankModal] = useState(false);

  const [selected_parent_user_id, set_selected_parent_user_id] = useState(0);
  const [selected_tree_position, set_selected_tree_position] = useState(0);

  const generate_user_subtree_view = (child_list, parent_user_id) => {
    const user_subtree_view = child_list.map((item, index) => {
      return (
        <div
          className={`main-tree-box main-tree-box-${intval(item["level"])}`}
          data-level={`${intval(item["level"])}`}
          data-index={`${index}`}
          key={`${item["level"] + "-" + index}`}
        >
          <div
            className={`tree-user-info-box ${
              !empty(item["child_list"]) ? "" : " last-tree-user"
            }`}
          >
            <div
              className={`user-info-wrapper text-center ${
                intval(item["user_info"]["id"]) > 0 ? "" : "empty-user-wrapper"
              }`}
              data-level={`${intval(item["level"])}`}
              data-user-id={`${intval(item["user_info"]["id"])}`}
              data-parent-user-id={`${parent_user_id}`}
            >
              <div className="user-avatar-wrapper">
                <div className="user-avatar-box">
                  <img src={`${item["user_info"]["user_image"]}`} alt="" />
                </div>
              </div>
              <div className="user-name-wrapper">
                <div className="user-name-box text-emphasis">
                  {item["user_info"]["user_name"]}
                </div>
              </div>
              <button
                className={`btn-show-more-wrapper text-white ${
                  intval(item["level"]) > 0 &&
                  item["user_info"]["has_downline"] == "1"
                    ? ""
                    : "hidden"
                }`}
                title="View Downline"
                onClick={(e) => {
                  goDownLine(item);
                }}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          {!empty(item["child_list"]) && (
            <div
              className="tree-child-container"
              data-level={`${intval(item["level"])}`}
              data-parent-user-id={`${item["user_info"]["id"]}`}
            >
              {generate_user_subtree_view(
                item["child_list"],
                item["user_info"]["id"]
              )}
            </div>
          )}
        </div>
      );
    });
    return user_subtree_view;
  };

  const user_tree_view = pageData["user_tree"].map((item, index) => {
    return (
      <div
        className={`main-tree-box main-tree-box-${intval(item["level"])}`}
        style={{ width: "900px" }}
        data-level={`${intval(item["level"])}`}
        data-index={`${index}`}
        key={`${item["level"] + "-" + index}`}
      >
        <div
          className={`tree-user-info-box ${
            !empty(item["child_list"]) ? "" : " last-tree-user"
          }`}
        >
          <div
            className={`user-info-wrapper text-center ${
              intval(item["user_info"]["id"]) > 0 ? "" : "empty-user-wrapper"
            }`}
            data-level={`${intval(item["level"])}`}
            data-user-id={`${intval(item["user_info"]["id"])}`}
          >
            <div className="user-avatar-wrapper">
              <div className="user-avatar-box">
                <img src={`${item["user_info"]["user_image"]}`} alt="" />
              </div>
            </div>
            <div className="user-name-wrapper">
              <div className="user-name-box text-emphasis">
                {item["user_info"]["user_name"]}
              </div>
            </div>
            <button
              className={`btn-show-more-wrapper text-white ${
                intval(item["level"]) > 0 &&
                item["user_info"]["has_downline"] == "1"
                  ? ""
                  : "hidden"
              }`}
              title="View Downline"
              onClick={(e) => {
                goDownLine(item);
              }}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        {!empty(item["child_list"]) && (
          <div
            className="tree-child-container"
            data-level={`${intval(item["level"])}`}
            data-parent-user-id={`${item["user_info"]["id"]}`}
          >
            {generate_user_subtree_view(
              item["child_list"],
              item["user_info"]["id"]
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      <AdminLayout>
        <div className="user-team-page">
          <div className={`row`}>
            <div className="col-md-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title t-show-mobile">
                    {currentPageTitle}
                  </h4>
                  <div className="card-content">
                    <div className="row">
                      <div className="col-md-6 text-left m-text-center">
                        <div
                          className="form-group form-search is-empty"
                          style={{
                            position: "relative",
                            maxWidth: "360px",
                            paddingRight: "50px",
                          }}
                        >
                          {selectedUserID === 0 && (
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
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 text-right m-text-center">
                        <img
                          className="avatar-list-heading"
                          src="/assets/global/img/avatar-heading-1.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    {selectedUserID !== 0 && (
                      <div className="row">
                        <div className="col-md-12 margin-top-20 text-center">
                          <button
                            className="btn btn-primary btn-back-top mr-2"
                            onClick={(e) => {
                              backToTop();
                            }}
                          >
                            Back to top
                          </button>
                          <button
                            className="btn btn-primary btn-back-up"
                            onClick={(e) => {
                              backToUp();
                            }}
                          >
                            Back up one level
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mlm-tree-box">{user_tree_view}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`row`}></div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminTeamPage;
