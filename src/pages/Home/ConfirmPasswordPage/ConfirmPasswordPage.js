import HomeLayout from "layouts/HomeLayout/HomeLayout";
import {
  ROUTE_CONFIRM_PASSWORD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_FREE_BOOK,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
} from "navigation/CONSTANTS";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import ReCAPTCHA from "react-google-recaptcha";
import { googleKey } from "config/CONSTANTS";
import { Link, withRouter } from "react-router-dom";
import {
  get_data_value,
  isEmpty,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import {
  apiConfirmPassword,
  apiLogin,
  apiRequestResetPassword,
} from "services/loginService";
import { updateUser } from "redux/actions/userActions";

const ConfirmPasswordPage = (props) => {
  const dispatch = useDispatch();
  const initPage = () => {
    let page_title = "Confirm password";
    dispatch(
      UpdateAppData({
        currentPageTitle: page_title,
        current_route: ROUTE_CONFIRM_PASSWORD,
      })
    );
    //document.title = page_title;
  };

  const onClickConfirmPassword = () => {
    let code = "";
    try{
      if(!is_empty(props.match.params.code)){
        code = props.match.params.code
      }
    }catch(e){
      showToast("Invalid request", "error");
      setTimeout(() => {
        show_loading(false);
        props.history.replace({ pathname: ROUTE_LOGIN });
      }, 500);
    }
    
    if(code === ""){
      return false
    }
    let get_params = {
      code: code
    };
    console.log(get_params);
    //return false;
    show_loading(true);
    apiConfirmPassword(get_params)
      .then((api_res) => {
        console.log("api_res", api_res);
        if (api_res.status === "1") {
          showToast(api_res.message, "success");
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        showToast(err, "error");
      });

    setTimeout(() => {
      show_loading(false);
      props.history.replace({ pathname: ROUTE_LOGIN });
    }, 500);
  };

  useEffect(() => {
    initPage();
    onClickConfirmPassword();
  });

  return (
    <div>
      <HomeLayout>
        <div className="main-content">
          <div
            className="section page-section container has-header content-sm"
            id="page-section1"
          >
            <div className="container">
              <div className="form-container margin-auto" style={{minHeight: "80vh"}}></div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default withRouter(ConfirmPasswordPage);
