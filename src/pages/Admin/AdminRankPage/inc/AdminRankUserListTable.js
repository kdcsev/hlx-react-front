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
import { apiDeleteUserPayoutRow } from "services/userWalletService";

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

const AdminRankUserListTable = (props) => {
  const { initialTableData, currentRankItem } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setTableData(initialTableData);
  }, [initialTableData]);
  //const history = useHistory();
  const [tableData, setTableData] = useState(initialTableData);

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      omit:true
    },
    {
      name: "Rank",
      selector: "rank_name",
      sortable: false,
    },
    {
      name: "Username",
      selector: "user_name",
      sortable: true,
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
      <div className="datatable-subheader">
        <div className="row">
          <div className="col-md-6">
            <div className="people-count m-text-center">
              Peoples: &nbsp; <span>{currentRankItem["count"]}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="datatable-filter-box">
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
            </div>
          </div>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="datatable-wrapper p-0">
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
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </div>
  );
};

export default AdminRankUserListTable;
