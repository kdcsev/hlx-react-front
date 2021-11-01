import {
  ROUTE_REGISTER,
  ROUTE_ROOT,
  ROUTE_USER_DASHBOARD,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { isMobile } from "utils/GlobalFunctions";
import { HOME_MENU_ITEMS } from "./HomeMenuItems";

const HomeNavbar = () => {
  const appDataStore = useSelector((x) => x.appDataStore);
  let is_mobile = isMobile();
  //console.log("is_mobile", is_mobile);
  return (
    <div>
      <nav className={`main-nav stick-fixed ${is_mobile ? "mobile-on" : ""}`}>
        <div className="full-wrapper relative clearfix">
          <div className="nav-logo-wrap local-scroll">
            <Link to={ROUTE_ROOT} className="logo">
              <img src="/assets/home/images/higherlevelfx_logo_tm.png" alt="" />
            </Link>
          </div>
          <div
            className="mobile-nav"
            role="button"
            style={{ height: "75px", lineHeight: "75px", width: "75px" }}
          >
            <i className="fa fa-bars"></i>
            <span className="sr-only">Menu</span>
          </div>
          <div className="inner-nav desktop-nav">
            <ul className="clearlist local-scroll">
              {HOME_MENU_ITEMS.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    to={menuItem.route}
                    activeclassname="active"
                    className={`${
                      appDataStore.current_route === menuItem.route
                        ? "active"
                        : ""
                    }`}
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}

              <li className="t-show-desktop">
                <a href="#">&nbsp;</a>
              </li>
              <li>
                <Link to={ROUTE_REGISTER} activeclassname="active">
                  <span className="btn btn-mod btn-circle">
                    Start Your 7 Day Trial
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
