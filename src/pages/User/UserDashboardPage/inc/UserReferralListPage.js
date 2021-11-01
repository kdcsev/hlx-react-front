import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { RULE_PERCENT } from "config/CONSTANTS";
import {
  ROUTE_USER_ACADEMY,
  ROUTE_USER_MARKETING,
  ROUTE_USER_TICKET_DETAIL,
} from "navigation/CONSTANTS";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserMarketingPageDetail,
  apiGetUserMarketingRankDetail,
} from "services/userMarketingService";
import Select from "react-select";
// import "react-select-2/dist/css/react-select-2.css";

import {
  empty,
  get_data_value,
  intval,
  is_empty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";
import { urlUserGetTreeUserList } from "services/CONSTANTS";

const currentPageTitle = "User Referral list";
const UserReferralListPage = (props) => {
  const { pageData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    updateUserSelectList();
  }, [pageData]);
  var userList = [];
  var defaultUserList = [{ value: 0, label: "All" }];

  const updateUserSelectList = () => {
    userList = defaultUserList;
    for (var key in pageData["all_personal_referrals_in_tree"]) {
      var item = pageData["all_personal_referrals_in_tree"][key];
      var option_item = { value: item["id"], label: item["user_name"] };
      userList.push(option_item);
    }
    console.log('userList', userList)
    setSelectUserList(userList);
  };
  const [selectUserList, setSelectUserList] = useState(userList);
  const [selectedUserID, setSelectedUserID] = useState(0);

  function onUserChange(val) {
    console.log("Selected: ", val);
    let newSearchVal = get_data_value(val, "value")
    let newSearchText = get_data_value(val, "label")
    if(newSearchVal === 0) {
      newSearchText = ""
    }
    setFilterText(newSearchText)
    fetchDataList(currentPage, perPage, newSearchText);

  }

  const defaultUserRankDetail = {
    user: {},
    all_personal_referrals_in_tree: [],
    missing_rank_list: {},
    missing_rank_message: "",
    next_rank_info: {},
    rank_info: {},
    rank_rule_list: {},
    tree_info: [],
    user_base_tree: [],
    destination_personal_referrals: 0,
    personal_referrals: 0,
    error_msg_arr: [],
    error_msg: "",
  };
  const [selectedUserItem, setSelectedUserItem] = useState({});
  const [selectedUserRankDetail, setSelectedUserRankDetail] = useState(
    defaultUserRankDetail
  );
  const [showRankModal, setShowRankModal] = useState(false);

  const onClickUserRank = (item) => {
    console.log("item", item);

    setSelectedUserItem(item);
    var user_id = item["id"];
    show_loading(true);
    apiGetUserMarketingRankDetail(user_id)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setSelectedUserRankDetail(api_res.data);
          setShowRankModal(true);
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [currentSortField, setCurrentSortField] = useState("add_timestamp");
  const [currentSortDirection, setCurrentSortDirection] = useState("asc");
  const [userType, setUserType] = useState("personal_referral");

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
      `${urlUserGetTreeUserList}?page=${page}&per_page=${size}&keyword1=${searchText}&sort_column=${sortColumn}&sort_direction=${sortDirection}&user_kind=${userKind}`
    );

    setData(response.data.data);
    setTotalRows(response.data.total);
    show_loading(false);
  };

  useEffect(() => {
    if(!empty(pageData['user'])){
      fetchDataList(1);
    }
  }, [pageData]);

  //const history = useHistory();
  const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(
      newArray.findIndex((a) => a === item),
      1
    );

    return newArray;
  };

  const handleDelete = useCallback(
    (row) => async () => {},
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
        name: "USERNAME",
        selector: "user_name",
        sortable: false,
      },
      {
        name: "STATUS",
        selector: "status",
        sortable: false,
        cell: (row) => (
          <span
            className={`text-bold ${row["status_class"]}`}
            data-user-type={row["user_type"]}
          >
            {row["status"]}
          </span>
        ),
      },
      {
        name: "LANE",
        selector: "lane_number",
        sortable: false,
        omit: true,
      },
      {
        name: "RANK",
        selector: "user_name",
        sortable: false,
        omit: true,
        cell: (row) => (
          <>
            <button
              className={`a-btn btn-view-user-rank-info btn-user-rank1 badge badge-sm badge-success badge-rounded text-center ${
                intval(row["user_type"]) === 1 ? "" : "hidden"
              }`}
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
              onClick={(e) => {
                onClickUserRank(row);
              }}
            >
              {get_data_value(row["rank_info"], "rank_name", "NO RANK")}
            </button>
            <span
              className={`text-bold text-success ${
                intval(row["user_type"]) === 1 ? "hidden" : ""
              }`}
            >
              NONE
            </span>
          </>
        ),
      },
      {
        name: "GO TO",
        selector: "id",
        sortable: false,
        omit: true,
        cell: (row) => (
          <Link
            className="a-btn badge badge-sm badge-success badge-rounded text-center"
            to={`/user/team/detail/${row["id"]}`}
            style={{ minWidth: "50px" }}
          >
            GO
          </Link>
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

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: "#f16857",
          color: "white",
        },
        ":hover": {
          ...styles[":active"],
          backgroundColor: "#f16857",
          color: "white",
        },
      };
    },
    input: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
    placeholder: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "black",
    }),
  };

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
          <div className="col-md-4">
            <form className="navbar-form margin-0" role="search">
              <div
                className="form-group form-search is-empty"
                style={{
                  position: "relative",
                  maxWidth: "360px",
                  paddingRight: "50px",
                }}
              >
                <Select
                  className="select2-box basic-single"
                  classNamePrefix="select"
                  defaultValue={defaultUserList[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="color"
                  options={selectUserList}
                  styles={colorStyles}
                  onChange={onUserChange}
                />
              </div>
            </form>
          </div>
          <div className="col-md-8 hidden">
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
                  className="btn btn-sm btn-secondary"
                  onClick={(e) => onChangeUserType("personal_referral")}
                >
                  My Personals
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
              </div>
            </div>
            <div className="datatable-filter-box hidden">
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
  }, [filterText, resetPaginationToggle, selectUserList]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="card-content affiliate-only-screen">
              <div className="block padding-bottom-5 padding-top-5">
                <h4 className="text-normal mb-3">Your Personal Referrals:</h4>
              </div>
              <div className="divider-1 mb-4"></div>

              <div className="row">
                <div className="col-md-12">
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
                      paginationPerPage={perPage}
                      paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReferralListPage;
