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

function TmpPasswordModal(props) {
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
      setModalData({...defaultModalData})
    }    
  }, [isVisible, pageData]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    tmp_password: "",
  };
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "tmp_password", errorList); 
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
                      <label htmlFor="">Temporary password</label>
                      <input
                        type="search"
                        autoComplete="off"
                        placeholder=" "
                        name="tmp_password"
                        className={`form-control tmp_password ${
                          errorField.includes("tmp_password")
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e) => {
                          onChangeFormField(e, "tmp_password");
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

export default TmpPasswordModal;
