import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { ROUTE_ROOT } from "navigation/CONSTANTS";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";

const NotFoundPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    let currentPageTitle = "Not Found";
    dispatch(
      UpdateAppData({
        m_user_menu_collapsed: true,
      })
    );
  };

  useEffect(() => {
    initPage();
  });

  return (
    <div>
      <style>{`
        .user-page .sidebar .nav{
          display:none;
        }
      `}</style>
      <div className="user-not-found-page">
        Page Not Found
      </div>
    </div>
  );
};

export default NotFoundPage;
