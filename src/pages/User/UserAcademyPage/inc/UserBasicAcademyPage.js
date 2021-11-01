import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_ACADEMY, ROUTE_USER_DASHBOARD } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserAcademyData } from "services/userAcademyService";
import {
  get_data_value,
  isEmpty,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";

const currentPageTitle = "Higher Level Academy";
const UserBasicAcademyPage = (props) => {
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
    academy_data: null,
  };
  const [pageData, setPageData] = useState(defaultPageData);

  const getData = () => {
    console.log('props',props)
    let type = props.match.params.type
    if(is_empty(type)){
      type = "trial"
    }
    show_loading(true);
    apiGetUserAcademyData(type)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          if (api_res.data["user_is_active"] !== 1) {
            showToast("To access this feature, you need to have an active membership!", "error");
            history.push(ROUTE_USER_DASHBOARD);
            //props.history.replace({ pathname: ROUTE_USER_DASHBOARD });
            return false;
          }
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          console.log("pageData", pageData);
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [currentLesson, setCurrentLesson] = useState(null);

  const onClickLesson = (item) => {
    console.log("onclick lesson item", item);
    setCurrentLesson(item);
    setTimeout(function(){
      window.scrollTo(0, 0);
    }, 100)
  };

  return (
    <div className="user-basic-academy-page">
      <div className={`row`}>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title hidden t-show-mobile">
                {currentPageTitle}
              </h4>
              <div className="card-content">
                <div className="block padding-10 pb-4">
                  <div className="parse-title">
                    <span className="parse-img-responsive text-primary">
                      <i className="fa fa-angle-double-left"></i>
                    </span>{" "}
                    &nbsp;{" "}
                    <span className="">
                      <Link to={ROUTE_USER_ACADEMY} className="text-primary">
                        Back to main menu
                      </Link>
                    </span>
                  </div>
                </div>

                <div
                  className={`block text-center padding-top-20 ${
                    is_empty(currentLesson) ? "hidden" : ""
                  }`}
                >
                  <div className="block">
                    <iframe
                      src={get_data_value(currentLesson, "url")}
                      width="640"
                      height="360"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title="Video"
                    ></iframe>
                    <h4 style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                      <b>
                        {get_data_value(currentLesson, "subtitle")}: &nbsp;
                        {get_data_value(currentLesson, "subject")}
                      </b>
                    </h4>
                  </div>
                </div>

                <div className="parse-list">
                  {!is_empty(pageData["academy_data"]) &&
                    Object.keys(pageData["academy_data"]).map(
                      (key_name, list_index) => (
                        <div className="parse-box" key={list_index}>
                          <div className="parse-title">
                            <span className="parse-img-responsive">
                              <i className="fa fa-chevron-circle-up"></i>
                            </span>{" "}
                            &nbsp;{" "}
                            <span className="">
                              {pageData["academy_data"][key_name][0]["title"]}:
                            </span>
                          </div>
                          <div className="item-list-box">
                            {pageData["academy_data"][key_name].map(
                              (item, index) => (
                                <div
                                  className={`parse-item ${get_data_value(currentLesson, "id") === item["id"] ? "active" : ""}`}
                                  key={item["id"]}
                                >
                                  <b>{item["subtitle"]}:</b>{" "}
                                  <button
                                    type="button"
                                    className={`a-btn text-primary`}
                                    onClick={(e) => {
                                      onClickLesson(item);
                                    }}
                                  >
                                    {item["subject"]}
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBasicAcademyPage;
