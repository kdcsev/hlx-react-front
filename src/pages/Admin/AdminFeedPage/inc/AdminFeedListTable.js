import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import { ROUTE_ADMIN_FEED_DETAIL, ROUTE_USER_ACADEMY, ROUTE_USER_MARKETING } from "navigation/CONSTANTS";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  urlAdminGetFeedList,
  urlAdminGetTicketList,
  urlAdminGetUsersList,
} from "services/CONSTANTS";
import {
  apiAdminSetUserTmpPassword,
  apiAdminUpdateUserInfo,
  apiAdminUpdateUserStatus,
} from "services/adminUsersService";
import renderHTML from 'react-render-html';
import { apiDeleteAdminFeed } from "services/adminFeedService";

const AdminFeedListTable = (props) => {
  const history = useHistory()
  const userDataStore = useSelector((x) => x.userDataStore);
  const { pageData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("id");
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
      `${urlAdminGetFeedList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}&item_type=${item_type}`
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
        `${urlAdminGetFeedList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}&item_type=${itemType}`
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

  const goFeedDetailPage = (row)=>{
    const url = "/admin/feed/detail/" + row.id
    history.push(url)
  }

  const columns = [
    {
      name: "Subject",
      selector: "subject",
      sortable: false,
      cell: (row) =>
        row.id ? (
          <>
            <div className="feed-row">
              <div className="feed-item">
                <div className="feed-box" onClick={(e)=>{goFeedDetailPage(row)}}>
                  <div className="feed-subject">{row.subject}</div>
                  <div className="feed-message word-break">{renderHTML(row.message)}</div>
                  <div className="feed-date unix-timestamp">
                    {timeConverter(row.add_timestamp)}
                  </div>
                </div>
                <div className="feed-action">
                  <button
                    title="Delete"
                    data-id={`${row.id}`}
                    className="ajax-del-btn btn btn-sm btn-danger"
                    style={{width:"30px"}}
                    onClick={(e)=>{onClickDeleteFeed(row)}}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null,
    },
    {
      name: "action",
      selector: "id",
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
          <div className="col-md-12">
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
    "Are you sure you want to delete?"
  );
  const [confirmedAction, setConfirmedAction] = useState("delete");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const onClickDeleteFeed = (row) => {
    setCurrentRow(row);
    setConfirmModalTitle("Are you sure you want to delete?");
    setConfirmedAction("delete");
    setShowConfirmModal(true);
  };
  const doConfirmedAction = () => {
    let params = {
      id: currentRow["id"],
    };
    show_loading(true);
    apiDeleteAdminFeed(params)
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

export default AdminFeedListTable;
