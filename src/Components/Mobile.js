import React, { useState } from "react";

const INRTransferData = {
  creditAccNo: "",
  conversionRate: "",
  transferAmt: "",
  remarks: "",
};

const Mobile = () => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState({});
  const [selectAccount, setSelectAccount] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const [inrTransfer, setInrTransfer] = useState(false);
  const [inrSubmit, setInrSubmit] = useState(false);
  const [successTransfer, setSuccessTransfer] = useState(false);
  const [failedTransfer, setFailedTransfer] = useState(false);
  const [transferFormData, setTransferFormData] = useState(INRTransferData);

  const ddArr = [
    { accNo: 102611, currency: "INR", amount: 250000 },
    { accNo: 102622, currency: "USD", amount: 25200 },
    { accNo: 102613, currency: "GBP", amount: 18000 },
    { accNo: 102644, currency: "EUR", amount: 19900 },
    { accNo: 102615, currency: "JPY", amount: 1340000 },
  ];

  const onHandleSelectAccount = (val) => {
    setAccountName(val);
    setSelectAccount(true);
    setAccountInfo(true);
    setOpen(false); // Close dropdown
    setInrSubmit(false);
  };

  const onHandleInrTransfer = () => {
    setInrTransfer(true);
  };

  const onHandleFormData = (e) => {
    const { name, value } = e.target;
    setTransferFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setInrSubmit(true);

    if (Number(transferFormData.transferAmt) <= accountName.amount) {
      setSuccessTransfer(true);
      setFailedTransfer(false);
    } else {
      setSuccessTransfer(false);
      setFailedTransfer(true);
    }

    // Reset the form data
    setTransferFormData(INRTransferData);
  };

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Accounts</button>
      {open &&
        ddArr.map((item) => (
          <div
            key={item.accNo}
            onClick={() => onHandleSelectAccount(item)}
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {item.accNo} - {item.currency}
          </div>
        ))}

      {selectAccount && (
        <div>
          <p>
            Selected Account: {accountName.accNo} - {accountName.currency}
          </p>
          <p>Balance: {accountName.amount}</p>
          <button onClick={onHandleInrTransfer}>Transfer Funds</button>
        </div>
      )}

      {inrTransfer && (
        <form onSubmit={onHandleSubmit}>
          <div>
            <label>Transfer Amount:</label>
            <input
              type="number"
              name="transferAmt"
              value={transferFormData.transferAmt}
              onChange={onHandleFormData}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      {inrSubmit && successTransfer && (
        <h1 style={{ color: "green" }}>Transaction Successful!</h1>
      )}
      {inrSubmit && failedTransfer && (
        <h1 style={{ color: "red" }}>Insufficient Balance!</h1>
      )}
    </div>
  );
};

export default Mobile;
