import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_ACADEMY, ROUTE_USER_WALLET } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserMarketingPageDetail } from "services/userMarketingService";
import {
  apiGetUserWalletPageDetail,
  apiUserRequestWithdrawal,
} from "services/userWalletService";
import { get_data_value, showToast, show_loading } from "utils/GlobalFunctions";
import UserDataTable from "./inc/UserDataTable";
import UserPayoutListTable from "./inc/UserPayoutListTable";
import UserWithdrawalListTable from "./inc/UserWithdrawalListTable";
import WithdrawalRequestModal from "./inc/WithdrawalRequestModal";
import "./UserWalletPage.css";

const currentPageTitle = "Wallet";
const UserWalletPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_WALLET,
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
    payout_list: [],
    withdraw_list: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserWalletPageDetail()
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

  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const onClickWithdrawRequest = () => {
    setShowWithdrawalModal(true);
  };
  const submitWithdrawalRequest = (params) => {
    console.log("params", params);
    show_loading(true);
    apiUserRequestWithdrawal(params)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowWithdrawalModal(false);
          getData();
          showToast(
            "Payout requested successfully.<br/>Please wait for approval!",
            "success"
          );
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
    <div className="user-wallet-page">
      <div className={`row`}>
        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">Wallet</h4>
              <div className="card-content">
                <h3 className="card-title mb-0">
                  <span className="text-success text-bold">
                    ${get_data_value(pageData["user"], "balance")}
                  </span>
                  <span className="balance-label">Available Funds</span>
                </h3>
                <div className="action-btn-group mt-4">
                  <button
                    className="btn btn-primary btn-request-payout mr-2"
                    onClick={(e) => {
                      onClickWithdrawRequest();
                    }}
                  >
                    Request Withdrawal
                  </button>
                  <img
                    src="/assets/global/img/paypal.png"
                    className="img-responsive paypal-logo"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`row`}>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Weekly Residuals</h4>
              <div className="card-content">
                <div className="datatable-wrapper">
                  <UserPayoutListTable initialTableData={pageData['payout_list']} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Withdraw History</h4>
              <div className="card-content">
                <div className="datatable-wrapper">
                  <UserWithdrawalListTable initialTableData={pageData['withdraw_list']} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WithdrawalRequestModal
        modalTitle={`Confirm Withdrawal Request`}
        isVisible={showWithdrawalModal}
        setVisibleModal={setShowWithdrawalModal}
        pageData={pageData}
        submitModalData={submitWithdrawalRequest}
        modalClass="user-page confirm-withdrawal-request-modal"
      />
    </div>
  );
};

export default UserWalletPage;
