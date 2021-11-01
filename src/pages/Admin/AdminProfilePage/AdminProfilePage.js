import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import CreditCardForm from "components/CreditCardForm/CreditCardForm";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_ANNOUNCEMENT,
  ROUTE_ADMIN_PROFILE,
  ROUTE_USER_PROFILE,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiSubmitAdminAnnouncement } from "services/adminAnnouncementService";
import { apiAdminGetProfileInfo, apiAdminUpdateProfile } from "services/adminCommonService";
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

const currentPageTitle = "Profile";
const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_PROFILE,
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
          setUserData({...api_res.data['user'], admin_password:""});
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
    errorList = isEmpty(userData, "admin_name", errorList);
    errorList = isEmpty(userData, "admin_email", errorList);

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

  const submitData = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiAdminUpdateProfile({ ...userData })
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast(api_res.message, "success");
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
                          <div className="form-group">
                            <label htmlFor="admin_name">Name</label>
                            <input
                              type="text"
                              placeholder="Input your name"
                              className={`form-control admin_name ${
                                errorField.includes("admin_name")
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="admin_name"
                              name="admin_name"
                              value={!empty(userData['admin_name']) ? userData['admin_name'] : ""}
                              onChange={(e) => {
                                onChangeFormField(e, "admin_name");
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="admin_email">Email</label>
                            <input
                              type="email"
                              placeholder="Input your email"
                              className={`form-control admin_email ${
                                errorField.includes("admin_email")
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="admin_email"
                              name="admin_email"
                              value={!empty(userData['admin_email']) ? userData['admin_email'] : ""}
                              onChange={(e) => {
                                onChangeFormField(e, "admin_email");
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="admin_password">Password</label>
                            <input
                              type="email"
                              placeholder="Input your password"
                              className={`form-control admin_password ${
                                errorField.includes("admin_password")
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="admin_password"
                              name="admin_password"
                              value={!empty(userData['admin_password']) ? userData['admin_password'] : ""}
                              onChange={(e) => {
                                onChangeFormField(e, "admin_password");
                              }}
                            />
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

export default AdminProfilePage;
