import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import {
  ADMIN_LEVEL_ALL,
  ADMIN_LEVEL_ASSISTANT,
  ADMIN_LEVEL_SUPERADMIN,
  USER_LEVEL_AFFILIATE,
  USER_LEVEL_ALL,
  USER_LEVEL_CUSTOMER,
} from "navigation/CONSTANTS";
import { empty, get_data_value } from "utils/GlobalFunctions";
import { ADMIN_MENU_ITEMS } from "./AdminMenuItems";

const AdminSidebar = (props) => {
  const { askLogout } = props;
  const appDataStore = useSelector((x) => x.appDataStore);
  const user = useSelector((x) => x.userDataStore);

  let sideMenuItems = [];
  for (let i = 0; i < ADMIN_MENU_ITEMS.length; i++) {
    let menuItem = ADMIN_MENU_ITEMS[i];
    if (user["admin_type"] === ADMIN_LEVEL_SUPERADMIN) {
      if (
        menuItem["level"] === ADMIN_LEVEL_ALL ||
        menuItem["level"] === ADMIN_LEVEL_SUPERADMIN
      ) {
        sideMenuItems.push(menuItem);
      }
    } else if (user["admin_type"] === ADMIN_LEVEL_ASSISTANT) {
      if (
        menuItem["level"] === USER_LEVEL_ALL ||
        menuItem["level"] === ADMIN_LEVEL_ASSISTANT
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

export default AdminSidebar;
