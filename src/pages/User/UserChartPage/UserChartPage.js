import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_ACADEMY, ROUTE_USER_CHART } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { AdvancedChart } from "react-tradingview-embed";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiUserGetProfileInfo } from "services/userCommonService";
import { showToast, show_loading } from "utils/GlobalFunctions";

const currentPageTitle = "Live Charts";
const UserChartPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_CHART,
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
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiUserGetProfileInfo()
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
    <div className="user-chart-page">
      <div className={`row`}>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title hidden t-show-mobile">
                {currentPageTitle}
              </h4>
              <div className="block">
                <div className="trading-widget-block mb-3">
                  <AdvancedChart
                    widgetProps={{
                      width: "100%",
                      height: "650",
                      symbol: "FX:EURUSD",
                      interval: "1",
                      timezone: "Etc/UTC",
                      theme: "dark",
                      style: "9",
                      locale: "en",
                      toolbar_bg: "#f1f3f6",
                      enable_publishing: false,
                      withdateranges: true,
                      range: "all",
                      hide_side_toolbar: false,
                      allow_symbol_change: true,
                      details: true,
                      hotlist: true,
                      calendar: true,
                      news: ["stocktwits", "headlines"],
                      studies: [
                        //"BB@tv-basicstudies",
                        //"MACD@tv-basicstudies",
                        //"MF@tv-basicstudies"
                      ],
                    }}
                  ></AdvancedChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChartPage;
