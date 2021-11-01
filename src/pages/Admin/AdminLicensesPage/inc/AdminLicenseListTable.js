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
import { urlAdminDeleteUser, urlAdminGetLicensesList } from "services/CONSTANTS";
 
import {
  apiAdminSetUserTmpPassword,
  apiAdminUpdateUserInfo,
  apiAdminUpdateUserStatus,
} from "services/adminUsersService";

const AdminLicenseListTable = (props) => {
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
  ) => {
    show_loading(true);

    const response = await axios.get(
      `${urlAdminGetLicensesList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}`
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
        `${urlAdminGetLicensesList}?page=${currentPage}&per_page=${perPage}&keyword1=${filterText}&sort_column=${currentSortField}&sort_direction=${currentSortDirection}`
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
      },
      {
        name: "User Name",
        selector: "user_name",
        sortable: true,
        cell: (row) => <span>{empty(row.user_name) ? "User Deleted" : row.user_name}</span>,
      },
      {
        name: "License Number",
        selector: "license_number",
        sortable: true,
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
    </>
  );
};

export default AdminLicenseListTable;
