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
import {
  urlAdminDeleteUser,
  urlAdminGetWithdrawList,
} from "services/CONSTANTS";

import {
  apiAdminSetUserTmpPassword,
  apiAdminUpdateUserInfo,
  apiAdminUpdateUserStatus,
} from "services/adminUsersService";
import { apiAdminChaneWithdrawStatus } from "services/adminWithdrawService";

const AdminWithdrawListTable = (props) => {
  const userDataStore = useSelector((x) => x.userDataStore);
  const { pageData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("id");
  const [currentSortDirection, setCurrentSortDirection] = useState("desc");
  const [withdrawKind, setWithdrawKind] = useState("");

  const [filterText, setFilterText] = useState("");

  const fetchDataList = async (
    page,
    size = perPage,
    searchText = filterText,
    sortColumn = currentSortField,
    sortDirection = currentSortDirection,
    withdraw_kind = withdrawKind
  ) => {
    show_loading(true);

    const response = await axios.get(
      `${urlAdminGetWithdrawList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}&withdraw_kind=${withdraw_kind}`
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
        `${urlAdminGetWithdrawList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}&withdraw_kind=${withdrawKind}`
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
  const handleChangeWithdrawKind = (kind) => {
    setWithdrawKind(kind);
    fetchDataList(
      currentPage,
      perPage,
      filterText,
      currentSortField,
      currentSortDirection,
      kind
    );
  };

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
      },
      {
        name: "User Name",
        selector: "user_name",
        sortable: true,
      },
      {
        name: "Amount($)",
        selector: "amount",
        sortable: true,
      },
      {
        name: "Method",
        selector: "method_name",
        sortable: true,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: (row) => (
          <span
            className={`badge badge-pill badge-sm ${
              intval(row["status"]) === 0
                ? "badge-info"
                : intval(row["status"]) === 1
                ? "badge-success"
                : intval(row["status"]) === 2
                ? "badge-danger"
                : intval(row["status"]) === 3
                ? "badge-success"
                : ""
            }`}
          >
            {intval(row["status"]) === 0
              ? "Requested"
              : intval(row["status"]) === 1
              ? "Completed"
              : intval(row["status"]) === 2
              ? "Rejected"
              : intval(row["status"]) === 3
              ? "Completed"
              : ""}
          </span>
        ),
      },
      {
        name: "Paypal Address",
        selector: "paypal_address",
        sortable: true,
      },
      {
        name: "Created at",
        selector: "add_timestamp",
        sortable: true,
        cell: (row) => <span>{timeConverter(row.add_timestamp)}</span>,
      },
      {
        name: "Action",
        cell: (row) =>
          !empty(userDataStore["admin_type"]) &&
          userDataStore["admin_type"] !== "assistant" && (
            <>
              {intval(row["status"]) === 0 && (
                <>
                  <button
                    type="button"
                    className="btn btn-xs btn-success"
                    onClick={() => onClickTBActionBtn(row, "approve")}
                  >
                    <i className="fa fa-check"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={() => onClickTBActionBtn(row, "reject")}
                  >
                    <i className="fa fa-ban"></i>
                  </button>
                </>
              )}
              {intval(row["status"]) === 2 && (
                <>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={() => onClickTBActionBtn(row, "delete")}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </>
              )}
              {(intval(row["status"]) === 1 || intval(row["status"]) === 3) && (
                <>
                  <button
                    type="button"
                    className="btn btn-xs btn-danger"
                    onClick={() => onClickTBActionBtn(row, "delete")}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </>
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

    return (
      <div className="datatable-subheader">
        <div className="row">
          <div className="col-md-8">
            <div className="btn-toolbar">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={(e) => handleChangeWithdrawKind("")}
                >
                  All
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={(e) => handleChangeWithdrawKind("requested")}
                >
                  Requested
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={(e) => handleChangeWithdrawKind("rejected")}
                >
                  Rejected
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={(e) => handleChangeWithdrawKind("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="datatable-filter-box">
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

  const [confirmModalTitle, setConfirmModalTitle] = useState(
    "Are you sure to delete this record?"
  );
  const [confirmedAction, setConfirmedAction] = useState("change_user_status");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const onClickTBActionBtn = (row, actionName) => {
    setCurrentRow(row);
    if (actionName === "approve") {
      setConfirmModalTitle("Are you sure you want to approve?");
    } else if (actionName === "reject") {
      setConfirmModalTitle("Are you sure you want to reject?");
    } else if (actionName === "delete") {
      setConfirmModalTitle("Are you sure you want to delete?");
    }
    setConfirmedAction(actionName);
    setShowConfirmModal(true);
  };
  const doConfirmedAction = () => {
    let params = {
      id: currentRow["id"],
      action: "update",
    };
    if (confirmedAction === "approve") {
      params["status"] = "1";
    } else if (confirmedAction === "reject") {
      params["status"] = "2";
    } else if (confirmedAction === "delete") {
      params["action"] = "delete";
    }
    console.log("params", params);
    show_loading(true);
    apiAdminChaneWithdrawStatus(params)
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

export default AdminWithdrawListTable;
