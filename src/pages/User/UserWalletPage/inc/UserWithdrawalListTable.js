import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import { ROUTE_USER_ACADEMY, ROUTE_USER_MARKETING } from "navigation/CONSTANTS";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserMarketingPageDetail,
  apiGetUserMarketingRankDetail,
} from "services/userMarketingService";
import {
  apiDeleteUserPayoutRow,
  apiDeleteUserWithdrawalRow,
} from "services/userWalletService";

import {
  empty,
  get_data_value,
  intval,
  is_empty,
  jQuery,
  showToast,
  show_loading,
  toLocalDatetime,
} from "utils/GlobalFunctions";

const UserWithdrawalListTable = (props) => {
  const { initialTableData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);
  //const history = useHistory();
  const [tableData, setTableData] = useState(initialTableData);
  const [confirmModalTitle, setConfirmModalTitle] = useState(
    "Are you sure to delete this record?"
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  const onClickDeleteRow = (row) => {
    console.log("row", row);
    setCurrentRow(row);
    setShowConfirmModal(true);
  };
  const deleteRow = () => {
    console.log("selected row", currentRow);
    show_loading(true);
    apiDeleteUserWithdrawalRow(currentRow)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowConfirmModal(false);
          setTableData(api_res.data["withdraw_list"]);
          showToast(
            "Withdrawal request has been deleted successfully",
            "success"
          );
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status_str",
      sortable: true,
      cell: (row) => (
        <>
          <span
            className={`badge badge-sm ${
              row.status === 0
                ? "badge-primary"
                : row.status === 1
                ? "badge-success"
                : row.status === 2
                ? "badge-danger"
                : row.status === 3
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {row.status_str}
          </span>
        </>
      ),
    },
    {
      name: "Processing Time",
      selector: "processing_time",
      sortable: true,
      cell: (row) =>
        row.processing_time > 0 ? (
          <>
            <span className="hidden">{row.processing_time}</span>
            {toLocalDatetime(row.processing_time)}
          </>
        ) : null,
    },
    {
      name: "Created At",
      selector: "add_timestamp",
      sortable: true,
      hide: "md",
      cell: (row) =>
        row.add_timestamp > 0 ? (
          <>
            <span className="hidden">{row.add_timestamp}</span>
            {toLocalDatetime(row.add_timestamp)}
          </>
        ) : null,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <button
            className="btn btn-xs btn-danger"
            onClick={() => onClickDeleteRow(row)}
          >
            <i className="fa fa-times"></i>
          </button>
        </>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = tableData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={filterText}
          className="form-control input-search"
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button className="a-btn btn-clear-search" onClick={handleClear}>
          x
        </button>
      </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <DataTable
        theme="dark"
        noHeader={true}
        columns={columns}
        data={filteredItems}
        defaultSortField="id"
        defaultSortAsc={true}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
        paginationRowsPerPageOptions={[5,10,25,50,100]}
      />
      <ConfirmModal
        content={confirmModalTitle}
        onClickYes={deleteRow}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page confirm-modal"
      />
    </>
  );
};

export default UserWithdrawalListTable;
