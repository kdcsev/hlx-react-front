import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import {
  ROUTE_USER_ACADEMY,
  ROUTE_USER_MARKETING,
  ROUTE_USER_TEAM_DETAIL,
} from "navigation/CONSTANTS";
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

const UserTicketListTable = (props) => {
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
    apiDeleteUserPayoutRow(currentRow)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setShowConfirmModal(false);
          setTableData(api_res.data["payout_list"]);
          showToast(
            "Residual record has been deleted successfully.",
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
      name: "Title",
      selector: "title",
      sortable: false,
      cell: (row) =>
        row.id ? (
          <>
            <Link to={`/user/ticket/detail/${row.id}`} className="ticket-item">
              <div className="ticket-row">
                <div className="ticket-content">
                  <h3 className="ticket-subject text-emphasis">{row.title}</h3>
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
        noTableHead={true}
        columns={columns}
        data={filteredItems}
        defaultSortField="id"
        defaultSortAsc={false}
        subHeader
        subHeaderComponent={subHeaderComponent}
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
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

export default UserTicketListTable;
