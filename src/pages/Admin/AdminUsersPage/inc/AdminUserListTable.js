import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import { ROUTE_USER_ACADEMY, ROUTE_USER_MARKETING } from "navigation/CONSTANTS";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserMarketingPageDetail,
  apiGetUserMarketingRankDetail,
} from "services/userMarketingService";
import { apiDeleteUserPayoutRow } from "services/userWalletService";

import {
  curl_post,
  empty,
  get_data_value,
  intval,
  is_empty,
  jQuery,
  showToast,
  show_loading,
  timeConverter,
  toLocalDatetime,
} from "utils/GlobalFunctions";
import { urlAdminDeleteUser, urlAdminDownloadUserList, urlAdminGetUsersList, urlUserGetTreeUserList } from "services/CONSTANTS";
import TmpPasswordModal from "./TmpPasswordModal";
import AdminUserDownloadModal from "./AdminUserDownloadModal";

import {
  apiAdminSetUserTmpPassword,
  apiAdminUpdateUserInfo,
  apiAdminUpdateUserStatus,
} from "services/adminUsersService";
import AdminUserInfoModal from "./AdminUserInfoModal";

const AdminUserListTable = (props) => {
  const userDataStore = useSelector((x) => x.userDataStore);
  const { pageData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("add_timestamp");
  const [currentSortDirection, setCurrentSortDirection] = useState("asc");
  const [userType, setUserType] = useState("");

  const [filterText, setFilterText] = useState("");

  const fetchDataList = async (
    page,
    size = perPage,
    searchText = filterText,
    sortColumn = currentSortField,
    sortDirection = currentSortDirection,
    userKind = userType
  ) => {
    show_loading(true);

    const response = await axios.get(
      `${urlAdminGetUsersList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}&user_kind=${userKind}`
    );

    setData(response.data.data);
    setTotalRows(response.data.total);
    show_loading(false);
  };

  useEffect(() => {
    fetchDataList(1);
  }, []);

  const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(
      newArray.findIndex((a) => a === item),
      1
    );

    return newArray;
  };

  const handleDelete = useCallback(
    (row) => async () => {
      await axios.delete(`${urlAdminDeleteUser}?id=${row.id}`);
      const response = await axios.get(
        `${urlAdminGetUsersList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}&user_kind=${userType}`
      );

      setData(removeItem(response.data.data, row));
      setTotalRows(totalRows - 1);
    },
    [currentPage, perPage, totalRows]
  );
  const handlePageChange = (page) => {
    fetchDataList(page);
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    fetchDataList(page, newPerPage);
    setPerPage(newPerPage);
  };
  const handleSearchChange = (newSearchText) => {
    fetchDataList(currentPage, perPage, newSearchText);
    setFilterText(newSearchText);
  };
  const onSort = (column, sortDirection, event) => {
    console.log(
      "--------column, sortDirection, event--------",
      column,
      sortDirection,
      event
    );
    let sortColumn = column["selector"];
    setCurrentSortField(sortColumn);
    setCurrentSortDirection(sortDirection);
    fetchDataList(currentPage, perPage, filterText, sortColumn, sortDirection);
  };
  const handleChangeUserKind = (userKind) => {
    setUserType(userKind);
    fetchDataList(
      currentPage,
      perPage,
      filterText,
      currentSortField,
      currentSortDirection,
      userKind
    );
  };

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        omit: true,
      },
      {
        name: "Name",
        selector: "user_name",
        sortable: true,
      },
      {
        name: "Email",
        selector: "user_email",
        sortable: true,
      },
      {
        name: "Type",
        selector: "user_type",
        sortable: false,
        cell: (row) =>
          row.user_type < 2 ? (
            <>
              <span
                className={`badge badge-pill badge-sm ${
                  row.user_type === 0
                    ? row.license_status === 2 ? "badge-warning" : intval(row.is_active) === 0
                      ? "badge-light"
                      : "badge-success"
                    : row.user_type === 1
                    ? row.check_user_has_active_license
                      ? "badge-info"
                      : "badge-danger"
                    : ""
                }`}
              >{`${
                row.user_type === 0
                  ? intval(row.is_active) === 1
                    ? row.license_status === 2 ? "Free Tier" : "Active Customer"
                    : "Inactive Customer"
                  : row.user_type === 1
                  ? row.check_user_has_active_license
                    ? "Both"
                    : "Affiliate"
                  : ""
              }`}</span>
            </>
          ) : null,
      },
      {
        name: "Rank",
        selector: "rank_name",
        sortable: true,
      },
      {
        name: "Wallet($)",
        selector: "balance",
        sortable: true,
      },
      {
        name: "Register Date",
        selector: "add_timestamp",
        sortable: true,
        cell: (row) => <span>{timeConverter(row.add_timestamp)}</span>,
      },
      {
        name: "Action",
        // eslint-disable-next-line react/button-has-type
        cell: (row) =>
          !empty(userDataStore["admin_type"]) &&
          userDataStore["admin_type"] !== "assistant" && (
            <>
              <button
                type="button"
                className="btn btn-xs btn-danger"
                onClick={() => onClickSetTmpPassword(row)}
              >
                <i className="fa fa-key"></i>
              </button>
              <button
                type="button"
                className="btn btn-xs btn-info"
                onClick={() => onClickEditUser(row)}
              >
                <i className="fa fa-pencil"></i>
              </button>
              {intval(row["status"]) === 1 && (
                <button
                  type="button"
                  className="btn btn-xs btn-warning"
                  onClick={() => onClickChangeUserStatus(row, "block")}
                >
                  <i className="fa fa-ban"></i>
                </button>
              )}
              {intval(row["status"]) === 0 && (
                <button
                  type="button"
                  className="btn btn-xs btn-success"
                  onClick={() => onClickChangeUserStatus(row, "active")}
                >
                  <i className="fa fa-check"></i>
                </button>
              )}
            </>
          ),
      },
    ],
    [handleDelete]
  );
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const filteredItems = data.filter(
  //   (item) =>
  //     JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
  //     -1
  // );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        handleSearchChange("");
      }
    };
    const onChangeUserType = (type) => {
      handleChangeUserKind(type);
    };

    return (
      <div className="datatable-subheader">
        <div className="row">
          <div className="col-md-8">
            <div className="btn-toolbar">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={(e) => onChangeUserType("")}
                >
                  All
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={(e) => onChangeUserType("affliate")}
                >
                  Affiliate
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={(e) => onChangeUserType("active_customer")}
                >
                  Active Customer
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={(e) => onChangeUserType("both")}
                >
                  Both
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-warning"
                  onClick={(e) => onChangeUserType("free_tier")}
                >
                  Free Tier
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={(e) => onChangeUserType("inactive_customer")}
                >
                  Inactive Customer
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={(e) => onChangeUserType("holding_tank")}
                >
                  In Holding Tank
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
          <div className="pull-right ml-1" style={{border: "1px solid transparent"}}>
              <button type="button" className="btn btn-success btn-icon-text" title="Download" onClick={(e)=>{onClickDownload()}}>
                <i className="ti-download"></i>
              </button>
            </div>
            <div className="datatable-filter-box pull-right">
              <input
                id="search"
                type="text"
                placeholder="Search..."
                value={filterText}
                className="form-control input-search"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <button className="a-btn btn-clear-search" onClick={handleClear}>
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  //////////////////////////////////////////start modal actions///////////////////////////////////////////////
  const [currentRow, setCurrentRow] = useState({});

  const [showTmpPasswordModal, setShowTmpPasswordModal] = useState(false);
  const onClickSetTmpPassword = (row) => {
    setShowTmpPasswordModal(true);
    setCurrentRow(row);
  };
  const submitTmpPassword = (params) => {
    console.log("params", params);
    show_loading(true);
    apiAdminSetUserTmpPassword(params)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowTmpPasswordModal(false);
          showToast("Temporary password has been set successfully", "success");
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const onClickEditUser = (row) => {
    setShowUserInfoModal(true);
    setCurrentRow(row);
  };
  const updateUserInfo = (params) => {
    console.log("params", params);
    show_loading(true);
    apiAdminUpdateUserInfo(params)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowUserInfoModal(false);
          showToast("User has been updated successfully", "success");

          fetchDataList(currentPage, perPage);
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
  const [confirmedAction, setConfirmedAction] = useState("change_user_status");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const onClickChangeUserStatus = (row, status) => {
    console.log("row, status", row, status);
    setCurrentRow(row);
    if (status === "active") {
      setConfirmModalTitle("Are you sure you want to activate user?");
      setConfirmedAction("activate_user");
    } else {
      setConfirmModalTitle("Are you sure you want to block user?");
      setConfirmedAction("block_user");
    }
    setShowConfirmModal(true);
  };
  const doConfirmedAction = () => {
    let params = {
      user_id: currentRow["id"],
    };
    if (confirmedAction === "activate_user") {
      params["status"] = "1";
    } else if (confirmedAction === "block_user") {
      params["status"] = "0";
    }
    console.log("params", params);
    show_loading(true);
    apiAdminUpdateUserStatus(params)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowConfirmModal(false);
          showToast(api_res.message, "success");

          fetchDataList(currentPage, perPage);
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [showUserDownloadModal, setShowUserDownloadModal] = useState(false);
  const onClickDownload = () => {
    setShowUserDownloadModal(true);
  };
  const doDownloadUserList = (user_kind) => {
    console.log("user_kind: ", user_kind);
    setShowUserDownloadModal(false);
    // let download_link = urlAdminDownloadUserList + "?option="+user_kind
    // window.location.href = download_link;
    if(userDataStore['admin_type'] !== 'superadmin'){
      showToast("Permission is denied", "error")
      return false
    }else{
      let post_param = {
        option: user_kind,
        token: userDataStore['token']
      }
      curl_post(urlAdminDownloadUserList, post_param, 'post')
    }
  };
  ////////////////////////////////////////////end modal actions/////////////////////////////////////////////////////////

  return (
    <>
      <div className="datatable-wrapper">
        <DataTable
          theme="dark"
          noHeader={true}
          columns={columns}
          data={data}
          defaultSortField={currentSortField}
          defaultSortAsc={currentSortDirection === "asc"}
          onSort={onSort}
          sortServer={true}
          subHeader
          subHeaderComponent={subHeaderComponent}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>

      <TmpPasswordModal
        modalTitle={`Set temporary password`}
        isVisible={showTmpPasswordModal}
        setVisibleModal={setShowTmpPasswordModal}
        pageData={pageData}
        currentRow={currentRow}
        submitModalData={submitTmpPassword}
        modalClass="user-page admin-page set-temporary-password"
      />
      <AdminUserInfoModal
        modalTitle={`Edit User`}
        isVisible={showUserInfoModal}
        setVisibleModal={setShowUserInfoModal}
        pageData={pageData}
        currentRow={currentRow}
        submitModalData={updateUserInfo}
        modalClass="user-page admin-page user-info-modal"
      />
      <AdminUserDownloadModal
        modalTitle={`Choose download option`}
        isVisible={showUserDownloadModal}
        setVisibleModal={setShowUserDownloadModal}
        pageData={pageData}
        submitModalData={doDownloadUserList}
        modalClass="user-page admin-page user-info-modal"
      />

      <ConfirmModal
        content={confirmModalTitle}
        onClickYes={doConfirmedAction}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page admin-page confirm-modal"
      />
    </>
  );
};

export default AdminUserListTable;
