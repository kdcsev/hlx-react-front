import { ROUTE_LOGIN, ROUTE_USER_FEED } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { empty, get_data_value, is_empty } from "utils/GlobalFunctions";
import UserFooter from "./Includes/UserFooter";
import UserHeader from "./Includes/UserHeader";
import UserLoader from "./Includes/UserLoader";
import UserSidebar from "./Includes/UserSidebar";
import "./UserLayout.css";

import { SOCKET_SERVER_URL } from "config/CONSTANTS";
import io from "socket.io-client";
import { updateSocket } from "redux/actions/socketActions";
import Marquee from "react-fast-marquee";
import ConfirmLogoutModal from "components/ConfirmLogoutModal/ConfirmLogoutModal";

const UserLayout = (props) => {
  //console.log('props', props);
  const dispatch = useDispatch();

  const appDataStore = useSelector((x) => x.appDataStore);
  const userDataStore = useSelector((x) => x.userDataStore);
  const socketStore = useSelector((x) => x.socketStore);
  //console.log("socketStore", socketStore);

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ///////////////////////////////////socket part///////////////////////////////////////////
  const token = get_data_value(userDataStore, "token");
  const socketHeader = { token: token };

  useEffect(() => {
    if (!empty(token)) {
      const socket = io(SOCKET_SERVER_URL);

      socket.on("connnection", () => {
        console.log("-------------connected to server---------------");
      });
      addSocketListener(socket);
      getUserNotificationData(socket);
      socket.on("disconnect", () => {
        console.log("---------------Socket disconnecting-------------------");
        // dispatch(
        //   updateSocket({
        //     socket: null,
        //   })
        // );
      });

      dispatch(
        updateSocket({
          socket: socket,
        })
      );
      return () => socket.close();
    } else {
      return () => false;
    }
  }, []);

  const addSocketListener = (socket) => {
    socket.off("get_user_notification_data");
    socket.on("get_user_notification_data", (data) => {
      console.log("-------------get_user_notification_data---------", data);
      dispatch(
        updateSocket({
          user_notification_data: data,
        })
      );
      dispatch(
        UpdateAppData({
          license_cancelled_message: data["license_cancelled_message"],
        })
      );
    });

    socket.off("submit_feed_item");
    socket.on("submit_feed_item", (data) => {
      console.log('---------on submit_feed_item--------------')
      socket.emit("get_user_notification_data", { ...socketHeader });
      if(appDataStore.current_route === ROUTE_USER_FEED) {
        socket.emit("get_feed_list", { ...socketHeader, last_id: 0 });
      }
    });
  };
  const getUserNotificationData = (socket) => {
    socket.emit("get_user_notification_data", { ...socketHeader });
  };
  ///////////////////////////////////end socket part///////////////////////////////////////////

  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const askLogout = () => {
    console.log("ask logout");
    setShowConfirmLogoutModal(true);
  };

  const doLogout = () => {
    console.log("logout");
    setShowConfirmLogoutModal(false);
    history.push(ROUTE_LOGIN);
  };

  const checkLogin = () => {
    let token = get_data_value(userDataStore, "token");
    return !is_empty(token); //if valid token then true else false
  };

  if (!checkLogin()) {
    return <Redirect to={ROUTE_LOGIN} />;
  }
  return (
    <div>
      <div
        className={`user-page ${
          appDataStore.user_menu_collapsed ? "sidebar-icon-only" : ""
        } ${
          !empty(appDataStore.license_cancelled_message) ? "has-top-banner" : ""
        }`}
      >
        <div className="top-banner-bar notify-danger">
          <div className="t-show-mobile">
            <Marquee gradient={false}>{appDataStore.license_cancelled_message}</Marquee>
          </div>
          <div className="text-emphasis t-show-desktop">
            {appDataStore.license_cancelled_message}
          </div>
        </div>

        <UserLoader></UserLoader>
        <div className="container-scroller">
          <UserSidebar askLogout={askLogout}></UserSidebar>
          <div className="container-fluid page-body-wrapper">
            <UserHeader askLogout={askLogout}></UserHeader>
            <div className="main-panel">
              <div className="content-wrapper">
                <div>{props.children}</div>
              </div>
              <UserFooter></UserFooter>
            </div>
          </div>
        </div>
        <ConfirmLogoutModal
          onClickYes={doLogout}
          visibleModal={showConfirmLogoutModal}
          setVisibleModal={setShowConfirmLogoutModal}
          modalClass="user-page confirm-modal"
        />
      </div>
    </div>
  );
};
export default UserLayout;
