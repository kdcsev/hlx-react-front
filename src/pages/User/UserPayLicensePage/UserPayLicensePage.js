import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import {
  APP_NAME,
  LICENSE_PRICE,
  LICENSE_TRIAL_PRICE,
  TRIAL_LICENSE_DURATION,
} from "config/CONSTANTS";
import {
  ROUTE_USER_LICENSE,
  ROUTE_USER_PAY_LICENSE,
  ROUTE_USER_PROFILE,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserLicensePageDetail,
  apiUserUpdateLicenseInfo,
} from "services/userLicenseService";
import {
  apiGetUserPayLicensePageDetail,
  apiUserPayLicense,
} from "services/userPayService";
import {
  apiGetUserProfilePageDetail,
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

const currentPageTitle = "Purchase License";
const UserPayLicensePage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_LICENSE,
        m_user_menu_collapsed: true,
      })
    );
  };

  const history = useHistory();

  useEffect(() => {
    initPage();
    getData();
  }, []);
  //const history = useHistory();
  const defaultPageData = {
    user: {},
    enabled_membership: "",
    is_active_customer: "",
    card_number_last4: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserPayLicensePageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          if (api_res.data["is_active_customer"] === 1) {
            history.push(ROUTE_USER_LICENSE);
          } else {
            if (!empty(api_res.data["card_number_last4"])) {
              setConfirmModalContent(
                "Are you sure you want to pay with card on file (************" +
                  api_res.data["card_number_last4"] +
                  ")?"
              );
              setShowConfirmModal(true);
            }
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

  let curYear = new Date().getFullYear();
  const initCardData = {
    owner: "",
    card_number: "",
    cvv: "",
    exp_month: "01",
    exp_year: curYear - 2000,
    card_type: "",
  };
  const [cardData, setCardData] = useState(initCardData);
  const [errorField, setErrorField] = useState([]);

  const validateCardFields = () => {
    var errorList = Array();
    errorList = isEmpty(cardData, "owner", errorList);
    errorList = isEmpty(cardData, "card_number", errorList);
    errorList = isEmpty(cardData, "cvv", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const setCreditCardData = (creditCardData) => {
    let updateData = {
      owner: creditCardData["owner"],
      card_number: creditCardData["card_number"],
      cvv: creditCardData["cvv"],
      exp_month: creditCardData["exp_month"],
      exp_year: creditCardData["exp_year"],
      card_type: creditCardData["card_type"],
    };
    setCardData({ ...cardData, ...updateData });
  };

  const onClickPayNow = () => {
    let is_valid = validateCardFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiUserPayLicense({ ...cardData, payment_type: "newly" })
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast("You have paid successfully.", "success");
            history.push(ROUTE_USER_LICENSE);
          } else {
            showToast(api_res.message, "error");
          }
        })
        .catch((err) => {
          show_loading(false);
          showToast(err, "error");
        });
    }
  };

  const [confirmModalContent, setConfirmModalContent] = useState(
    "Are you sure you want to pay with card on file?"
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //const [currentConfirmAction, setCurrentConfirmAction] = useState("");
  const doConfirmedAction = () => {
    show_loading(true);
    apiUserPayLicense({ ...cardData, payment_type: "recursive" })
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowConfirmModal(false);
          dispatch(updateUser(api_res.data["user"]));
          showToast("You have paid successfully.", "success");
          history.push(ROUTE_USER_LICENSE);
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
    <div className="user-profile-page">
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="user-payment-box">
                <p className="card-description"></p>
                <div className="heading">
                  <h4 className="text-center">
                    Confirm Purchase - Credit Card
                  </h4>
                  <h4
                    className={`text-center ${
                      get_data_value(pageData["user"], "trial_used") === 1
                        ? ""
                        : "hidden"
                    }`}
                  >
                    ( ${priceFormat(LICENSE_PRICE)} )
                  </h4>
                  <h4
                    className={`text-center ${
                      get_data_value(pageData["user"], "trial_used") === 0
                        ? ""
                        : "hidden"
                    }`}
                  >
                    ( $
                    {priceFormat(LICENSE_TRIAL_PRICE) +
                      " - " +
                      TRIAL_LICENSE_DURATION +
                      "days trial"}{" "}
                    )
                  </h4>
                </div>
                <div>
                  <CreditCardForm
                    userData={cardData}
                    setUserData={setCreditCardData}
                    errorField={errorField}
                    setErrorField={setErrorField}
                  ></CreditCardForm>
                </div>
                <div className="form-group text-right" id="pay-now">
                  <button
                    type="button"
                    className="btn btn-lg btn-block btn-primary"
                    id="confirm-update"
                    onClick={(e) => {
                      onClickPayNow();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        content={confirmModalContent}
        onClickYes={doConfirmedAction}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page confirm-modal"
      />
    </div>
  );
};

export default UserPayLicensePage;
