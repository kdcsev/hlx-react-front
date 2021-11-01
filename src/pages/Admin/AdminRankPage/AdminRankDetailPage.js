import ConfirmModal from "components/ConfirmModal/ConfirmModal";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import {
  ROUTE_ADMIN_FEED,
  ROUTE_ADMIN_FEED_DETAIL,
  ROUTE_ADMIN_RANK,
  ROUTE_ADMIN_TICKET,
  ROUTE_ADMIN_USERS,
  ROUTE_USER_ACADEMY,
  ROUTE_USER_PAYMENT,
  ROUTE_USER_WALLET,
} from "navigation/CONSTANTS";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UpdateAppData } from "redux/actions/appActions";
import { updateUser } from "redux/actions/userActions";
import { apiAdminGetProfileInfo } from "services/adminCommonService";
import { apiGetAdminFeedDetailPageDetail, apiSubmitAdminFeed } from "services/adminFeedService";
import {
  empty,
  get_data_value,
  isEmpty,
  showToast,
  show_loading,
} from "utils/GlobalFunctions";

import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BASE_API_URL } from "config/CONSTANTS";

const currentPageTitle = "Rank";
const AdminRankDetailPage = (props) => {
  const rankno = props.match.params.rankno;
  const dispatch = useDispatch();
  const userDataStore = useSelector((x) => x.userDataStore);
     
  const initPage = () => {
    dispatch(
      UpdateAppData({
        currentPageTitle: currentPageTitle,
        current_route: ROUTE_ADMIN_RANK,
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
    feed_info:{}
  };
  const [pageData, setPageData] = useState(defaultPageData);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const getData = () => {
    show_loading(true);
    apiGetAdminFeedDetailPageDetail(rankno)
      .then((api_res) => {
        console.log("api_res", api_res);
        show_loading(false);
        if (api_res.status === "1") {
          setPageData(api_res.data);
          setSubject(api_res.data["feed_info"]["subject"]);
          setMessage(api_res.data["feed_info"]["message"]);
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

  const onChangeSubject = (e) => {
    const val = e.target.value 
    if (errorField.includes('subject')) {
      let errors = errorField.filter((x) => x != 'subject');
      setErrorField([...errors]);
    }
    setSubject(val);
  };
  const onChangeMessage = (event, editor) => {
    const val = editor.getData()
    if (errorField.includes('message')) {
      let errors = errorField.filter((x) => x != 'message');
      setErrorField([...errors]);
    }
    setMessage(val);
  };

  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    if(empty(subject)){
      errorList.push('subject');
    }
    if(empty(message)){
      errorList.push('message');
    }
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  return (
    <>
      <AdminLayout>
        <div className="feed-detail-page">
          <div className={`row`}>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title t-show-mobile">
                    {currentPageTitle}
                  </h4>
                  <div className="card-content">
                    <div className="forms-sample">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Input subject"
                          className={`form-control user_email ${
                            errorField.includes("subject") ? "is-invalid" : ""
                          }`}
                          id="subject"
                          name="subject"
                          value={subject}
                          onChange={(e) => {
                            onChangeSubject(e);
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className={`feed-detail-container ${
                            errorField.includes("message") ? "has-error" : ""
                          }`}>
                      <CKEditor
                        onReady={(editor) => {
                          console.log("Editor is ready to use!", editor);

                          // Insert the toolbar before the editable area.
                          editor.ui
                            .getEditableElement()
                            .parentElement.insertBefore(
                              editor.ui.view.toolbar.element,
                              editor.ui.getEditableElement()
                            );
                          //this.editor = editor;
                        }}
                        onError={({ willEditorRestart }) => {
                          // If the editor is restarted, the toolbar element will be created once again.
                          // The `onReady` callback will be called again and the new toolbar will be added.
                          // This is why you need to remove the older toolbar.
                          if (willEditorRestart) {
                            this.editor.ui.view.toolbar.element.remove();
                          }
                        }}
                        onChange={(event, editor) =>
                          onChangeMessage(event, editor)
                        }
                        editor={DecoupledEditor}
                        data={message}
                        config={{
                          // toolbar: [ 'bold', 'italic' ],
                          ckfinder: {
                            uploadUrl: BASE_API_URL + "/upload-image",
                          },
                        }}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group mt-4">
                          <div className="button-group text-center" >
                            <button
                              type="button"
                              className="mb-2 btn btn-lg1 btn-primary mr-2"
                          
                            >
                              Submit
                            </button>
                            <button
                              type="reset"
                              className="mb-2 btn btn-lg1 btn-light"
                              onClick={(e)=>{getData()}}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminRankDetailPage;
