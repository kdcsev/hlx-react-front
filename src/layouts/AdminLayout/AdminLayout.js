import { ROUTE_LOGIN } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { empty, get_data_value, is_empty } from "utils/GlobalFunctions";
import "./AdminLayout.css";

import { SOCKET_SERVER_URL } from "config/CONSTANTS";
import io from "socket.io-client";
import { updateSocket } from "redux/actions/socketActions";
import AdminLoader from "./Includes/AdminLoader";
import AdminSidebar from "./Includes/AdminSidebar";
import AdminHeader from "./Includes/AdminHeader";
import AdminFooter from "./Includes/AdminFooter";
import ConfirmLogoutModal from "components/ConfirmLogoutModal/ConfirmLogoutModal";

const AdminLayout = (props) => {
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
      getAdminNotificationData(socket);
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
    socket.off("get_admin_notification_data");
    socket.on("get_admin_notification_data", (data) => {
      console.log("-------------get_admin_notification_data---------", data);
      dispatch(
        updateSocket({
          admin_notification_data: data,
        })
      );
    });
  };
  const getAdminNotificationData = (socket) => {
    socket.emit("get_admin_notification_data", { ...socketHeader });
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
    let is_admin = userDataStore["is_admin"];
    return !is_empty(token) && is_admin === "1"; //if valid logged in (for admin)
  };

  if (!checkLogin()) {
    return <Redirect to={ROUTE_LOGIN} />;
  }
  return (
    <div>
      <div
        className={`user-page admin-page ${
          appDataStore.user_menu_collapsed ? "sidebar-icon-only" : ""
        }`}
      >
        <AdminLoader></AdminLoader>
        <div className="container-scroller">
          <AdminSidebar askLogout={askLogout}></AdminSidebar>
          <div className="container-fluid page-body-wrapper">
            <AdminHeader askLogout={askLogout}></AdminHeader>
            <div className="main-panel">
              <div className="content-wrapper">
                <div>{props.children}</div>
              </div>
              <AdminFooter></AdminFooter>
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
export default AdminLayout;
