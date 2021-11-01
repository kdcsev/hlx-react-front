import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_ACADEMY } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";

const currentPageTitle = "Higher Level Academy";
const UserAdvancedAcademyPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_ACADEMY,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
  });

  const [visibleModal, setVisibleModal] = useState(false);

  const showConfirm = () => {
    setVisibleModal(true);
  };

  const [hasActiveLicense, setHasActiveLicense] = useState(false);

  return (
    <div className="user-advanced-academy-page">
    </div>
  );
};

export default UserAdvancedAcademyPage;
