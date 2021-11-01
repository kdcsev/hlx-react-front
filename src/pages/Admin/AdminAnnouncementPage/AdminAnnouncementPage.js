import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_ANNOUNCEMENT,
  ROUTE_USER_PROFILE,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiSubmitAdminAnnouncement } from "services/adminAnnouncementService";
import { apiAdminGetProfileInfo } from "services/adminCommonService";
import { apiGetAdminUsersPageDetail } from "services/adminUsersService";
import {
  apiUserCancelAffiliate,
  apiUserCancelMembership,
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

const currentPageTitle = "Add Announcement";
const AdminAnnouncementPage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_ANNOUNCEMENT,
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
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiAdminGetProfileInfo()
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

  const [userData, setUserData] = useState({});
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(userData, "subject", errorList);
    errorList = isEmpty(userData, "message", errorList);

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

  const [userKind, setUserKind] = useState("");
  const userKindList = [
    { label: "All", value: "" },
    { label: "Active users", value: "active" },
    { label: "Active customers", value: "active_customer" },
    { label: "Affiliates", value: "affiliate" },
    { label: "Both", value: "both" },
    { label: "Inactive users", value: "inactive_users" },
  ];
  const onChangeUserKind = (user_kind) => {
    setUserKind(user_kind);
  };

  const submitData = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiSubmitAdminAnnouncement({ ...userData, user_kind: userKind })
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast(api_res.message, "success");
            getData();
            setUserData({});
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

  return (
    <>
      <AdminLayout>
        <div className="admin-announcement-page">
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title t-show-mobile">
                    {currentPageTitle}
                  </h4>
                  <div className="card-content">
                    <div className="forms-sample">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row">
                            <div className="col-sm-12 text-center m-text-left">
                              {userKindList.map((item, index) => (
                                <div
                                  className="form-check form-check-inline margin-right-20"
                                  key={index}
                                >
                                  <label className="form-check-label">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      name="user_kind"
                                      id={`user_kind_${item["value"]}`}
                                      value={item["value"]}
                                      checked={userKind === item["value"]}
                                      onChange={(e) => {
                                        onChangeUserKind(item["value"]);
                                      }}
                                    />
                                    {item["label"]}
                                    <i className="input-helper"></i>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Subject
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className={`form-control subject ${
                                  errorField.includes("subject")
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="subject"
                                value={
                                  !empty(userData["subject"])
                                    ? userData["subject"]
                                    : ""
                                }
                                onChange={(e) => {
                                  onChangeFormField(e, "subject");
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Message
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className={`form-control message ${
                                  errorField.includes("message")
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="message"
                                rows={`15`}
                                value={
                                  !empty(userData["message"])
                                    ? userData["message"]
                                    : ""
                                }
                                onChange={(e) => {
                                  onChangeFormField(e, "message");
                                }}
                              ></textarea>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group mt-4">
                                <div className="button-group text-center">
                                  <button
                                    type="button"
                                    className="mb-2 btn btn-lg1 btn-primary mr-2"
                                    onClick={(e) => {
                                      submitData();
                                    }}
                                  >
                                    Submit
                                  </button>
                                  <button
                                    type="reset"
                                    className="mb-2 btn btn-lg1 btn-light"
                                    onClick={(e) => {
                                      setUserData({});
                                    }}
                                  >
                                    Cancel
                                  </button>
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
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminAnnouncementPage;
