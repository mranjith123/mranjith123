import React, { useState, useEffect } from "react";
import DiscrepancyModal from "./DiscrepancyModal";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const CheckerPageForm = (props) => {
  const [checkerData, setCheckerData] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  let chekerAPI = `http://localhost:8083/api/checker1/1`;
  useEffect(() => {
    axios
      .get(chekerAPI)
      .then((res) => {
        let data = res.data;
        console.log(data);
        setCheckerData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    custId,
    custName,
    accountNo,
    accName,
    custAddr1,
    custAddr2,
    custAddr3,
    emailId,
    equivalentTo,
    mobileNo,
    panNumber,
    purposeCode,
    purposeDescription,
    rate,
    currency,
    txAmount,
  } = checkerData;

  const validateHandler = (e) => {
    e.preventDefault();
    setOpen(true);
    setTimeout(() => {
      navigate("/homepagechecker");
    }, 2000);
  };

  return (
    <div>
      {/* <div className="hea">
        <h3> Welcome Mr Rag</h3>
      </div> */}
      <div style={{ marginLeft: "170px", marginTop: 100 }}>
        <span className="heading">Customer Details</span>
        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Customer ID:</label>
            <input
              type="text"
              id="customerId"
              className="customerID"
              value={custId}
              disabled
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              className="customerName"
              value={custName}
              disabled
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
              disabled
              className="accountNo"
              value={accountNo}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Account Name:</label>
            <input
              type=""
              id="custumerName"
              className="accountName"
              disabled
              value={accName}
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
              disabled
              value={custAddr1}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Mobile Number:</label>
            <input
              type="number"
              id="custumerName"
              className="mobileNumber"
              disabled
              value={mobileNo}
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
              disabled
              value={custAddr2}
            />
          </div>
          <div className="content__2">
            <label for="custumerName">Email ID:</label>
            <input
              type="email"
              id="custumerName"
              className="EmailId"
              disabled
              value={emailId}
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
              value={custAddr3}
              disabled
            />
          </div>
          <div className="content__2">
            <label for="custumerName">PAN Number:</label>
            <input
              type="text"
              id="custumerName"
              className="PanNumber"
              disabled
              value={panNumber}
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
              disabled
              value={txAmount}
            />
          </div>
          <div className="content__2">
            <label className="cur" for="custumerName">
              Currency:
            </label>
            <div className="curre">
              <input type="text" disabled value={currency} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Purpose Code:</label>
            <input
              type="text"
              id="custumerId"
              className="code"
              disabled
              value={purposeCode}
            />
          </div>
          <div className="content__2">
            <label className="pur" for="custumerName">
              Purpose Description:
            </label>
            <input
              type="text"
              id="custumerName"
              className="purp"
              disabled
              textOverflow="ellipsis"
              value={purposeDescription}
            />
          </div>
        </div>

        <div className="container">
          <div className="content__1">
            <label for="custumer Id">Equivalent To:</label>
            <div className="equ">
              <input
                type="text"
                style={{ marginLeft: 15 }}
                disabled
                value={equivalentTo}
              />
            </div>
          </div>
          <div className="content__2">
            <label className="rat" for="custumerName">
              Rate:
            </label>
            <div className="rate">
              <input type="text" disabled value={rate} />
            </div>
          </div>
        </div>
        <div className="btn" style={{ marginTop: 30, marginRight: 390 }}>
          <div className="sub">
            <Button variant="contained" onClick={validateHandler}>
              VALIDATE
            </Button>
          </div>
          <div className="canc">
            <Button
              variant="contained"
              sx={{ backgroundColor: "gray" }}
              onClick={() => setModal(true)}
            >
              DISCREPANCY
            </Button>
          </div>
          <DiscrepancyModal
            modal={modal}
            setModal={setModal}
            route="/homepagechecker"
          />
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
      </div>
    </div>
  );
};

export default CheckerPageForm;