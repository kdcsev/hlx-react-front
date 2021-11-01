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

function AdminTankUserListModal(props) {
  const {
    isVisible,
    setVisibleModal,
    modalData,
    submitModalData,
    modalClass,
    modalTitle,
  } = props;

  const [selectedUserID, setSelectedUserID] = useState(0);

  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setSelectedUserID(intval(get_data_value(modalData[0], 'id')))
    }
  }, [isVisible, modalData]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    selected_user_id: "",
  };
  const [modalPageData, setModalPageData] = useState(defaultModalData);

  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const onClickSubmitModal = () => {
    submitModalData(selectedUserID);
  };

  const onChangeSelectedTankUser = (event) => {
    let value = event.target.value
    console.log("value", value);
    setSelectedUserID(value)
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
                  <div className="table-responsive">
                    <table className="table table-striped12">
                      <thead>
                        <tr>
                          <th></th>
                          <th>User Name</th>
                          <th>Avatar</th>
                          <th className="hidden">Email</th>
                          <th className="hidden">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalData.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    type="radio"
                                    id={`tank-user-id-${item["id"]}`}
                                    name="tank-user-id"
                                    className="form-check-input"
                                    value={`${item['id']}`}
                                    defaultChecked={index === 0 ? true : false}
                                    onChange={(e) => {
                                      onChangeSelectedTankUser(e);
                                    }}
                                  />
                                  <i className="input-helper"></i>
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor={`tank-user-id-${item["id"]}`}>
                                {item["user_name"]}
                              </label>
                            </td>
                            <td>
                              <label
                                htmlFor={`tank-user-id-${item["id"]}`}
                                className="mb-0 margin-bottom-0"
                              >
                                <img
                                  src="/assets/global/img/default-avatar-1.png?v=1"
                                  alt=""
                                />
                              </label>
                            </td>
                            <td className="hidden"></td>
                            <td className="hidden"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
            onClick={onClickSubmitModal}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminTankUserListModal;
