import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  empty,
  isEmpty,
  is_empty,
  jQuery,
  showToast,
} from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function ConfirmModal(props) {
  const {
    title,
    content,
    onClickYes,
    textBtnYes,
    hideBtnYes,
    onClickNo,
    textBtnNo,
    hideBtnNo,
    visibleModal,
    setVisibleModal,
    modalClass,
  } = props;
  useEffect(() => {
    if (visibleModal !== undefined) {
      setShow(visibleModal);
    }
  }, [visibleModal]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={modalClass}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{is_empty(title) ? `Log Out` : title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center modal-content-body">
            <div className="text-normal">{!empty(content) ? content : `Are you sure you want to log out?`}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        
        <button
            type="button"
            className={`btn btn-primary mr-1 ${hideBtnNo ? "hidden" : ""}`}
            data-dismiss="modal"
            onClick={(e) => {
              !empty(onClickNo) ? onClickNo() : handleClose();
            }}
          >
            {is_empty(textBtnNo) ? "No" : textBtnNo}
          </button>
        <button
            type="button"
            className={`btn btn-success ${hideBtnYes ? "hidden" : ""}`}
            onClick={(e) => {
              !empty(onClickYes) ? onClickYes() : handleClose();
            }}
          >
            {is_empty(textBtnYes) ? "Yes" : textBtnYes}
          </button>
          
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
