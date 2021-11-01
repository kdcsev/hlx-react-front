import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import {
  ROUTE_USER_ACADEMY,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_WALLET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserMarketingPageDetail } from "services/userMarketingService";
import { apiGetUserPaymentListPageDetail } from "services/userPaymentService";
import {
  apiGetUserWalletPageDetail,
  apiUserRequestWithdrawal,
} from "services/userWalletService";
import { get_data_value, showToast, show_loading } from "utils/GlobalFunctions";
import UserPaymentListTable from "./inc/UserPaymentListTable";
 

const currentPageTitle = "Payment History";
const UserPaymentListPage = () => {
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
  const getData = () => {
    show_loading(true);
    apiGetUserPaymentListPageDetail()
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
    <div className="user-payment-page">
      <div className={`row`}>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="datatable-wrapper">
                  <UserPaymentListTable
                    initialTableData={pageData["payment_list"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentListPage;
