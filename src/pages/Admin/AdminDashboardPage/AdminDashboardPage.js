import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_USERS,
  ROUTE_USER_ACADEMY,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_WALLET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { get_data_value, showToast, show_loading } from "utils/GlobalFunctions";
import AdminUserListTable from "./inc/AdminUserListTable";

const currentPageTitle = "Dashboard";
const AdminDashboardPage = () => {

  return <Redirect to={ROUTE_ADMIN_USERS} />;

  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_PAYMENT,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, []);
  //const history = useHistory();
  const defaultPageData = {
    user: {},
    payment_list: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {};

  return (
    <>
      <AdminLayout>
        <div className="user-payment-page">
          <div className={`row`}>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title t-show-mobile">
                    {currentPageTitle}
                  </h4>
                  <div className="card-content">
                    <div className="datatable-wrapper">
                      <AdminUserListTable
                        initialTableData={pageData["payment_list"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardPage;
