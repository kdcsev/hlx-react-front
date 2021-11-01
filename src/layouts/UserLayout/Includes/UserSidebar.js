import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER_MENU_ITEMS } from "./UserMenuItems";
import { UpdateAppData } from "redux/actions/appActions";
import {
  USER_LEVEL_AFFILIATE,
  USER_LEVEL_ALL,
  USER_LEVEL_CUSTOMER,
} from "navigation/CONSTANTS";
import { empty, get_data_value } from "utils/GlobalFunctions";

const UserSidebar = (props) => {
  const { askLogout } = props;
  const appDataStore = useSelector((x) => x.appDataStore);
  const user = useSelector((x) => x.userDataStore);
    //////////////////////////socket part////////////////////////////////
    const socketStore = useSelector((x) => x.socketStore);
    const socket = socketStore["socket"];
    const user_notification_data = socketStore["user_notification_data"];
    useEffect(() => {
      if (!empty(user_notification_data)) {
        console.log(
          "------------socketStore(UserSidebar page)---------------",
          user_notification_data
        );
        //addSocketListener();
        //getFeedList();
      }
    }, [user_notification_data]);
  
    const token = get_data_value(user, "token");
    const socketHeader = { token: token };
    ///////////////////////////end socket part/////////////////////////////

  let sideMenuItems = [];
  // USER_MENU_ITEMS.map(function(menuItem, index){
  //   if(user['user_type'] === 0){
  //     if(sideMenuItems['level'] === USER_LEVEL_ALL || sideMenuItems['level'] === USER_LEVEL_CUSTOMER){
  //       sideMenuItems.push(menuItem)
  //     }
  //   }else if(user['user_type'] === 1){
  //     if(sideMenuItems['level'] === USER_LEVEL_ALL || sideMenuItems['level'] === USER_LEVEL_AFFILIATE){
  //       sideMenuItems.push(menuItem)
  //     }
  //   }else if(user['user_type'] === 2){
  //     if(sideMenuItems['level'] === USER_LEVEL_ALL || sideMenuItems['level'] === USER_LEVEL_AFFILIATE){
  //       sideMenuItems.push(menuItem)
  //     }
  //   }
  // });
  for (let i = 0; i < USER_MENU_ITEMS.length; i++) {
    let menuItem = USER_MENU_ITEMS[i];
    if (user["user_type"] === 0) {
      if (
        menuItem["level"] === USER_LEVEL_ALL ||
        menuItem["level"] === USER_LEVEL_CUSTOMER
      ) {
        sideMenuItems.push(menuItem);
      }
    } else if (user["user_type"] === 1) {
      if (
        menuItem["level"] === USER_LEVEL_ALL ||
        menuItem["level"] === USER_LEVEL_AFFILIATE
      ) {
        sideMenuItems.push(menuItem);
      }
    } else if (user["user_type"] === 2) {
      if (
        menuItem["level"] === USER_LEVEL_ALL ||
        menuItem["level"] === USER_LEVEL_AFFILIATE
      ) {
        sideMenuItems.push(menuItem);
      }
    }
  }

  return (
    <nav className="sidebar" id="sidebar">
      <div
        className={`sidebar-content-wrapper sidebar-offcanvas custom-scroller ${
          appDataStore.m_user_menu_collapsed ? "" : "active"
        }`}
      >
        <ul className="nav">
          {sideMenuItems.map((menuItem, index) => (
            <li
              key={index}
              className={`nav-item  ${
                appDataStore.current_route === menuItem.route ? "active" : ""
              }`}
            >
              <Link
                to={menuItem.route}
                activeclassname="active"
                className="nav-link"
              >
                <i className={menuItem.icon}></i>
                <span className="menu-title">{menuItem.title}</span>
                {index === 0 && (
                  <span className={`badge badge-pill badge-primary`}>{!empty(user_notification_data) &&
                    !empty(user_notification_data["unread_feed_list"])
                      ? user_notification_data["unread_feed_list"].length
                      : ""}</span>
                )}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <div className="nav-link a-btn" onClick={(e)=>{askLogout()}}>
              <i className="mdi mdi-logout-variant"></i>
              <span className="menu-title">Log out</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserSidebar;
