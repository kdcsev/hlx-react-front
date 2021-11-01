import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  get_data_value,
  isEmpty,
  jQuery,
  showToast,
} from "utils/GlobalFunctions";
import { APP_NAME } from "config/CONSTANTS";

function VpsInfoModal(props) {
  const { isVisible, setVisibleModal, modalData, modalClass, modalTitle } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
    }
  }, [isVisible]);
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
                <div class="text-normal text-left">
                  <p class="text-normal">
                    You will use this password every time you login to your VPS,
                  </p>
                  <p class="text-normal">
                    Please write it down and keep it in a safe place.
                  </p>
                  <p class="text-normal margin-top-10">
                    PASSWORD: <span class="vps-password">{get_data_value(modalData, 'vps_password')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-md btn-close-dlg btn-light margin-right-0"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VpsInfoModal;
