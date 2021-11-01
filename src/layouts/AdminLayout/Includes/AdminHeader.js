import {
  ROUTE_ADMIN_PROFILE,
  ROUTE_LOGIN,
  ROUTE_USER_LOGOUT,
  ROUTE_USER_PROFILE,
  ROUTE_USER_TICKET_DETAIL,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import {
  empty,
  get_data_value,
  intval,
  is_empty,
  showToast,
  show_dialog,
} from "utils/GlobalFunctions";

const AdminHeader = (props) => {
  const { askLogout } = props;
  //console.log('socket',socket)
  const appDataStore = useSelector((x) => x.appDataStore);
  const userDataStore = useSelector((x) => x.userDataStore);

  //////////////////////////socket part////////////////////////////////
  const socketStore = useSelector((x) => x.socketStore);
  const socket = socketStore["socket"];
  const admin_notification_data = socketStore["admin_notification_data"];
  useEffect(() => {
    if (!empty(admin_notification_data)) {
      console.log(
        "------------socketStore(AdminHeader page)---------------",
        admin_notification_data
      );
      //addSocketListener();
      //getFeedList();
    }
  }, [admin_notification_data]);

  const token = get_data_value(userDataStore, "token");
  const socketHeader = { token: token };
  ///////////////////////////end socket part/////////////////////////////

  const dispatch = useDispatch();
  const toggleUserSideBar = () => {
    dispatch(
      UpdateAppData({
        user_menu_collapsed: appDataStore.user_menu_collapsed ? false : true,
      })
    );
  };
  const toggleMUserSideBar = () => {
    console.log("m_user_menu_collapsed");
    dispatch(
      UpdateAppData({
        m_user_menu_collapsed: appDataStore.m_user_menu_collapsed
          ? false
          : true,
      })
    );
  };
  const history = useHistory();
  const onLogout = () => {
    askLogout()
  };

  return (
    <div>
      <nav className="navbar p-0 d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
            onClick={toggleUserSideBar}
          >
            <span className="ti-align-left"></span>
          </button>
          <div className="navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <span className="navbar-brand brand-logo">
              {appDataStore.currentPageTitle}
            </span>
            <span className="navbar-brand brand-logo-mini">HLX</span>
          </div>
          <ul className="navbar-nav navbar-nav-right ml-auto">
            {/* <li className="hidden nav-item nav-search d-none d-sm-flex">
              <div className="nav-link d-flex justify-content-center align-items-center">
                <input
                  type="text"
                  className="form-control hidden"
                  id="search-field"
                  placeholder="Search..."
                />
                <i className="ti-search mx-0" id="search-icon"></i>
              </div>
            </li> */}
            <li className="nav-item dropdown">
              <button
                className="a-btn nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                id="messageDropdown"
                data-toggle="dropdown"
              >
                <i className="ti-comment mx-0"></i>
                <span
                  className="notification-count badge badge-pill badge-primary"
                  data-value={
                    !empty(admin_notification_data) &&
                    !empty(admin_notification_data["unread_ticket_list"])
                      ? admin_notification_data["unread_ticket_list"].length
                      : ""
                  }
                >
                  {!empty(admin_notification_data) &&
                  !empty(admin_notification_data["unread_ticket_list"])
                    ? admin_notification_data["unread_ticket_list"].length > 10
                      ? "10+"
                      : admin_notification_data["unread_ticket_list"].length
                    : ""}
                </span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header hidden">
                  Tickets
                </p>
                <div className="notification-list custom-scroller">
                  {!empty(admin_notification_data) &&
                    !empty(admin_notification_data["unread_ticket_list"]) &&
                    admin_notification_data["unread_ticket_list"].map(
                      (item, index) => (
                        <Link
                          className="notification-item dropdown-item preview-item"
                          to={`/admin/ticket/detail/${item["id"]}`}
                          key={item["id"]}
                        >
                          <div className="preview-item-content flex-grow">
                            <h5 className="notification-content text-emphasis preview-subject font-weight-normal">
                              {item["title"]}
                            </h5>
                            <p className="notification-content text-emphasis font-weight-light small-text text-white-80 mb-0">
                              {item["msg_info"]["message"]}
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                </div>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <button
                className="a-btn nav-link"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <span className="hi-text">
                  Hi,{" "}
                  {userDataStore.admin_type === "assistant"
                    ? "Assistant"
                    : "Admin"}
                </span>
                &nbsp; &nbsp;
                <img
                  src={`/assets/global/img/${
                    userDataStore["admin_type"] === "assistant"
                      ? "assistant-avatar.png"
                      : "admin-avatar.jpg"
                  }`}
                  alt="profile"
                />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <Link className="dropdown-item" to={ROUTE_ADMIN_PROFILE}>
                  <i className="ti-user text-primary"></i>
                  Profile
                </Link>
                <button
                  className="a-btn dropdown-item btn-logout"
                  to={ROUTE_USER_LOGOUT}
                  title="logout"
                  onClick={onLogout}
                >
                  <i className="ti-new-window text-primary"></i>
                  Logout
                </button>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center m-btn-toggle-sidebar"
            type="button"
            data-toggle="offcanvas"
            onClick={toggleMUserSideBar}
          >
            <span className="ti-menu"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(AdminHeader);
