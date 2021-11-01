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

function WithdrawalRequestModal(props) {
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
      setModalData({...defaultModalData, payout_amount:get_data_value(pageData['user'],'balance')})
    }    
  }, [isVisible, pageData]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    payout_amount: "",
    paypal_address: "",
    paypal_address_c: "",
  };
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "payout_amount", errorList);
    errorList = isEmpty(modalData, "paypal_address", errorList);
    errorList = isEmpty(modalData, "paypal_address_c", errorList);
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

  const onClickWithdrawalRequest = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      if(parseFloat(modalData['payout_amount']) < 50){
        setErrorField(["payout_amount"]);
        showToast("Minimum withdrawal amount is $50.", "error")
        return false;
      }
      if(parseFloat(modalData['payout_amount']) > parseFloat(get_data_value(modalPageData['user'], 'balance'))){
        setErrorField(["payout_amount"]);
        showToast("The requested amount is more than your available funds.", "error")
        return false;
      }
      if(modalData['paypal_address'] !== modalData['paypal_address_c']){
        setErrorField(["paypal_address", "paypal_address_c"]);
        showToast("Incorrect Paypal address.", "error")
        return false
      }
      submitModalData(modalData);
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
                  <div className="payout-dlg text-left">
                    <div className="form-group">
                      <label htmlFor="">Withdrawal Amount</label>
                      <input
                        type="number"
                        name="payout_amount"
                        className={`form-control payout-amount ${
                          errorField.includes("payout_amount")
                            ? "is-invalid"
                            : ""
                        }`}
                        min="0"
                        step="0.01"
                        defaultValue={get_data_value(modalPageData['user'], "balance")}
                        onChange={(e) => {
                          onChangeFormField(e, "payout_amount");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Your PayPal Email</label>
                      <input
                        type="search"
                        autoComplete="off"
                        placeholder="Your paypal email"
                        name="paypal_address"
                        className={`form-control paypal_address ${
                          errorField.includes("paypal_address")
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e) => {
                          onChangeFormField(e, "paypal_address");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Confirm Your PayPal Email</label>
                      <input
                        type="search"
                        autoComplete="off"
                        placeholder="Confirm your paypal email"
                        name="paypal_address_c"
                        className={`form-control paypal_address_c ${
                          errorField.includes("paypal_address_c")
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={(e) => {
                          onChangeFormField(e, "paypal_address_c");
                        }}
                      />
                    </div>
                    <div className="alert alert-warning mb-1" role="alert">
                      <div className="note mb-0 text-left">
                        <p style={{ color: "#f5c672" }}>
                          Please make sure you provide us with the correct
                          PayPal email address so your funds can arrive as soon
                          as possible.
                        </p>
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
            className="btn btn-md btn-submit-hlx-withdrawal-request btn-primary"
            onClick={onClickWithdrawalRequest}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WithdrawalRequestModal;
