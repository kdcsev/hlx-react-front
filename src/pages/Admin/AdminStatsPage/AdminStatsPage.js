import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_ANNOUNCEMENT,
  ROUTE_ADMIN_PROFILE,
  ROUTE_ADMIN_STATS,
  ROUTE_USER_PROFILE,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiSubmitAdminAnnouncement } from "services/adminAnnouncementService";
import {
  apiAdminGetProfileInfo,
  apiAdminUpdateProfile,
} from "services/adminCommonService";
import { apiGetAdminStatsPageDetail } from "services/adminStatsService";
import { apiGetAdminUsersPageDetail } from "services/adminUsersService";
import {
  apiUserCancelAffiliate,
  apiUserCancelMembership,
  apiUserUpdateCardInfo,
  apiUserUpdateProfile,
} from "services/userProfileService";
import {
  empty,
  get_data_value,
  isEmpty,
  priceFormat,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";

const currentPageTitle = "Company Stats";
const AdminStatsPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_STATS,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, []);

  const defaultPageData = {
    user: {},
    company_balance:0,
    total_revenue:0,
    member_stats:{}
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetAdminStatsPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  return (
    <>
      <AdminLayout>
        <div className="admin-stats-page">
          <h4 className="subtitle mb-3">Finances:</h4>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total amount of money on user's credit wallet:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">${priceFormat(parseFloat(pageData['company_balance']))}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total monthly revenue:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">${priceFormat(parseFloat(pageData['total_revenue']))}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="subtitle mb-3">Users Information:</h4>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total HLX Customers:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['active_customer_cnt']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total HLX Affiliates:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['active_affiliate_only_cnt']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total HLX Both (Customer & Affiliate):</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['both_cnt']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Total HLX Users:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['total_users']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Users with Free Memberships:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['free_member_cnt']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="subtitle mb-3">Cancellation in Progress:</h4>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Cancelled to Affiliate:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['cancelled_affiliate_cnt']}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>Cancelled to Inactive:</h5>
                      <h4 className="text-success text-bold mt-3 mb-0">{pageData['member_stats']['cancelled_customer_cnt']}</h4>
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

export default AdminStatsPage;
