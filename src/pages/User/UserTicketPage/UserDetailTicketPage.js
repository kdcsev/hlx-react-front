import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { BASE_API_URL, BASE_UPLOAD_URL } from "config/CONSTANTS";
import {
  ROUTE_USER_TEAM_DETAIL,
  ROUTE_USER_TICKET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiCloseUserTicket,
  apiGetUserTickeDetailPageDetail,
  apiGetUserTicketListPageDetail,
  apiSubmitUserTicket,
  apiSubmitUserTicketMessage,
} from "services/userTicketService";
import {
  empty,
  get_data_value,
  get_utc_timestamp,
  intval,
  isEmpty,
  showToast,
  show_loading,
  timeConverter,
  toLocalDatetime,
} from "utils/GlobalFunctions";

const UserDetailTicketPage = (props) => {
  const ticketid = props.match.params.ticketid;
  const currentPageTitle = "Ticket No #" + ticketid
  const dispatch = useDispatch();

  //////////////////////////socket part////////////////////////////////
  const userDataStore = useSelector((x) => x.userDataStore);
  const socketStore = useSelector((x) => x.socketStore);
  const socket = socketStore["socket"];
  useEffect(() => {
    if (!empty(socket)) {
      console.log("------------socketStore---------------", socketStore);
      addSocketListener();
      getTicketNewMessageList();
    }
  }, [socket, ticketid]);

  const token = get_data_value(userDataStore, "token");
  const socketHeader = { token: token };

  const [socketMessageList, setSocketMessageList] = useState([]);

  const addSocketListener = () => {
    socket.off("get_ticket_message_list");
    socket.on("get_ticket_message_list", (data) => {
      console.log(
        "-------------get_ticket_message_list reply data---------",
        data
      );
      if (parseInt(data["ticketid"]) === parseInt(ticketid)) {
        if (!empty(data)) {
          setSocketMessageList(data["ticket_message_list"]);
          socket.emit("read_ticket_message_list", {
            ...socketHeader,
            ticketid: ticketid,
          });
        }
        setTimeout(function () {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      }
    });
  };
  const [lastPostId, setLastPostId] = useState(0);
  const getTicketNewMessageList = () => {
    socket.emit("get_ticket_message_list", {
      ...socketHeader,
      last_id: lastPostId,
      ticketid: ticketid,
    });
    //setLastPostId(lastPostId + 1)
  };
  const emitNewTicketNewMessage = () => {
    socket.emit("submit_new_ticket_message", {
      ...socketHeader,
      ticketid: ticketid,
    });
  };
  ///////////////////////////end socket part/////////////////////////////

  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_USER_TICKET,
        m_user_menu_collapsed: true,
      })
    );
  };
  useEffect(() => {
    initPage();
    getData();
  }, [ticketid]);
  const history = useHistory();
  const defaultPageData = {
    user: {},
    ticket_info: {},
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserTickeDetailPageDetail(ticketid)
      .then((api_res) => {
        console.log("-----------------api_res----------------", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
          if (!empty(api_res.data["ticket_info"]["message_list"])) {
            setLastPostId(
              intval(
                api_res.data["ticket_info"]["message_list"][
                  api_res.data["ticket_info"]["message_list"].length - 1
                ]["id"]
              )
            );
          }
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "warning");
      });
  };

  const [confirmModalTitle, setConfirmModalTitle] = useState(
    "Are you sure you want to close current ticket?"
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [uploadFile, setUploadFile] = useState(null);
  const [fileUploadPlaceholder, setFileUploadPlaceholder] =
    useState("No file selected");
  const initFormData = { description: "" };
  const [formData, setFormData] = useState(initFormData);
  const [fileKey, setFileKey] = useState("upload_file");
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(formData, "description", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };
  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    let updateData = {};
    updateData[field_name] = e.target.value;
    setFormData({ ...formData, ...updateData });
  };
  const onFileInputChanged = (e) => {
    setUploadFile(e.target.files[0]);
    console.log("e", e);
    let files = e.target.files;
    if (!empty(files)) {
      setFileUploadPlaceholder(files[0].name);
    } else {
      setFileUploadPlaceholder("No file selected");
    }
  };
  const onSubmitTicketMessage = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiSubmitUserTicketMessage(
        { ...formData, ticket_id: ticketid },
        uploadFile
      )
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast(api_res.message, "success");
            setFormData(initFormData);
            setFileKey("upload_file_" + new Date().getTime());
            setUploadFile(null);
            emitNewTicketNewMessage();
          } else {
            showToast(api_res.message, "error");
          }
        })
        .catch((err) => {
          show_loading(false);
          showToast(err, "error");
        });
    }
  };
  const onCloseTicket = () => {
    setShowConfirmModal(true);
  };
  const closeTicket = () => {
    show_loading(true);
    apiCloseUserTicket(ticketid)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          dispatch(updateUser(api_res.data["user"]));
          showToast(api_res.message, "success");
          setShowConfirmModal(false);
          getData();
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  return (
    <div className="user-detail-ticket-page">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content ticket-item-container">
                {true && (
                  <div className="ticket-item">
                    <div className="ticket-row">
                      <div className="ticket-details">
                        <span className="info">
                          <i className="fa fa-clock-o"></i> Posted at:{" "}
                          <em className="ticket-timestamp unix-timestamp">
                            {timeConverter(
                              get_data_value(
                                pageData["ticket_info"],
                                "add_timestamp"
                              )
                            )}
                          </em>
                        </span>
                      </div>

                      <div className="ticket-status-box text-center">
                        <span
                          className={`ticket-status badge badge-pill badge-sm ${
                            pageData["ticket_info"]["status"] === "Opened"
                              ? "badge-gradient-danger"
                              : pageData["ticket_info"]["status"] === "Answered"
                              ? "badge-gradient-warning"
                              : pageData["ticket_info"]["status"] === "Replied"
                              ? "badge-gradient-info"
                              : pageData["ticket_info"]["status"] === "Closed"
                              ? "badge-light"
                              : "badge-warning"
                          }`}
                        >
                          {pageData["ticket_info"]["status"]}
                        </span>
                      </div>
                    </div>
                    <div className="ticket-content mt-4">
                      <h3 className="ticket-subject text-normal">
                        {pageData["ticket_info"]["title"]}
                      </h3>
                      <p className="text-normal ticket-description">
                        {pageData["ticket_info"]["description"]}
                      </p>
                      <p
                        className={`ticket-attachment ${
                          empty(pageData["ticket_info"]["attachment_path"])
                            ? "hidden"
                            : ""
                        }`}
                      >
                        <a
                          className="text-primary"
                          href={`${BASE_UPLOAD_URL}/${pageData["ticket_info"]["attachment_path"]}`}
                          target="_blank"
                          download
                          rel="noreferrer"
                        >
                          <i className="fa fa fa-cloud-download"></i> File
                          attachment
                        </a>
                        <img
                          src={`${BASE_UPLOAD_URL}/${pageData["ticket_info"]["attachment_path"]}`}
                          alt=""
                          style={{ maxwidth: "200px", display: "none" }}
                        />
                      </p>
                    </div>
                    <div className="ticket-message-container">
                      <hr
                        className={`${
                          empty(socketMessageList) ? "hidden" : ""
                        }`}
                      />
                      <div className="ticket-message-list mt-4">
                        {socketMessageList.map((info, index) => (
                          <div
                            key={index + "_" + info["id"]}
                            className={`ticket-message-item ${
                              intval(info["sender_id"]) ===
                              intval(pageData["user"]["id"])
                                ? "self"
                                : "other"
                            }`}
                          >
                            <div className="ticket-details ticket-message-time mb-2">
                              <span className="info">
                                <i className="fa fa-clock-o"></i> Replied at:{" "}
                                <em className="ticket-timestamp unix-timestamp">
                                  {timeConverter(info["add_timestamp"])}
                                </em>
                              </span>
                            </div>
                            <div className="reply-info mt-2">
                              <div className="user-avatar-name">
                                <img
                                  className="img-responsive rounded-circle bg-white"
                                  alt=""
                                  src={`/assets/global/img/${
                                    intval(info["sender_id"]) ===
                                    intval(pageData["user"]["id"])
                                      ? "default-avatar-1.png"
                                      : intval(info["sender_admin_id"]) === 1
                                      ? "admin-avatar.jpg"
                                      : "assistant-avatar.png"
                                  }`}
                                  width="40"
                                />
                                <span className="ml-2 user-name">
                                  {info["sender_name"]}
                                </span>
                              </div>
                              <p className="mt-2 ticket-message-body">
                                {info["message"]}
                              </p>
                              <p
                                className={`ticket-attachment ${
                                  empty(info["attachment_path"]) ? "hidden" : ""
                                }`}
                              >
                                <a
                                  className="text-primary"
                                  href={`${BASE_UPLOAD_URL}/${info["attachment_path"]}`}
                                  target="_blank"
                                  download=""
                                  rel="noreferrer"
                                >
                                  <i className="fa fa fa-cloud-download"></i>{" "}
                                  File attachment
                                </a>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <form
                  className={`forms ${
                    pageData["ticket_info"]["status"] === "Closed"
                      ? "hidden"
                      : ""
                  }`}
                  method="post"
                >
                  <hr />
                  <div className="form-group">
                    <label htmlFor="description">
                      Your reply: <span className="text-primary">*</span>
                    </label>
                    <textarea
                      className={`form-control description ${
                        errorField.includes("description") ? "is-invalid" : ""
                      }`}
                      id="description"
                      name="description"
                      rows="10"
                      value={formData["description"]}
                      required
                      onChange={(e) => onChangeFormField(e, "description")}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>File upload</label>
                    <div className="input-group file-upload-group col-xs-12">
                      <input
                        type="text"
                        className="form-control file-upload-info"
                        readOnly
                        placeholder={fileUploadPlaceholder}
                        style={{ borderColor: "#313452 !important" }}
                      />
                      <button
                        className="file-upload-browse btn btn-gradient-primary"
                        type="button"
                      >
                        Browse
                      </button>
                      <input
                        type="file"
                        name="upload_file"
                        className="file-upload-default upload_file"
                        data-key={fileKey}
                        key={fileKey}
                        onChange={(e) => onFileInputChanged(e)}
                      />
                    </div>
                    <p className="card-description mt-2">
                      Only allowed (JPEG, JPG, PNG)
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mt-4">
                        <div
                          className="button-group"
                          style={{ textAlign: "center" }}
                        >
                          <button
                            type="button"
                            className="mb-2 btn btn-lg1 btn-primary mr-2"
                            onClick={(e) => {
                              onSubmitTicketMessage();
                            }}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="mb-2 btn-ticket-close btn btn-lg1 btn-danger"
                            onClick={(e) => {
                              onCloseTicket();
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        content={confirmModalTitle}
        onClickYes={closeTicket}
        visibleModal={showConfirmModal}
        setVisibleModal={setShowConfirmModal}
        modalClass="user-page confirm-modal"
      />
    </div>
  );
};

export default UserDetailTicketPage;
