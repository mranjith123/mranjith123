import React, { useEffect, useState } from "react";
import { LoanForm, Form } from "./LoanForm";
import { Grid, InputLabel } from "@material-ui/core";
import * as loanService from "../services/loanService";
import Controls from "./controls/Controls";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, Button, textArea } from "@mui/material";
import DiscrepancyModal from "./DiscrepancyModal";
import axios from "axios";

const CheckerPageForm2 = (props) => {
  const data = [
    {
      id: 1,
      custID: 123456,
      name: "M Raghu",
      actnum: 12345678901,
      accType: "Savings Account",
      mobileNumber: 6300237377,
      EmailID: "hdfc.com",
      CustomerAddress1: "White field",
      CustomerAddress2: "Bangalore",
      CustomerAddress3: "KA",
      pan: "FITPM6345L",
    },
    {
      id: 2,
      custID: 654321,
      name: "V Naveen",
      actnum: 23456789012,
      accType: "Salary Account",
      mobileNumber: 9300237377,
      EmailID: "hdfc1.com",
      CustomerAddress1: "Marthalli",
      CustomerAddress2: "Bangalore",
      CustomerAddress3: "KA",
      pan: "KJHPM6345L",
    },
    {
      id: 3,
      custID: 456789,
      name: "S Swaroop",
      actnum: 78901234567,
      accType: "Zero balance Account",
      mobileNumber: 7300237377,
      EmailID: "hdfc2.com",
      CustomerAddress1: "Hebbal",
      CustomerAddress2: "Bangalore",
      CustomerAddress3: "KA",
      pan: "RTYPM6345L",
    },
  ];
  const navigate = useNavigate();
  const initialFValues = {
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    branch: "",
    categoryOfAsset: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("categoryOfAsset" in fieldValues)
      temp.categoryOfAsset =
        fieldValues.categoryOfAsset.length !== 0
          ? ""
          : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [custName, setCustname] = useState({
    name: "",
    actnum: "",
    accType: "",
    mobileNumber: "",
    EmailID: "",
    CustomerAddress1: "",
    CustomerAddress2: "",
    CustomerAddress3: "",
    pan: "",
    txAmount: "",
    purposeDescription: "",
    paymentRate: "",
    paymentRemarks: "",
    paymentAmount: "",
    currency: "",
    equivalent: "",
    rate: "",
    purpose: "",
  });
  const discrepancyHandler = () => {
    setModal(true);
    setShowPopup(!showPopup);
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    LoanForm(initialFValues, true);

  const submitHandler = () => {
    if (textareaValue !== "") {
      // setErrorMsg(true)
    } else {
      setErrorMsg(true);
    }
  };

  const cancelHandler = () => {
    setShowPopup(false);
    setErrorMsg(false);
  };
  const textareaChange = (e) => {
    setTextareaValue(e.target.value);
    if (textareaValue !== "") {
      setErrorMsg(false);
    }
  };
  const subHandler = (e) => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      navigate("/homeNocPage");
    }, 1500);
  };
  const handleInputValue = async (getid) => {
    const id = getid;
    setInputValue(id);
    let user;
    await axios
      .get(`http://localhost:8083/api/checker2/${parseInt(id)}`)
      .then((res) => {
        return (user = res?.data);
      })
      .catch((err) => {
        return user;
      });
    let NotEmptyUser = user && !Object.values(user).every((o) => o === null);
    if (NotEmptyUser) {
      setCustname({
        name: user?.custName,
        actnum: user?.accountNo,
        accType: user?.accName,
        mobileNumber: user?.mobileNo,
        EmailID: user?.emailId,
        CustomerAddress1: user?.custAddr1,
        CustomerAddress2: user?.custAddr2,
        CustomerAddress3: user?.custAddr3,
        pan: user?.panNumber,
        txAmount: user?.txAmount,
        purposeDescription: user?.purposeDescription,
        paymentRate: user?.paymentRate,
        paymentRemarks: user?.paymentRemarks,
        paymentAmount: user?.paymentAmount,
        currency: user?.currency,
        equivalent: user?.equivalentTo,
        rate: user?.rate,
        purpose: user?.purposeCode,
      });
    } else {
      setCustname({
        name: "",
        actnum: "",
        accType: "",
        mobileNumber: "",
        EmailID: "",
        CustomerAddress1: "",
        CustomerAddress2: "",
        CustomerAddress3: "",
        pan: "",
        txAmount: "",
        purposeDescription: "",
        paymentRate: "",
        paymentRemarks: "",
        paymentAmount: "",
        currency: "",
        equivalent: "",
        rate: "",
        purpose: "",
      });
    }
  };

  useEffect(() => {
    handleInputValue(1);
  }, []);
  return (
    <>
      <div className="main__container" style={{ marginTop: 60 }}>
        <span className="heading">Customer Details</span>
        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Customer ID:</label>
            <input
              type="text"
              id="customerId"
              className="customerID"
              value={1}
              onChange={(e) => handleInputValue(e)}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              className="customerName"
              value={custName.name}
            />
          </div>
        </div>

        <span className="heading">Account Details</span>
        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Account No:</label>
            <input
              type="number"
              id="custumerId"
              className="accountNo"
              value={custName.actnum}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Account Type :</label>
            <input
              type=""
              id="custumerName"
              className="accountName"
              value={custName.accType}
            />
          </div>
        </div>
        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Customer Address1:</label>
            <input
              type="text"
              id="custumerId"
              className="inputField"
              value={custName.CustomerAddress1}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Mobile Number:</label>
            <input
              type=""
              id="custumerName"
              className="mobileNumber"
              value={custName.mobileNumber}
            />
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id" className="labels">
              Customer Address2:
            </label>
            <input
              type="text"
              id="custumerId"
              className="inputField"
              value={custName.CustomerAddress2}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Email ID:</label>
            <input
              type="email"
              id="custumerName"
              className="EmailId"
              value={custName.EmailID}
            />
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Customer Address3:</label>
            <input
              type="text"
              id="custumerId"
              className="inputField"
              value={custName.CustomerAddress3}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">PAN Number:</label>
            <input
              type=""
              id="custumerName"
              className="PanNumber"
              value={custName.pan}
            />
          </div>
        </div>

        <span className="heading">Transaction Details</span>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Amount:</label>
            <input
              type="number"
              id="custumerId"
              className="amount"
              value={custName.txAmount}
            />
          </div>
          <div className="content__2">
            <label className="cur" for="custumerName">
              Currency:
            </label>
            <div className="curre">
              <Controls.Input
                name="currency"
                type="text"
                value={custName.currency}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Purpose Code:</label>
            <div className="code">
              <Controls.Input
                name="purpose"
                type="text"
                value={custName.purpose}
              />
            </div>
          </div>
          <div className="content__2">
            <label className="pur" for="custumerName">
              Purpose Description:
            </label>
            <input
              type=""
              id="custumerName"
              className="purp"
              value={custName.purposeDescription}
            />
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Equivalent To:</label>
            <div className="equ" style={{ marginRight: 20, marginLeft: 75 }}>
              <Controls.Input
                name="equivalent"
                type="text"
                value={custName?.equivalent}
              />
            </div>
          </div>
          <div className="content__2">
            <label className="rat" for="custumerName">
              Rate:
            </label>
            <div className="rate" style={{ marginRight: 20, marginLeft: 135 }}>
              <Controls.Input name="rate" type="text" value={custName.rate} />
            </div>
          </div>
        </div>
        <span className="heading">Payment Details</span>

        <div className="patment__container">
          <div className="payment__input">
            <div className="" style={{ marginLeft: 60 }}>
              <label for="Rate" className="label__rate">
                Rate:
              </label>
              <input
                type="number"
                id="Rate"
                className="Rate"
                value={custName.paymentRate}
                style={{ marginLeft: 125 }}
              />
            </div>
            <div style={{ marginLeft: 60 }}>
              <label for="Amount" className="label__rate">
                Amount:
              </label>
              <input
                type="number"
                id="Amount"
                className="Amount"
                value={custName.paymentAmount}
                style={{ marginLeft: 100 }}
                maxLength={20}
              />
            </div>
          </div>
          <div
            className="payment__remarks"
            style={{ marginLeft: 640, marginTop: -60, marginBottom: 10 }}
          >
            <span>Remarks</span>
            <textarea
              value={custName.paymentRemarks}
              style={{ marginLeft: -10 }}
              maxLength={20}
              minLength={1}
            ></textarea>
            <p>{errors.paymentRemarks ? errors.paymentRemarks : ""}</p>
          </div>
        </div>
        <div className="btn">
          <div className="sub" style={{ marginTop: 30, marginLeft: 100 }}>
            <Button
              variant="contained"
              onClick={subHandler}
              sx={{ width: 200 }}
            >
              VALIDATE & SUBMIT
            </Button>
          </div>
          <div className="canc" style={{ marginTop: 30 }}>
            <Button
              variant="outlined"
              className="discrepancy__btn"
              onClick={discrepancyHandler}
            >
              DISCREPANCY
            </Button>
          </div>
          <DiscrepancyModal
            modal={modal}
            setModal={setModal}
            route="/homepagechecker"
          />
          {/* {showPopup && (
            <div className="popup__container">
              <div className="reason__container">
                <label for="textarea">Reason</label>
                <textarea
                  id="textarea"
                  className="mismatch__info"
                  placeholder="Write something..."
                  onChange={(e) => textareaChange(e)}
                ></textarea>
              </div>
              {errorMsg && (
                <span className="error__msg">
                  Please the mismatched information in the text field before
                  submit
                </span>
              )}
              <div className="btn__container">
                <button onClick={submitHandler}>Submit</button>
                <button onClick={cancelHandler}>Cancel</button>
              </div>
            </div>
          )} */}
        </div>
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="success">Validate Successfully</Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default CheckerPageForm2;