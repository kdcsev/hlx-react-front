import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_TICKET, ROUTE_USER_TICKET_ADD } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserTicketListPageDetail } from "services/userTicketService";
import { empty, showToast, show_loading } from "utils/GlobalFunctions";
import UserTicketListTable from "./inc/UserTicketListTable";

const currentPageTitle = "Support Tickets";
const UserTicketPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_TICKET,
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
    ticket_list: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserTicketListPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          if(empty(api_res.data["ticket_list"])) {
            history.push(ROUTE_USER_TICKET_ADD);
          }
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
    <div
      className={`user-ticket-list-page ${
        empty(pageData["ticket_list"]) ? "hidden" : ""
      }`}
    >
      <div className={`row`}>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <h4 className="card-title pull-left">
                  <Link to={ROUTE_USER_TICKET_ADD} className="btn btn-primary">
                    New Ticket
                  </Link>
                </h4>
                <div className="clearfix"></div>
                <div className="datatable-wrapper no-border">
                  <UserTicketListTable
                    initialTableData={pageData["ticket_list"]}
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

export default UserTicketPage;
