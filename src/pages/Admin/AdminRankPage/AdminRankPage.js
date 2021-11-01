import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_FEED,
  ROUTE_ADMIN_FEED_DETAIL,
  ROUTE_ADMIN_RANK,
  ROUTE_ADMIN_TICKET,
  ROUTE_ADMIN_USERS,
  ROUTE_USER_ACADEMY,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_WALLET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetAdminRankPageDetail } from "services/adminRankService";
import {
  empty,
  get_data_value,
  priceFormat,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import AdminRankInfoModal from "./inc/AdminRankInfoModal";

const currentPageTitle = "Rank";
const AdminRankPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_RANK,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, []);
  const history = useHistory();
  const defaultPageData = {
    user: {},
    affiliate_stats: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetAdminRankPageDetail()
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

  const [currentRankItem, setCurrentRankItem] = useState({});
  const [showAdminRankInfoModal, setShowAdminRankInfoModal] = useState(false);
  const showRankUserList = (rank_stats_item) => {
    console.log("rank_stats_item", rank_stats_item);
    setCurrentRankItem(rank_stats_item);
    setShowAdminRankInfoModal(true);
  };

  return (
    <>
      <AdminLayout>
        <div className="rank-list-page">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="">
                    <div>
                      <h4>Affiliate Rank Statistics </h4>
                      <hr />
                      <div className="rank-list-wrapper">
                        {pageData["affiliate_stats"].map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="rank-list-item"
                              onClick={(e) => {
                                showRankUserList(item);
                              }}
                            >
                              <div className="rank-name text-success">
                                {item["rank_name"]}
                              </div>
                              <div className="rank-user-cnt ">
                                {item["count"]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="">
                    <div>
                      <h4>Rank Finances:</h4>
                      <hr />
                      <h4 className="text-success mt-3 mb-0">
                        Current Total Weekly Payout: &nbsp;{" "}
                        <span className="text-semibold text-white">
                          ${priceFormat(
                            !empty(pageData["rank_finance"])
                              ? pageData["rank_finance"]
                              : 0
                          )}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AdminRankInfoModal
            modalTitle={currentRankItem["rank_name"]}
            isVisible={showAdminRankInfoModal}
            setVisibleModal={setShowAdminRankInfoModal}
            pageData={pageData}
            currentRankItem={currentRankItem}
            modalClass="user-page admin-page admin-rank-modal modal-md"
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminRankPage;
