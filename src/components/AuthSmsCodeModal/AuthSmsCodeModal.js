import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmpty, jQuery, showToast } from "utils/GlobalFunctions";

function AuthSmsCodeModal(props) {
  const { isVisible, setShowconfirmModal, submitModalData, modalClass } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      if (isVisible) {
        setTimeout(function () {
          jQuery(".verification-code-item-0").focus();
        }, 300);
      }
    }
  }, [isVisible]);
  const [show, setShow] = useState(false);
  const [codeData, setCodeData] = useState([]);
  const [errorField, setErrorField] = useState([]);
  const validateFields = () => {
    var errorList = Array();
    for (var i = 0; i < 4; i++) {
      errorList = isEmpty(codeData, i, errorList);
    }
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const handleClose = () => {
    setShow(false);
    setShowconfirmModal(false);
  };

  const rows = [0, 1, 2, 3].map((val, index) => {
    return (
      <input
        key={index}
        className={`verification-code-item no-spin verification-code-item-${index}`}
        type="number"
        maxLength="1"
        size="1"
        min="0"
        max="9"
        pattern="[0-9]{1}"
        onChange={(e) => {
          onChangeCodeItemField(e, index);
        }}
      />
    );
  });

  const onChangeCodeItemField = (e, field_index) => {
    let val = e.target.value;
    let code = "";
    if(val.length > 0) {
        code = val.substr(val.length - 1); 
    }
    codeData[field_index] = code;
    setCodeData([...codeData]);
  };

  const submitVerificationCode = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
        submitModalData(codeData);
    }else {
        showToast("Please input verification code correctly", "error");
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
          <Modal.Title>Sms Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="block text-center">
            <h4 class="sms-dlg-title">Enter the 4-digit code we sent you</h4>
            <p className="text-normal margin-bottom-20 text-gray hidden">
              We sent it to +1234567890
            </p>
          </div>
          <div className="block margin-bottom-20 text-center">
            <div className="sms-verification-box four-digits-box">
              <div id="dialog">
                <div id="form" className="verification-form">
                  {rows}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn-send-auth-code btn btn-green mr-1"
            onClick={submitVerificationCode}
          >
            Done
          </button>
          <button
            type="button"
            className="btn btn-light btn-cancel-2fa"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AuthSmsCodeModal;
