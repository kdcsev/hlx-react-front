import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { get_data_value, isEmpty, jQuery, showToast } from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function ConfirmPasswordModal(props) {
  const { isVisible, setVisibleModal, submitModalData, modalClass, modalTitle } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
    }
  }, [isVisible]);
  const [show, setShow] = useState(false);
  const defaultModalData = {user_password:""};
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);
  
  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "user_password", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    modalData[field_name] = e.target.value;
    setModalData({ ...modalData });
  };
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const submitPassword = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      submitModalData(modalData);
    } else {
      showToast("Password is empty", "error");
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
          <div className="block margin-bottom-20 text-center">
            <div className="modal-box">
              <div id="dialog">
                <div className="text-normal text-left">
                  <h4 className="text-normal">Enter your password</h4>
                  <p className="text-normal">
                    Enter your HLX Password here to reveal your VPS Password for
                    Login:
                  </p>
                  <div>
                    <input
                      type="password"
                      className={`form-control input-hlx-password ${
                        errorField.includes("user_password") ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                      value={get_data_value(modalData, "user_password")}
                      onChange={(e) => {
                        onChangeFormField(e, "user_password");
                      }}
                    />
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
            className="btn btn-md btn-submit-hlx-password btn-primary"
            onClick={submitPassword}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmPasswordModal;
