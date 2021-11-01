import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { get_data_value, isEmpty, jQuery, showToast } from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function LicenseInfoModal(props) {
  const { isVisible, setVisibleModal, submitModalData, modalInitialData, modalClass, modalTitle } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setModalData(modalInitialData)
    }
  }, [isVisible, modalInitialData]);
  const [show, setShow] = useState(false);
  const defaultModalData = modalInitialData;
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);
  
  const validateFields = () => {
    // console.log('modalData', modalData)
    // var errorList = Array();
    // errorList = isEmpty(modalData, "license_number", errorList);
    // setErrorField([...errorList]);
    // return errorList.length > 0 ? false : true;
    return true
  };

  const onChangeFormField = (e, field_name) => {
    // if (errorField.includes(field_name)) {
    //   let errors = errorField.filter((x) => x != field_name);
    //   setErrorField([...errors]);
    // }
    modalData[field_name] = e.target.value;
    setModalData({ ...modalInitialData, ...modalData });
  };
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const onSubmitModalData = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      submitModalData(modalData);
    } else {
      showToast("License number is empty", "error");
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
                  <label className="text-normal">
                  Broker Number
                  </label>
                  <div>
                    <input
                      type="text"
                      className={`form-control ${
                        errorField.includes("license_number") ? "is-invalid" : ""
                      }`}
                      placeholder="Broker Number"
                      value={get_data_value(modalData, "license_number")}
                      onChange={(e) => {
                        onChangeFormField(e, "license_number");
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
            className="btn btn-md btn-primary"
            onClick={onSubmitModalData}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LicenseInfoModal;
