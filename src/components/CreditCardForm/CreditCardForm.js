import React, { useState } from "react";
import { Number, Cvc, Expiration } from "react-credit-card-primitives";
import { isEmpty } from "utils/GlobalFunctions";
const CreditCardForm = (props) => {
  const { userData, setUserData, errorField, setErrorField } = props;

  

  let curYear = new Date().getFullYear();

  const onChangeCreditCardForm = (value, valid, field_name) => {
    console.log('card is valid',field_name, value, valid);
    if (value === "") {
      valid = false;
    }
    if (valid) {
      if (errorField.includes(field_name)) {
        let errors = errorField.filter((x) => x !== field_name);
        setErrorField([...errors]);
      }
    } else {
      if (!errorField.includes(field_name)) {
        setErrorField([...errorField, field_name]);
      }
    }
    console.log("cardData", userData);
    let newData = {};
    if(!valid) {
      value = "";
    }
    newData[field_name] = value;
    setUserData({ ...userData, ...newData});
  };

  const years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, index) => {
    return (
      <option key={index} value={val + curYear - 2000}>
        {val + curYear}
      </option>
    );
  });
  return (
    <div className="creditCardForm">
      <div className="payment">
        <form>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group card-number" id="card-number-field">
                <label htmlFor="cardNumber">Card Number</label>
                <Number
                  onChange={({ value, valid }) =>
                    onChangeCreditCardForm(value, valid, "card_number")
                  }
                  cardTypes={[]}
                  render={({ getInputProps, valid }) => (
                    <input
                      {...getInputProps()}
                      className={
                        "form-control" +
                        (errorField.includes("card_number")
                          ? " is-invalid"
                          : "")
                      }
                      id="cardNumber"
                      placeholder=""
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group owner">
                <label htmlFor="owner">Name On Card</label>
                <input
                  type="text"
                  className={
                    "form-control" +
                    (errorField.includes("owner")
                      ? " is-invalid"
                      : "")
                  }
                  id="owner"
                  onChange={(e) => {
                    onChangeCreditCardForm(e.target.value, true, "owner");
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group CVV">
                <label htmlFor="cvv">CVV</label>
                <Cvc
                  onChange={({ value, valid }) =>
                    onChangeCreditCardForm(value, valid, "cvv")
                  }
                  render={({ getInputProps, valid }) => (
                    <input
                      {...getInputProps()}
                      className={
                        "form-control" +
                        (errorField.includes("cvv") ? " is-invalid" : "")
                      }
                      id="cvv"
                      placeholder=""
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 exp-date-block">
              <div className="block">
                <div className="form-group" id="expiration-date">
                  <label>Expiration Date</label>
                  <div className="block">
                    <select
                      id="expiration-month"
                      className="form-control"
                      onChange={(e) => {
                        onChangeCreditCardForm(
                          e.target.value,
                          true,
                          "exp_month"
                        );
                      }}
                    >
                      <option value="01">January</option>
                      <option value="02">February </option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select
                      id="expiration-year"
                      className="form-control"
                      onChange={(e) => {
                        onChangeCreditCardForm(
                          e.target.value,
                          true,
                          "exp_year"
                        );
                      }}
                    >
                      {years}
                    </select>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="col-md-6 credit-card-img-block">
              <div className="form-group" id="credit_cards">
                <label className="t-show-desktop">&nbsp;</label>
                <div className="credit-card-img-list block m-text-left text-right">
                  <img
                    src="/assets/global/plugins/credit-card-validation-form/assets/images/discover.jpg"
                    alt=""
                    id="discover"
                  />
                  <img
                    src="/assets/global/plugins/credit-card-validation-form/assets/images/visa.jpg"
                    alt=""
                    id="visa"
                  />
                  <img
                    src="/assets/global/plugins/credit-card-validation-form/assets/images/mastercard.jpg"
                    alt=""
                    id="mastercard"
                    className=""
                  />
                  <img
                    src="/assets/global/plugins/credit-card-validation-form/assets/images/amex.jpg"
                    alt=""
                    id="amex"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
