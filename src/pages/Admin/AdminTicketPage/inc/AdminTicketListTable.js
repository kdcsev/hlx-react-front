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
import { urlAdminDeleteUser, urlAdminGetTicketList, urlAdminGetUsersList } from "services/CONSTANTS";
import {
  apiAdminSetUserTmpPassword,
  apiAdminUpdateUserInfo,
  apiAdminUpdateUserStatus,
} from "services/adminUsersService";

const AdminTicketListTable = (props) => {
  const userDataStore = useSelector((x) => x.userDataStore);
  const { pageData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("update_timestamp");
  const [currentSortDirection, setCurrentSortDirection] = useState("desc");
  const [itemType, setItemType] = useState("");

  const [filterText, setFilterText] = useState("");

  const fetchDataList = async (
    page,
    size = perPage,
    searchText = filterText,
    sortColumn = currentSortField,
    sortDirection = currentSortDirection,
    item_type = itemType
  ) => {
    show_loading(true);

    const response = await axios.get(
      `${urlAdminGetTicketList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}&item_type=${item_type}`
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
        `${urlAdminGetTicketList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}&item_type=${itemType}`
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
  const handleChangeItemType = (item_tpye) => {
    setItemType(item_tpye)
    fetchDataList(currentPage, perPage, filterText, currentSortField, currentSortDirection, item_tpye);
  };

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: false,
      cell: (row) =>
        row.id ? (
          <>
            <Link to={`/admin/ticket/detail/${row.id}`} className="ticket-item">
              <div className="ticket-row">
                <div className="ticket-content">
                  <h3 className="ticket-subject text-emphasis"><span><i className="fa fa-user" style={{width: "20px"}}></i></span> : &nbsp;{row.sender_name}</h3>
                  <h3 className="ticket-subject text-emphasis"><span><i className="fa fa-comments" style={{width: "20px"}}></i></span> : &nbsp;{row.title}</h3>
                  <div className="ticket-details">
                    <span className="info">
                      <i className="fa fa-info-circle"></i> Ticket ID: {row.id}
                    </span>
                    <span className="info">
                      <i className="fa fa-clock-o"></i>{" "}
                      <em className="ticket-timestamp unix-timestamp"></em>
                      {timeConverter(row.add_timestamp)}
                    </span>
                  </div>
                </div>
                <div className="ticket-status-box">
                  <span
                    className={`badge badge-pill badge-sm ${
                      row["status"] === "Opened"
                        ? "badge-gradient-danger"
                        : row["status"] === "Answered"
                        ? "badge-gradient-warning"
                        : row["status"] === "Replied"
                        ? "badge-gradient-info"
                        : row["status"] === "Closed"
                        ? "badge-light"
                        : "badge-warning"
                    }`}
                  >
                    {row["status"]}
                  </span>
                </div>
              </div>
            </Link>
          </>
        ) : null,
    },
    {
      name: "Description",
      selector: "description",
      hide: 1,
      omit: true,
    },
  ];

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
                <button type="button" className="btn btn-sm btn-primary" onClick={(e)=>handleChangeItemType('')}>
                  All
                </button>
                <button type="button" className="btn btn-sm btn-danger" onClick={(e)=>handleChangeItemType('Opened')}>
                  Opened
                </button>
                <button type="button" className="btn btn-sm btn-info" onClick={(e)=>handleChangeItemType('Replied')}>
                  Replied
                </button>
                <button type="button" className="btn btn-sm btn-warning" onClick={(e)=>handleChangeItemType('Answered')}>
                Answered
                </button>
                <button type="button" className="btn btn-sm btn-light" onClick={(e)=>handleChangeItemType('Closed')}>
                  Closed
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
  ////////////////////////////////////////////end modal actions/////////////////////////////////////////////////////////

  return (
    <>
      <div className="datatable-wrapper no-border">
        <DataTable
          theme="dark"
          noHeader={true}
          noTableHead={true}
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
          paginationPerPage={perPage}
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

export default AdminTicketListTable;
