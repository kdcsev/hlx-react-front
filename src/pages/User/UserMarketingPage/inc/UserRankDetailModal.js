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
import { APP_NAME, RULE_PERCENT } from "config/CONSTANTS";

function UserRankDetailModal(props) {
  const {
    isVisible,
    setVisibleModal,
    submitModalData,
    modalInitialData,
    modalClass,
    modalTitle,
  } = props;
  useEffect(() => {
    if (isVisible !== undefined) {
      setShow(isVisible);
      setPageData(modalInitialData);
    }
  }, [isVisible, modalInitialData]);
  const [show, setShow] = useState(false);
  const defaultModalData = modalInitialData;
  const [pageData, setPageData] = useState(defaultModalData);
  const [errorField, setErrorField] = useState([]);

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
          <div className="block text-center">
            <div className="modal-box">
              <div id="dialog">
                <div className="text-normal text-left">
                  <div className="card text-left">
                    <div className="card-body">
                      <h4 className="card-title t-show-mobile"> </h4>
                      <div className="card-content affiliate-only-screen">
                        <div className="block padding-bottom-5 padding-top-5">
                          <h4 className="text-normal mb-3">
                            User's current rank:{" "}
                            <span className="text-success">
                              {get_data_value(
                                pageData["rank_info"],
                                "rank_name",
                                " "
                              )}
                            </span>
                          </h4>
                          <h4 className="text-normal mb-3">
                            User's next rank:{" "}
                            <span className="text-warning">
                              {get_data_value(
                                pageData["next_rank_info"],
                                "rank_name",
                                " "
                              )}
                            </span>
                          </h4>
                        </div>
                        <div className="divider-1 mb-4"></div>
                        <h4 className="text-normal mb-4">Requirements:</h4>
                        <h4 className="text-normal personal-referrals mb-4">
                          Personal Referrals:{" "}
                          <span
                            className={`current-value ${
                              empty(pageData["error_msg"])
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {pageData["personal_referrals"]}
                          </span>
                          <span className="text-success"> / </span>
                          <span className="destination-value text-success">
                            {pageData["destination_personal_referrals"]}
                          </span>
                          <span
                            className={`pl-3 text-danger ${
                              empty(pageData["error_msg"]) ? "hidden" : ""
                            }`}
                          >
                            {pageData["error_msg"]}
                          </span>
                          <span className="pl-3">
                            <i
                              className={`text-bold ${
                                empty(pageData["error_msg"])
                                  ? "text-success"
                                  : "text-danger"
                              } ${
                                empty(pageData["error_msg"])
                                  ? "ti-check"
                                  : "ti-close"
                              }`}
                            ></i>
                          </span>
                        </h4>

                        <h4
                          className={`text-normal personal-referrals mb-4 ${
                            intval(get_data_value(pageData["next_rank_info"], "rank_no")) < 8
                              ? ""
                              : "hidden"
                          }`}
                        >
                          Additional Requirements:{" "}
                          <span className="destination-value text-success">
                            {get_data_value(
                              pageData["next_rank_info"],
                              "description"
                            )}
                          </span>
                          <span
                            className={`pl-3 text-danger ${
                              empty(pageData["missing_rank_message"])
                                ? "hidden"
                                : ""
                            }`}
                          >{`(You need ${pageData["missing_rank_message"]})`}</span>
                          <span className="pl-3">
                            <i
                              className={`text-bold ${
                                empty(pageData["missing_rank_message"])
                                  ? "text-success"
                                  : "text-danger"
                              } ${
                                empty(pageData["missing_rank_message"])
                                  ? "ti-check"
                                  : "ti-close"
                              }`}
                            ></i>
                          </span>
                        </h4>
                        <h4
                          className={`text-normal personal-referrals mb-4 ${
                            intval(get_data_value(pageData["next_rank_info"], "rank_no")) < 8
                              ? "hidden"
                              : ""
                          }`}
                        >
                          Additional Requirements:{" "}
                          <span className="destination-value text-success">
                            None
                          </span>
                        </h4>

                        <div className="lane-box">
                          {pageData["tree_info"].map((item, index) => (
                            <div className="row" key={index}>
                              <div className="col-md-3">
                                <h4 className="text-normal lane-max mb-3">
                                  Lane{index + 1}:{" "}
                                  <span
                                    className={`current-value ${
                                      intval(
                                        pageData["tree_info"][index][
                                          "active_member_cnt"
                                        ]
                                      ) >=
                                      pageData["next_rank_info"]["line_max"][
                                        index
                                      ]
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {
                                      pageData["tree_info"][index][
                                        "active_member_cnt"
                                      ]
                                    }
                                  </span>
                                  <span className="text-success"> / </span>
                                  <span className="destination-value text-success">
                                    {
                                      pageData["next_rank_info"]["line_max"][
                                        index
                                      ]
                                    }
                                  </span>
                                  <span className="pl-3">
                                    <i
                                      className={`text-bold ${
                                        intval(
                                          pageData["tree_info"][index][
                                            "active_member_cnt"
                                          ]
                                        ) >=
                                        pageData["next_rank_info"]["line_max"][
                                          index
                                        ]
                                          ? "text-success ti-check"
                                          : "text-danger ti-close"
                                      }`}
                                    ></i>
                                  </span>
                                </h4>
                              </div>
                              <div className="col-md-9">
                                <h4 className="text-normal lane-qualifying mb-3">
                                  Qualifying:{" "}
                                  <span
                                    className={`current-value ${
                                      item["percent"] >= 100 * RULE_PERCENT
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {item["percent"]}%
                                  </span>
                                  <span className="text-success"> / </span>
                                  <span className="destination-value text-success">
                                    {RULE_PERCENT * 100}%
                                  </span>
                                  <span className="pl-3">
                                    <i
                                      className={`text-bold ${
                                        item["percent"] >= 100 * RULE_PERCENT
                                          ? "text-success ti-check"
                                          : "text-danger ti-close"
                                      }`}
                                    ></i>
                                  </span>
                                </h4>
                              </div>
                            </div>
                          ))}
                        </div>
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

export default UserRankDetailModal;
