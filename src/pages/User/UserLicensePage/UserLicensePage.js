import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { APP_NAME, BASE_FRONT_URL } from "config/CONSTANTS";
import { ROUTE_USER_LICENSE } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiGetUserLicensePageDetail, apiUserUpdateLicenseInfo } from "services/userLicenseService";
import { get_data_value, showToast, show_loading } from "utils/GlobalFunctions";
import LicenseInfoModal from "./inc/LicenseInfoModal";
import UserLicenseIntroPage from "./inc/UserLicenseIntroPage";

const currentPageTitle = "License Management";
const UserLicensePage = () => {
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

  useEffect(() => {
    initPage();
    getData();
  }, []);
  //const history = useHistory();
  const defaultPageData = {
    user: {},
    license_list: [],
    enabled_membership: "",
    is_active_customer: "",
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserLicensePageDetail()
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

  const [showLicenseInfoModal, setShowLicenseInfoModal] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState({});
  const onEditLicense = (license_item) => {
    console.log("license item", license_item);
    setSelectedLicense(license_item);
    setShowLicenseInfoModal(true);
  };

  const submitLicenseInfo = (info) => {
    console.log("updated info", info);

    show_loading(true);
    apiUserUpdateLicenseInfo(info)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          getData()
          setShowLicenseInfoModal(false);
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
    <div className="user-license-page">
      <div
        className={`${
          get_data_value(pageData, "is_active_customer") === 0 ? "" : "hidden"
        }`}
      >
        <UserLicenseIntroPage
          currentPageTitle={currentPageTitle}
          pageData={pageData}
        />
      </div>

      <div
        className={`${
          get_data_value(pageData, "is_active_customer") === 1 ? "" : "hidden"
        }`}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
                <div className="row">
                  <div className="col-md-6">
                    <div className="table-responsive">
                      <div className="material-datatables">
                        <table
                          id="datatables"
                          className="table table-bordered"
                          cellSpacing="0"
                          width="100%"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th className="hidden">ID</th>
                              <th>Broker Number</th>
                              <th style={{ textAlign: "center" }}>Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pageData["license_list"].map((item, index) => (
                              <tr key={index}>
                                <td className="hidden">{item["id"]}</td>
                                <td
                                  className="license-number"
                                  data-id={item["id"]}
                                >
                                  {item["license_number"]}
                                </td>
                                <td className="td-actions text-center">
                                  <div className="">
                                    <button
                                      className="btn btn-info ajax-edit-btn"
                                      onClick={(e) => {
                                        onEditLicense(item);
                                      }}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="available-product-list pt-4 pl-4">
                      <h4>Available Products:</h4>
                      <ul>
                        <li className="text-warning">
                          Alpha GI 2.0 (Ends soon!){" "}
                          <a
                            className="text-primary"
                            href={`${BASE_FRONT_URL}/downloads/Alpha-V2-NX.zip`}
                            target="_blank"
                            rel="noreferrer"
                            download="Alpha-V2V.zip"
                          >
                            (Click Here to Download)
                          </a>
                        </li>
                        <li className="text-success">
                          Alpha GI 2.5 (
                          <span className="text-success">
                            Available on Cloud
                          </span>
                          )
                        </li>
                        <li className="text-success">
                          Alpha GR (
                          <span className="text-success">
                            Available on Cloud
                          </span>
                          )
                        </li>
                        <li className="text-success">
                          Alpha GO (
                          <span className="text-success">
                            Available on Cloud
                          </span>
                          )
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LicenseInfoModal
        modalTitle={`Edit Broker Number`}
        isVisible={showLicenseInfoModal}
        setVisibleModal={setShowLicenseInfoModal}
        modalInitialData={selectedLicense}
        submitModalData={submitLicenseInfo}
        modalClass="user-page license-info-modal"
      />
    </div>
  );
};

export default UserLicensePage;
