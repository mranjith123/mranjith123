import React, { useState, useEffect } from "react";
import "./Accounts.css";
import { CURRENCY_CONVERSION } from "../../utils/APIs";
import axios from "axios";

const INRTransferData = {
  creditAccNo: "",
  conversionRate: "",
  transferAmt: "",
  remarks: "",
};

const Accounts = () => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState([]);
  const [selectAccount, setSelectAccount] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const [fundTransfer, setFundTransfer] = useState(false);
  const [inrTransfer, setInrTransfer] = useState(false);
  const [inrSubmit, setInrSubmit] = useState(false);
  const [successTransfer, setSuccessTransfer] = useState(false);
  const [failedTransfer, setFailedTransfer] = useState(false);
  const [transferFormData, setTransferFormData] = useState(INRTransferData);
  const [amount, setAmount] = useState("");

  //   const API =
  //     "http://localhost:8080/v1/exchangeRateValue?currencies=INR&baseCurrency=USD";
  useEffect(() => {
    axios
      .get(CURRENCY_CONVERSION)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const ddArr = [
    { accNo: 102611, currency: "INR", amount: 250000 },
    { accNo: 102622, currency: "USD", amount: 25200 },
    { accNo: 102613, currency: "GBP", amount: 18000 },
    { accNo: 102644, currency: "EUR", amount: 19900 },
    { accNo: 102615, currency: "JPY", amount: 1340000 },
  ];

  const onHandleSelectAccount = (val) => {
    if ((fundTransfer || inrTransfer) === true) {
      setFundTransfer(false);
      setInrTransfer(false);
    }
    setAccountName(val);
    setAmount(val.amount);
    setSelectAccount(true);
    setAccountInfo(true);
    setOpen((prev) => !prev);
    setInrSubmit(false);
  };
  // console.log(accountName)

  const onHandleFundTransfer = () => {
    setAccountInfo(false);
    setFundTransfer(true);
  };

  const onHandleInrTransfer = () => {
    setFundTransfer(false);
    setInrTransfer(true);
  };

  const onHandleSubmit = () => {
    setInrSubmit(true);
    if (transferFormData?.transferAmt <= ddArr[1].amount) {
      setSuccessTransfer(true);
      setFailedTransfer(false);
      setAmount(
        transferFormData.transferAmt != ""
          ? transferFormData.transferAmt - accountName.amount
          : accountName.amount
      );
    } else {
      setSuccessTransfer(false);
      setFailedTransfer(true);
      setAmount(accountName.amount);
    }
    setTransferFormData(INRTransferData);
  };

  const onHandleFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTransferFormData({
      ...transferFormData,
      [name]: value,
    });
  };

  return (
    <div style={{ marginTop: "68px", marginLeft: "14px" }}>
      <div className="acc-dropdown">
        <button
          tag={{ cursor: "pointer" }}
          onClick={() => setOpen((prev) => !prev)}
        >
          Accounts
        </button>
        {open && (
          <div id="myDropdown" className="acc-dropdown-content">
            {ddArr.map((item) => (
              <div
                className="dd-content"
                onClick={() => onHandleSelectAccount(item)}
              >
                <h5 className="ac-num">
                  {item.accNo} - {item.currency}
                </h5>
                <h5 className="drop">Amount - {item.amount}</h5>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectAccount && (
        <div className="acc-details">
          <p className="ac-num">
            {" "}
            Account No:{accountName.accNo} - {accountName.currency}
          </p>
          <p className="drop">
            {" "}
            Amount:{amount === "" ? accountName.amount : amount}
          </p>
          <hr width="40%" />
        </div>
      )}

      {selectAccount && accountInfo && (
        <div className="acc-detail-types acc-heading">
          <div className="acc-content acc-m-b">
            <p>Remittance to Exiting Acc
            </p>
            <p>Add New Account</p>
          
          <p>Edit Exiting Account</p>
          </div>
        </div>
      )}

      {fundTransfer && (
        <div className="acc-detail-types">
          <p className="acc-heading acc-m-b">Fund Transfer</p>
          <div className="acc-content">
            <p className="pointer" onClick={onHandleInrTransfer}>
             Remittance to Existing Acc
            </p>
            <p>Remittance {">>"}</p>
          </div>
        </div>
      )}

      {inrTransfer && (
        <div>
          <p className="acc-heading acc-m-b">
            Fund Transfer -- {"Transfer to INR Account"}
          </p>
          {!inrSubmit && (
            <form onSubmit={onHandleSubmit}>
              <div>
                <div className="d__flex">
                  {/* <div className='acc-content'> */}
                  {/* <label>Credit Account Number</label> */}
                  <label for="Credit Account Number">
                    Credit Account Number:
                  </label>
                  <select
                    name="CCredit Account Number"
                    id="Credit Account Number"
                    style={{ width: "166px" }}
                  >
                    <option value="102611-INR">102611-INR</option>
                  </select>
                  {/* <input type="text" name="creditAccNo" value={transferFormData.creditAccNo} onChange={onHandleFormData} /> */}
                  {/* </div> */}
                  {/* <div className='acc-lftcontent'> */}
                  <label for="Currency">Currency:</label>
                  <select name="Currency" id="Currency">
                    <option value="USD">USD</option>
                    <option value="USD">GBP</option>
                    <option value="USD">EUR</option>
                    <option value="USD">JPY</option>
                    <option value="USD">INR</option>
                  </select>
                  {/* </div> */}
                </div>
                <div className="d__flex">
                  <div className="acc-form-content">
                    <label>Tranfer Amount</label>
                    <input
                      type="number"
                      name="transferAmt"
                      value={transferFormData.transferAmt}
                      onChange={onHandleFormData}
                      style={{ width: "166px" }}
                    />
                  </div>
                  <div
                    className="d__flex1"
                    style={{ display: "flex", marginLeft: "14px" }}
                  >
                    {/* <label>Conversion Rate</label> */}
                    <label for="Conversion Rate">Conversion Rate:</label>
                    <select name="Conversion Rate" id="Conversion Rate">
                      <option value="83.5">83.5</option>
                    </select>
                  </div>
                </div>
                {/* <input type="text" name="currency" value={transferFormData.currency} onChange={onHandleFormData} /> */}
                {/* <input type="number" name="conversionRate" value={transferFormData.conversionRate} onChange={onHandleFormData} /> */}
              </div>
              <div className="acc-form-content">
                <label>Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={transferFormData.remarks}
                  onChange={onHandleFormData}
                  style={{ width: "166px" }}
                />
              </div>
              <div style={{ textAlign: "center", width: "54.3vw" }}>
                <button type="submit" className="pointer">
                  SUBMIT
                </button>
              </div>
            </form>
          )}

          {inrSubmit && successTransfer && (
            <h1 style={{ color: "green" }}>Your Transaction is Successful</h1>
          )}
          {inrSubmit && failedTransfer && (
            <h1 style={{ color: "red" }}>OOPS. INSUFFICIENT BALANCE !!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Accounts;