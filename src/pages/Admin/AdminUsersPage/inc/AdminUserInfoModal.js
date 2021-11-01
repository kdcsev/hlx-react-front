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

function AdminUserInfoModal(props) {
  const {
    isVisible,
    setVisibleModal,
    pageData,
    currentRow,
    submitModalData,
    modalClass,
    modalTitle,
  } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setModalPageData(pageData);
      if(!empty(currentRow)){
        setModalData({...defaultModalData, ...currentRow, user_password: "" })
      }
    }    
  }, [isVisible, pageData, currentRow]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    user_name: "",
    user_email: "",
    user_first_name: "",
    user_last_name: "",
    user_password: "",
    balance:""
  };
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "user_email", errorList); 
    errorList = isEmpty(modalData, "user_first_name", errorList); 
    errorList = isEmpty(modalData, "user_last_name", errorList); 
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    let updateData = {}
    updateData[field_name] = e.target.value;
    setModalData({ ...modalData, ...updateData });
  };
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const onClickSubmitModal = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      submitModalData({...modalData, user_id: currentRow['id']});
    }
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
                    <div className="form-group">
                      <label htmlFor="">Username</label>
                      <input
                        type="text"
                        name="user_name"
                        className={`form-control`}
                        defaultValue={get_data_value(currentRow, "user_name")}
                        readOnly={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder=" "
                        name="user_first_name"
                        className={`form-control user_first_name ${
                          errorField.includes("user_first_name")
                            ? "is-invalid"
                            : ""
                        }`}
                        value={modalData['user_first_name']}
                        onChange={(e) => {
                          onChangeFormField(e, "user_first_name");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder=" "
                        name="user_last_name"
                        className={`form-control user_last_name ${
                          errorField.includes("user_last_name")
                            ? "is-invalid"
                            : ""
                        }`}
                        value={modalData['user_last_name']}
                        onChange={(e) => {
                          onChangeFormField(e, "user_last_name");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        autoComplete="off"
                        placeholder=" "
                        name="user_email"
                        className={`form-control user_email ${
                          errorField.includes("user_email")
                            ? "is-invalid"
                            : ""
                        }`}
                        value={modalData['user_email']}
                        onChange={(e) => {
                          onChangeFormField(e, "user_email");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Wallet Amount ($)</label>
                      <input
                        type="number"
                        placeholder=" "
                        min='0'
                        step='0.01'
                        name="balance"
                        className={`form-control balance ${
                          errorField.includes("balance")
                            ? "is-invalid"
                            : ""
                        }`}
                        value={modalData['balance']}
                        onChange={(e) => {
                          onChangeFormField(e, "balance");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="search"
                        autoComplete="off"
                        placeholder=" "
                        name="user_password"
                        className={`form-control user_password ${
                          errorField.includes("user_password")
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e) => {
                          onChangeFormField(e, "user_password");
                        }}
                      />
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
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminUserInfoModal;
