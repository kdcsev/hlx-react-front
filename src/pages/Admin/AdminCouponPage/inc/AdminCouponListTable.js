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
  urlAdminDeleteCoupon,
  urlAdminDeleteUser,
  urlAdminGetCouponList,
  urlAdminGetLicensesList,
} from "services/CONSTANTS";

import { apiAdminUpdateUserStatus } from "services/adminUsersService";
import AdminCouponInfoModal from "./AdminCouponInfoModal";
import {
  apiDeleteAdminCoupon,
  apiSubmitAdminCoupon,
} from "services/adminCouponService";

const AdminCouponListTable = (props) => {
  const userDataStore = useSelector((x) => x.userDataStore);
  const { pageData } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("add_timestamp");
  const [currentSortDirection, setCurrentSortDirection] = useState("desc");
  const [userType, setUserType] = useState("");

  const [filterText, setFilterText] = useState("");

  const fetchDataList = async (
    page,
    size = perPage,
    searchText = filterText,
    sortColumn = currentSortField,
    sortDirection = currentSortDirection
  ) => {
    show_loading(true);

    const response = await axios.get(
      `${urlAdminGetCouponList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}`
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
      await axios.delete(`${urlAdminDeleteCoupon}?id=${row.id}`);
      const response = await axios.get(
        `${urlAdminGetCouponList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}`
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

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        omit: true
      },
      {
        name: "Coupon Code",
        selector: "name",
        sortable: true,
      },
      {
        name: "Coupon Type",
        selector: "type_desc",
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
        // eslint-disable-next-line react/button-has-type
        cell: (row) => (
          <>
            <button
              type="button"
              className="btn btn-xs btn-info"
              onClick={() => onClickEditCoupon(row)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              type="button"
              className="btn btn-xs btn-danger"
              onClick={() => onClickDeleteCoupon(row)}
            >
              <i className="fa fa-times"></i>
            </button>
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
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => onClickEditCoupon()}
            >
              <i className="mdi mdi-plus"></i> New Coupon
            </button>
          </div>
          <div className="col-md-6">
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
  const [currentRow, setCurrentRow] = useState(null);
  const [showCouponInfoModal, setShowCouponInfoModal] = useState(false);

  const onClickEditCoupon = (row) => {
    if (empty(row)) {
      setCurrentRow(null);
    } else {
      setCurrentRow(row);
    }
    setShowCouponInfoModal(true);
  };
  const updateCouponInfo = (params) => {
    console.log("params", params);
    show_loading(true);
    apiSubmitAdminCoupon(params)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowCouponInfoModal(false);
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

  const [confirmModalTitle, setConfirmModalTitle] = useState(
    "Are you sure to delete this coupon?"
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const onClickDeleteCoupon = (row) => {
    console.log("row, status", row);
    setCurrentRow(row);
    setConfirmModalTitle("Are you sure you want to delete?");
    setShowConfirmModal(true);
  };
  const doConfirmedAction = () => {
    let params = {
      id: currentRow["id"],
    };
    console.log("params", params);
    show_loading(true);
    apiDeleteAdminCoupon(params)
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
      <AdminCouponInfoModal
        modalTitle={!empty(currentRow) ? `Edit Coupon` : `Add Coupon`}
        isVisible={showCouponInfoModal}
        setVisibleModal={setShowCouponInfoModal}
        pageData={pageData}
        currentRow={currentRow}
        submitModalData={updateCouponInfo}
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

export default AdminCouponListTable;
