import React, { useState } from "react";
import { apiGuestCreatTicket, apiGuestNewTicket } from "services/loginService";
import { isEmpty, showToast, show_loading } from "utils/GlobalFunctions";
const HomeChatBox = () => {
  const initialPageData = {
    email: "",
    subject: "",
    description: "",
  };
  const [pageData, setPageData] = useState(initialPageData);
  const [errorField, setErrorField] = useState([]);

  const validateFields = () => {
    var errorList = Array();
    errorList = isEmpty(pageData, "email", errorList);
    errorList = isEmpty(pageData, "subject", errorList);
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
    setPageData({...pageData, ...updateData });
  };
  const onClickSend = () => {
    let is_valid = validateFields();
    console.log("is valid", is_valid);
    if (is_valid) {
      show_loading(true);
      apiGuestNewTicket(pageData)
        .then((api_res) => {
          show_loading(false)
          console.log("api_res", api_res);
          if (api_res.status === "1") {
            showToast(api_res.message, "success");
            setPageData({...initialPageData});
          } else {
            show_loading(false);
            showToast(api_res.message, "error");
          }
        })
        .catch((err) => {
          show_loading(false);
          showToast(err, "error");
        });
    }
  };

  return (
    <div>
      <div className="chat-box-wrapper closed">
        <div id="app-minimized-wrapper">
          <span  id="maximumBtn" className="a-btn btn-u rounded-4x">
            {/* <span className="unread-message-badge"></span> */}
            <i className="fa fa-commenting-o"></i>
          </span>
        </div>
        <div id="app-wrapper" className="hidden">
          <div className="position-right style-light" id="app-inner-wrapper">
            <div className="wrapper wrapper--bubble wrapper--hidden wrapper--standalone wrapper--desktop wrapper--rightEdge">
              <div className="contact-info-container">
                <div className="header">
                  <div className="header__innerContainer">
                    <div className="header__content">
                      <span className="header__minimize"></span>
                      <span>Submit a Ticket</span>
                      <button
                        className="header__minimize minimizeBtn a-btn"
                        type="button"
                      >
                        <svg
                          className="minimize__icon"
                          width="14px"
                          height="14px"
                          viewBox="0 0 14 14"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          data-svgreactloader='[["http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"]]'
                          xlink="http://www.w3.org/1999/xlink"
                        >
                          <title>Shape</title>
                          <desc>Created with Sketch.</desc>
                          <defs></defs>
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              className="xShape"
                              id="Artboard-Copy-3"
                              transform="translate(-1066.000000, -216.000000)"
                              fill="#FFFFFF"
                            >
                              <g
                                id="Group-2"
                                transform="translate(798.000000, 198.000000)"
                              >
                                <polygon
                                  id="Shape"
                                  points="282 19.41 280.59 18 275 23.59 269.41 18 268 19.41 273.59 25 268 30.59 269.41 32 275 26.41 280.59 32 282 30.59 276.41 25"
                                ></polygon>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="contact-body">
                  <div className="contact-body--maximized">
                    <div className="body__innerContainer">
                      <div className="body__contentInnerWrapper">
                        <div className="body__content body__content--online">
                          <div className="body__content__innerContainer">
                            <div className="body__content__messageListWrapper">
                              <div className="body__content__messageList messageList">
                                <div className="messageBanner messageBanner--padding">
                                  <div className="messageBanner__innerContainer">
                                    <img
                                      className="messageBanner__imageContent"
                                      alt=""
                                      src="/assets/home/images/higherlevelfx_logo_tm.png"
                                    />
                                    <h3 className="messageBanner__header">
                                      Need help? You can ask us anything! <br />
                                      You must be a registered member!
                                    </h3>
                                  </div>
                                </div>
                                <div className="messageGroup">
                                  <div className="form form--rounded form--unanswered chatting-box-form">
                                    <div className="message__innerContainer message__innerContainer--rounded">
                                      <div className="form-fields-wrapper">
                                        <div
                                          className={`form__field formField ${
                                            errorField.includes("email")
                                              ? "formField--errored"
                                              : ""
                                          }`}
                                        >
                                          <label className="formField__label">
                                            E-mail:
                                            <span className="required">
                                              &nbsp;*
                                            </span>
                                          </label>
                                          <input
                                            type="email"
                                            name="email"
                                            required=""
                                            id="email"
                                            className={`formField__input`}
                                            placeholder="Username or Email"
                                            value={pageData["email"]}
                                            onChange={(e) => {
                                              onChangeFormField(e, "email");
                                            }}
                                          />
                                        </div>
                                        <div
                                          className={`form__field formField ${
                                            errorField.includes("subject")
                                              ? "formField--errored"
                                              : ""
                                          }`}
                                        >
                                          <label className="formField__label">
                                            Subject:
                                            <span className="required">
                                              &nbsp;*
                                            </span>
                                          </label>
                                          <input
                                            type="text"
                                            className="formField__input"
                                            name="subject"
                                            required=""
                                            id="subject"
                                            value={pageData["subject"]}
                                            onChange={(e) => {
                                              onChangeFormField(e, "subject");
                                            }}
                                          />
                                        </div>
                                        <div
                                          className={`form__field formField`}
                                        >
                                          <label className="formField__label">
                                            Description
                                          </label>
                                          <textarea
                                            className="formField__input"
                                            name="description"
                                            id="description"
                                            rows="4"
                                            value={pageData["description"]}
                                            onChange={(e) => {
                                              onChangeFormField(
                                                e,
                                                "description"
                                              );
                                            }}
                                            style={{ resize: "none" }}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <button
                                        id="submit-contact-info"
                                        className="message__button validate-loading-btn"
                                        type="button"
                                        onClick={(e) => {
                                          onClickSend();
                                        }}
                                      >
                                        <i className="fa fa-spin fa-spinner fa fa-white"></i>
                                        <span>Submit</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeChatBox;
