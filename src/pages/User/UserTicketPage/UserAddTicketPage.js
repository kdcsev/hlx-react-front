import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import { ROUTE_USER_TEAM_DETAIL, ROUTE_USER_TICKET } from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import {
  apiGetUserTicketListPageDetail,
  apiSubmitUserTicket,
} from "services/userTicketService";
import { empty, isEmpty, showToast, show_loading } from "utils/GlobalFunctions";

const currentPageTitle = "New Ticket";
const UserAddTicketPage = () => {
  const dispatch = useDispatch();
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
  }, []);
  const history = useHistory();
  const defaultPageData = {
    user: {},
    ticket_list: [],
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const getData = () => {
    show_loading(true);
    apiGetUserTicketListPageDetail()
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          dispatch(updateUser(api_res.data["user"]));
        } else {
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const [uploadFile, setUploadFile] = useState(null);
  const [fileUploadPlaceholder, setFileUploadPlaceholder] = useState("No file selected")
  const initFormData = { title: "", description: "" };
  const [formData, setFormData] = useState(initFormData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(formData, "title", errorList);
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
  const onFileInputChanged = (e) =>{
    setUploadFile(e.target.files[0]);
    console.log('e', e)
    let files = e.target.files;
    if(!empty(files)){
      setFileUploadPlaceholder(files[0].name)
    }else{
      setFileUploadPlaceholder("No file selected")
    }
  }
  const onSubmitTicket = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiSubmitUserTicket(formData, uploadFile)
        .then((api_res) => {
          console.log("api_res", api_res);
          show_loading(false);
          if (api_res.status === "1") {
            dispatch(updateUser(api_res.data["user"]));
            showToast("New ticket has been submitted successfully", "success")
            history.push(ROUTE_USER_TICKET) /////////////////
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

  return (
    <div className="user-add-ticket-page">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title t-show-mobile">{currentPageTitle}</h4>
              <div className="card-content">
                <div className="alert alert-warning mb-5" role="alert">
                  <div className="note mb-0 text-center">
                    <p>
                      If you have any questions or you need any assistance,
                      please send us a support ticket and we will get back to
                      you as soon as possible.
                      <br />
                      We will notify you in email and our response can be found
                      at the top of your backoffice where the message icon is.
                    </p>
                    <p>
                      Be sure to include a detailed description of your question
                      or issue, you can even attach files.
                      <br />
                      We answer customer tickets Monday to Friday / 10am - 5pm
                      PST.
                    </p>
                  </div>
                </div>

                <form className="forms" method="post">
                  <div className="form-group">
                    <label htmlFor="title">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errorField.includes("title") ? "is-invalid" : ""
                      }`}
                      id="title"
                      name="title"
                      required
                      onChange={(e) => onChangeFormField(e, "title")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">
                      Description <span className="text-primary">*</span>
                    </label>
                    <textarea
                      className={`form-control description ${
                        errorField.includes("description") ? "is-invalid" : ""
                      }`}
                      id="description"
                      name="description"
                      rows="10"
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
                              onSubmitTicket();
                            }}
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="mb-2 btn btn-lg1 btn-light"
                          >
                            Cancel
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
    </div>
  );
};

export default UserAddTicketPage;
