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

function AdminCouponInfoModal(props) {
  const {
    isVisible,
    setVisibleModal,
    pageData,
    currentRow,
    submitModalData,
    modalClass,
    modalTitle,
  } = props;

  const coupon_options = [
    {
      label: "14 Day Trial Coupon Code",
      value: 14,
    },
    {
      label: "30 Day Trial Coupon Code",
      value: 30,
    },
  ];

  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setModalPageData(pageData);
      if (!empty(currentRow)) {
        setModalData({ ...defaultModalData, ...currentRow });
      } else {
        setModalData({ ...defaultModalData });
      }
    }
  }, [isVisible, pageData, currentRow]);
  const [show, setShow] = useState(false);
  const defaultModalData = {
    name: "",
    type: coupon_options[0]["value"],
  };
 
  const [modalPageData, setModalPageData] = useState({});
  const [modalData, setModalData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(modalData, "name", errorList);
    errorList = isEmpty(modalData, "type", errorList);
    setErrorField([...errorList]);
    return errorList.length > 0 ? false : true;
  };

  const onChangeFormField = (e, field_name) => {
    if (errorField.includes(field_name)) {
      let errors = errorField.filter((x) => x != field_name);
      setErrorField([...errors]);
    }
    let updateData = {};
    updateData[field_name] = e.target.value;
    setModalData({ ...modalData, ...updateData });
  };
  const handleClose = () => {
    setShow(false);
    setVisibleModal(false);
  };

  const onClickSubmitModal = () => {
    let is_valid = validateFields();
    if (is_valid) {
      let submitData = {
        ...modalData,
        id: empty(currentRow) ? 0 : currentRow["id"],
      }
      submitData['type_desc'] = submitData['type'] + " Day Trial Coupon Code";    
      submitModalData(submitData);
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
                      <label htmlFor="">Coupon Code</label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder=" "
                        name="name"
                        className={`form-control name ${
                          errorField.includes("name") ? "is-invalid" : ""
                        }`}
                        value={modalData["name"]}
                        onChange={(e) => {
                          onChangeFormField(e, "name");
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Coupon Type</label>
                      <select
                        className={`form-control type ${
                          errorField.includes("type") ? "is-invalid" : ""
                        }`}
                        name="type"
                        value={modalData["type"]}
                        onChange={(e) => {
                          onChangeFormField(e, "type");
                        }}
                      >
                        {coupon_options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
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
            onClick={(e)=>{onClickSubmitModal()}}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminCouponInfoModal;
