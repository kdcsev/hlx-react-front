import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import { ROUTE_USER_PROFILE } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserProfilePageDetail,
  apiUserCancelAffiliate,
  apiUserCancelMembership,
  apiUserRemoveCardInfo,
  apiUserUpdateCardInfo,
  apiUserUpdateProfile,
} from "services/userProfileService";
import {
  empty,
  get_data_value,
  isEmpty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";

const currentPageTitle = "Profile Management";
const UserProfilePage = () => {
  const dispatch = useDispatch();

  //////////////////////////socket part////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  const socketStore = useSelector((x) => x.socketStore);
  const socket = socketStore["socket"];
  useEffect(() => {
    if (!empty(socket)) {
      console.log("------------socketStore---------------", socketStore);
    }
  }, [socket]);

  const token = get_data_value(userDataStore, "token");
  const socketHeader = { token: token };

  ///////////////////////////end socket part/////////////////////////////

  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_PROFILE,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, []);

  const defaultPageData = {
    user: {},
    enabled_membership: "",
    is_active_customer: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserProfilePageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          setUserData({
            ...api_res.data["user"],
            ...initCardData,
            user_password: "",
          });
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  // const userDataStore = useSelector((x) => x.userDataStore);
  // const userInfo = userDataStore;
  // console.log("userInfo", userInfo);
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
  const [userData, setUserData] = useState({
    ...pageData["user"],
    ...initCardData,
    user_password: "",
  });
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(userData, "user_email", errorList);

    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    let updateData = { ...userData };
    updateData[field_name] = e.target.value;
    setUserData({ ...updateData });
  };

  const onClickProfileUpdate = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiUserUpdateProfile(userData)
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast("Profile has been updated successfully", "success");
            getData();
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

  const onClickUpdateCardInfo = () => {
    let is_valid = validateCardFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiUserUpdateCardInfo(cardData)
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast("Credit card has been updated successfully", "success");
            //setCreditCardData(initCardData)
            getData()
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
  const onClickRemoveCardInfo = () => {
    show_loading(true);
    apiUserRemoveCardInfo()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          dispatch(updateUser(api_res.data["user"]));
          setPageData({ ...pageData, user: api_res.data["user"] });
          showToast("Forget card successfully", "success");
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [confirmModalTitle, setConfirmModalTitle] = useState(
    "Are you sure to delete this record?"
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentConfirmAction, setCurrentConfirmAction] = useState("");

  const onCancelMembership = () => {
    setConfirmModalTitle("Are you sure to cancel your membership?");
    setShowConfirmModal(true);
    setCurrentConfirmAction("cancelMembership");
  };
  const onCancelAffiliate = () => {
    setConfirmModalTitle("Are you sure to cancel affiliate?");
    setShowConfirmModal(true);
    setCurrentConfirmAction("cancelAffiliate");
  };
  const onCloseAccount = () => {
    setConfirmModalTitle("Are you sure to close your account?");
    setShowConfirmModal(true);
    setCurrentConfirmAction("closeAccount");
  };
  const doConfirmedAction = () => {
    if (currentConfirmAction === "cancelMembership") {
      cancelMembership();
    } else if (currentConfirmAction === "cancelAffiliate") {
      cancelAffiliate();
    }
  };
  const cancelMembership = () => {
    show_loading(true);
    apiUserCancelMembership()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          dispatch(updateUser(api_res.data["user"]));
          showToast("Subscription has been cancelled successfully", "success");
          getData();
          setShowConfirmModal(false);
          console.log("emit get_user_notification_data")
          socket.emit("get_user_notification_data", { ...socketHeader });
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };
  const cancelAffiliate = () => {
    show_loading(true);
    apiUserCancelAffiliate()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          dispatch(updateUser(api_res.data["user"]));
          showToast("Affiliate has been cancelled successfully", "success");
          getData();
          setShowConfirmModal(false);
          socket.emit("get_user_notification_data", { ...socketHeader });
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
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Profile</h4>
              <p className="card-description"></p>
              <div className="forms-sample">
                <div className="form-group">
                  <label htmlFor="user_name">Username</label>
                  <input
                    type="text"
                    placeholder="Input your name"
                    className={`form-control user_name`}
                    id="user_name"
                    name="user_name"
                    defaultValue={get_data_value(userData, "user_name")}
                    readOnly
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_first_name">First Name</label>
                  <input
                    type="text"
                    placeholder="Input your first name"
                    className={`form-control user_first_name ${
                      errorField.includes("user_first_name") ? "is-invalid" : ""
                    }`}
                    id="user_first_name"
                    name="user_first_name"
                    defaultValue={get_data_value(userData, "user_first_name")}
                    readOnly={!empty(get_data_value(pageData["user"], "user_first_name"))}
                    onChange={(e) => {
                      onChangeFormField(e, "user_first_name");
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_last_name">Last Name</label>
                  <input
                    type="text"
                    placeholder="Input your last name"
                    className={`form-control user_last_name ${
                      errorField.includes("user_last_name") ? "is-invalid" : ""
                    }`}
                    id="user_last_name"
                    name="user_last_name"
                    defaultValue={get_data_value(userData, "user_last_name")}
                    readOnly={!empty(get_data_value(pageData["user"], "user_last_name"))}
                    onChange={(e) => {
                      onChangeFormField(e, "user_last_name");
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_email">Email Address</label>
                  <input
                    type="email"
                    placeholder="Input your email"
                    className={`form-control user_email ${
                      errorField.includes("user_email") ? "is-invalid" : ""
                    }`}
                    id="user_email"
                    name="user_email"
                    defaultValue={get_data_value(userData, "user_email")}
                    onChange={(e) => {
                      onChangeFormField(e, "user_email");
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_password">Password</label>
                  <input
                    type="text"
                    placeholder="Input password"
                    className={`form-control user_password ${
                      errorField.includes("user_password") ? "is-invalid" : ""
                    }`}
                    id="user_password"
                    name="user_password"
                    onChange={(e) => {
                      onChangeFormField(e, "user_password");
                    }}
                  />
                </div>
                <div className="form-group">
                  <div className="button-group" style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      className="mb-2 btn btn-md btn-primary"
                      onClick={(e) => {
                        onClickProfileUpdate();
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
                <h4
                  className={`card-title ${
                    pageData["enabled_membership"] === 1 ||
                    get_data_value(pageData["user"], "user_type") === 1
                      ? ""
                      : "hidden"
                  }`}
                >
                  {`Cancellation${
                    pageData["enabled_membership"] === 1 &&
                    get_data_value(pageData["user"], "user_type") === 1
                      ? "s"
                      : ""
                  }`}
                  :
                </h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div
                        className="button-group"
                        style={{ textAlign: "center", float: "right" }}
                      >
                        <button
                          type="button"
                          className={`mb-2 btn btn-md btn-danger mr-2 ${
                            pageData["enabled_membership"] === 1 ? "" : "hidden"
                          }`}
                          id="btn-cancel-subscription"
                          onClick={(e) => {
                            onCancelMembership();
                          }}
                        >
                          Cancel Membership
                        </button>
                        <button
                          type="button"
                          className={`mb-2 btn btn-md btn-warning mr-2 ${
                            get_data_value(pageData["user"], "user_type") === 1
                              ? ""
                              : "hidden"
                          }`}
                          id="btn-cancel-affiliate"
                          onClick={(e) => {
                            onCancelAffiliate();
                          }}
                        >
                          Cancel Affiliate
                        </button>
                        <button
                          type="button"
                          className="hidden mb-2 btn btn-md btn-danger mr-2"
                          id="btn-close-account"
                          onClick={(e) => {
                            onCloseAccount();
                          }}
                        >
                          Close Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Credit Card</h4>
              <p className="card-description"></p>
              <div className="form-group">
                <label>
                  Card on File: &nbsp;
                  {empty(pageData["user"]["card_last_4"]) && <span>NONE</span>}
                  {!empty(pageData["user"]["card_last_4"]) && (
                    <span className="card-encrypted-number">{`************${pageData["user"]["card_last_4"]}`}</span>
                  )}
                </label>
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
                {!empty(pageData["user"]["card_last_4"]) && (
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    id="remove-card"
                    onClick={(e) => {
                      onClickRemoveCardInfo();
                    }}
                  >
                    Forget Card
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  id="confirm-update"
                  onClick={(e) => {
                    onClickUpdateCardInfo();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        content={confirmModalTitle}
        onClickYes={doConfirmedAction}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page confirm-modal"
      />
    </div>
  );
};

export default UserProfilePage;
