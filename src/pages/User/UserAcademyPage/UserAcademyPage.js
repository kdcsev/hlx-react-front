import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_ACADEMY, ROUTE_USER_ACADEMY_ADVANCED, ROUTE_USER_ACADEMY_BASIC, ROUTE_USER_DASHBOARD, ROUTE_USER_LICENSE } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserAcademyPageDetail } from "services/userAcademyService";
import { get_data_value, showToast, show_loading } from "utils/GlobalFunctions";

const currentPageTitle = "Higher Level Academy";
const UserAcademyPage = (props) => {
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
    getData();
  }, []);
  const history = useHistory();
  const defaultPageData = {
    user: {},
    user_is_active: "",
    user_is_trial: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserAcademyPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          if(api_res.data['user_is_active']!==1) {
            showToast("To access this feature, you need to have an active membership!", "error")
            history.push(ROUTE_USER_DASHBOARD);
            //props.history.replace({ pathname: ROUTE_USER_DASHBOARD });
            return false
          }
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

  const gotoAcademyPro = () => {
    if(pageData['user_is_active'] === 1){
      if(pageData['user_is_trial'] !== 1) {
        history.push(ROUTE_USER_ACADEMY_BASIC + "/pro");
      }else{
        showToast("Not available during free-trial", "error")
        //history.push(ROUTE_USER_ACADEMY_BASIC + "/pro");
      }
    }

  }

  return (
    <div className="user-academy-page">
      <div className={`row`}>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title hidden t-show-mobile">
                {currentPageTitle}
              </h4>
              <div className="card-content pt-4 pb-4 text-center custom-bg">
                <div className="block padding-20">
                  <h3>Welcome to the HLA Training Program!</h3>
                </div>
                <div className="block padding-20">
                  <h3>
                    <em>Please choose from the following options:</em>
                  </h3>
                </div>
                <div className="block button-list padding-10">
                  <div className="button-item">
                    <Link
                      to={ROUTE_USER_ACADEMY_BASIC + "/trial"}
                      className="custom-animated-button animated-button1"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      Basics:
                      <br />
                      Getting Started
                    </Link>
                  </div>
                  <div className="button-item">
                    <div
                      className="a-btn custom-animated-button animated-button6"
                      onClick={(e)=>{gotoAcademyPro()}}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      Advanced:
                      <br />
                      Become a Pro!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAcademyPage;
