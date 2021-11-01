import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { AFFILIATE_COMMISSION } from "config/CONSTANTS";
import { ROUTE_REWARDS_PLAN, ROUTE_USER_AFFILIATE, ROUTE_USER_PAY_AFFILIATE } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiUserGetProfileInfo } from "services/userCommonService";
import { priceFormat, showToast, show_loading } from "utils/GlobalFunctions";
import "./UserAffiliateIntroPage.css";

const currentPageTitle = "Become an Affiliate";
const UserAffiliateIntroPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_AFFILIATE,
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
    <div className="user-affiliate-intro-page">
      <div className="row">
      <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
                <div className="card-content">
                    <div className="affiliate-intro-box">
                        <div className="affiliate-intro-left mb-4 text-center">
                            <div className="affiliate-img-box">
                                <img src="/assets/home/images/20210314/affiliate.png" alt="" />
                            </div>
                            <div className="affiliate-price-box">
                                <h4>${priceFormat(AFFILIATE_COMMISSION)} / Month</h4>
                            </div>
                            <Link to={ROUTE_USER_PAY_AFFILIATE} className="btn btn-success btn-round">BUY NOW</Link>
                        </div>
                        <div className="affiliate-intro-right">
                            <div className="affiliate-title">
                                <p>What is the Affiliate Package?</p>
                                <p>Become an active affiliate to gain access to the following:</p>
                            </div>
                            <div style={{paddingLeft: "20px", paddingBottom: "30px"}}>
                                <p className="affiliate-desc with-checkbox">
                                    <span className="img-checkbox text-primary text-bold"><i className="fa fa-check"></i></span>
                                    Dedicated Support Team!
                                </p>
                                <p className="affiliate-desc with-checkbox">
                                    <span className="img-checkbox text-primary text-bold"><i className="fa fa-check"></i></span>
                                    Access to an advanced back office!
                                </p>
                                <p className="affiliate-desc with-checkbox">
                                    <span className="img-checkbox text-primary text-bold"><i className="fa fa-check"></i></span>
                                    Access to Specialized Training from Top-Earning Affiliates, including personal brand growth and Direct Sales Training with updated training released regularly for affiliates!
                                </p>
                               
                                <p className="affiliate-desc with-checkbox">
                                    <span className="img-checkbox text-primary text-bold"><i className="fa fa-check"></i></span>
                                    Access to our rewards plan!
                                </p>
                                <div className="affiliate-desc" style={{marginTop: "30px"}}>
                                    See more about our rewards plan for active affiliates <Link className="text-primary" to={ROUTE_REWARDS_PLAN} target="_blank">HERE</Link>.
                                </div>
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

export default UserAffiliateIntroPage;
