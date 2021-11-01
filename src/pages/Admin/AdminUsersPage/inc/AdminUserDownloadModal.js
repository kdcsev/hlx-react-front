import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  empty,
  get_data_value,
  intval,
  isEmpty,
  jQuery,
  showToast,
} from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function AdminUserDownloadModal(props) {
  const {
    isVisible,
    setVisibleModal,
    pageData,
    submitModalData,
    modalClass,
    modalTitle,
  } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setModalPageData(pageData);
    }
  }, [isVisible, pageData]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    user_name: "",
    user_email: "",
    user_password: "",
    balance: "",
  };
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const [userKind, setUserKind] = useState("");
  const userKindList = [
    { label: "All", value: "" },
    { label: "Active users", value: "active" },
    { label: "Active customers", value: "active_customer" },
    { label: "Affiliates", value: "affiliate" },
    { label: "Both", value: "both" },
    { label: "Inactive users", value: "inactive_users" },
  ];
  const onChangeUserKind = (user_kind) => {
    setUserKind(user_kind);
  };

  const onClickSubmitModal = () => {
    submitModalData(userKind);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName={modalClass}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="block text-center">
            <div className="modal-box">
              <div id="dialog">
                <div className="text-normal text-left">
                  <div className="text-left">
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <div
                          className="text-left"
                          style={{ paddingLeft: "20px" }}
                        >
                          {userKindList.map((item, index) => (
                            <div
                              className="form-check form-check-block"
                              key={index}
                            >
                              <label className="form-check-label">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="user_kind"
                                  id={`user_kind_${item["value"]}`}
                                  value={item["value"]}
                                  checked={userKind === item["value"]}
                                  onChange={(e) => {
                                    onChangeUserKind(item["value"]);
                                  }}
                                />
                                {item["label"]}
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-md btn-close-dlg btn-light margin-right-10"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-md btn-submit-modal-data btn-primary"
            onClick={onClickSubmitModal}
          >
            Download
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminUserDownloadModal;
