import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmpty, is_empty, jQuery, showToast } from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function AlertModal(props) {
  const { title, content, onClickYes, textBtnYes, visibleModal, setVisibleModal, modalClass } = props;
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
          <Modal.Title>{ is_empty(title) ? APP_NAME : title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center modal-content-body">
            <p className="text-normal">
              {content}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={onClickYes}
          >
            { is_empty(textBtnYes) ? "Yes" : textBtnYes }
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;
