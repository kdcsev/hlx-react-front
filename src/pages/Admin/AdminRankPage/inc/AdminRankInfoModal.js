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
import AdminRankUserListTable from "./AdminRankUserListTable";

function AdminRankInfoModal(props) {
  const {
    modalTitle,
    isVisible,
    setVisibleModal,
    pageData,
    currentRankItem,
    modalClass,
  } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setModalPageData(pageData);
      if (!empty(currentRankItem)) {
        setModalData(currentRankItem);
      }
    }
  }, [isVisible, pageData, currentRankItem]);
  const [show, setShow] = useState(false);

  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState({});

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
          <div className="block text-left">
            <div className="modal-box">
              <div>
                <AdminRankUserListTable
                  initialTableData={modalData["user_list"]}
                  currentRankItem={currentRankItem}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-md btn-close-dlg btn-light"
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

export default AdminRankInfoModal;
