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
  show_loading,
  to_array,
} from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";
import TwoFactorCodeModal from "components/TwoFactorCodeModal/TwoFactorCodeModal";
import { apiUserCancelVerification, apiUserCompleteVerification } from "services/userVerificationService";

function TwoFactQRCodeModal(props) {
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
  const defaultModalData = {};
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "payout_amount", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const [showVerificationCodeModal, setShowVerificationCodeModal] = useState(false);

  const showTwoFactVerificationDlg = () => {
    setShowVerificationCodeModal(true)
    handleClose()
  };

  const submitVerificationCodeData = (codeData) => {
    let codeStr = to_array(codeData).join("");
    console.log("codeStr", codeStr);
    show_loading(true);
    let params = {
      secret: pageData['two_fact_secret'],
      otp:codeStr
    }
    apiUserCompleteVerification(params)
      .then((api_res) => {
        if (api_res.status === "1") {
          showToast(api_res.message, 'success');
          setShowVerificationCodeModal(false)
          submitModalData(true)
        } else {
          show_loading(false);
          showToast(api_res.message, "error");
        }
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
  };

  const cancelTwoStepVerification = () => {
    show_loading(true);
    apiUserCancelVerification()
      .then((api_res) => {
        show_loading(false);
        handleClose()
      })
      .catch((err) => {
        show_loading(false);
        showToast(err, "error");
      });
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
          <Modal.Title>Configure Two-Step Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="block text-center">
            <div className="modal-box">
              <div id="dialog">
                <div className="2fa-qr-code-dlg-content padding-10">
                  <div className="block mb-4">
                    <p>
                      Use your preferred application from App Store or Google
                      Play and set up an account by scanning the QR code or
                      entering the key.
                    </p>
                  </div>
                  <div className="block text-center mb-4">
                    <div className="img-wrapper text-center">
                      <img
                        className="img-responsive img-qr-code"
                        style={{
                          width: "180px",
                          height: "180px",
                          background: "#b4b4b4",
                        }}
                        src={get_data_value(pageData, "two_fact_qr_code_url")}
                        alt="QR Code"
                      />
                    </div>
                  </div>
                  <div className="block text-center mb-4">
                    <p className="text-gray">
                      Key: &nbsp;
                      <span
                        className="text-white qr-code-value"
                        style={{ fontSize: "1.15rem" }}
                      >
                        {get_data_value(pageData, "two_fact_secret")}
                      </span>
                    </p>
                  </div>
                  <div className="alert alert-warning mb-4" role="alert">
                    <div className="note mb-0 text-center">
                      <p>
                        IMPORTANT: Do NOT lose this code! Store it in a safe
                        place!
                      </p>
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
            onClick={(e) => {
              cancelTwoStepVerification();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-md btn-submit-hlx-withdrawal-request btn-primary"
            onClick={(e) => {
              showTwoFactVerificationDlg();
            }}
          >
            Continue
          </button>
        </Modal.Footer>
      </Modal>

      {showVerificationCodeModal && (
          <TwoFactorCodeModal
            isVisible={showVerificationCodeModal}
            setShowconfirmModal={setShowVerificationCodeModal}
            submitModalData={submitVerificationCodeData}
            onCancelModal={cancelTwoStepVerification}
            modalClass="user-page two-fact-verification-code-dlg"
          />
        )}
    </>
  );
}

export default TwoFactQRCodeModal;
