import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Paper_Core from "../ui_core/Paper_Core";
import Input_Core from "../ui_core/Input_Core";
import Button_Core from "../ui_core/Button_Core";
import Controls from "../Maker/controls/Controls";
import LeadHomepage from "./leadHomePage";
import axios from "axios";
import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

const custDetails = {
  customerId: "",
  customerMobileNo: "",
  customerEmailId: "",
  customerAccountNo: [{}],
};

const CreateLeadPage = (props) => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [customerAcntNo, setCustomerAcntNo] = useState("");
  const [customerLeadType, setCustomerLeadType] = useState("");
  const [customerLeadsubType, setCustomerLeadsubType] = useState("");
  const [customerBranchId, setCustomerBranchId] = useState("");
  const [customerBranchName, setCustomerBranchName] = useState("");
  const [custDetailRes, setCustDetailRes] = useState(custDetails);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});

  const fetchCustomerDetails = (e) => {
    const GET_CUTOMER_URL = "http://localhost:3333/customerId/";

    axios
      .get(`${GET_CUTOMER_URL}${parseInt(customerId)}`)
      .then((res) => {
        console.log("response", res.data);
        let {
          customerMobileNo,
          customerName,
          customerEmailId,
          customerAccountNo,
        } = res.data;
        setCustDetailRes({
          customerMobileNo,
          customerName,
          customerEmailId,
          customerAccountNo,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };


  const getLeadSubTypes = () => {
    if (customerLeadType == "New Account") {
      return getNewAccountLeadSubTypes();
    } else if (customerLeadType == "Credit Card") {
      return getCreditCardLeadSubTypes();
    } else if (customerLeadType == "Loan") {
      return getLoanLeadSubTypes();
    } else {
      return [];
    }
  };

  const getcustAccountNos = () => [
    { id: "1", title: "user1" },
    { id: "2", title: "user2" },
    { id: "3", title: "user3" },
  ];

  const getcustLeadTypes = () => [
    { id: "1", title: "New Account" },
    { id: "2", title: "Credit Card" },
    { id: "3", title: "Loan" },
  ];

  const getNewAccountLeadSubTypes = () => [
    { id: "1", title: "Savings" },
    { id: "2", title: "Current" },
    { id: "3", title: "Loan" },
    { id: "3", title: "Escrow" },
    { id: "3", title: "Deposit" },
    { id: "3", title: "OD Acc" },
  ];

  const getCreditCardLeadSubTypes = () => [
    { id: "1", title: "New Credit Card" },
    { id: "2", title: "Add-on Credit Card" },
  ];

  const getLoanLeadSubTypes = () => [
    { id: "1", title: "Personal Loan" },
    { id: "2", title: "Home Loan" },
    { id: "3", title: "CCOD Loan" },
    { id: "4", title: "Mortgage Loan" },
    { id: "5", title: "Vehicle Loan" },
    { id: "6", title: "Gold Loan" },
    { id: "7", title: "FCY Loan" },
    { id: "8", title: "Loan Against Securities" },
  ];

  const getBranchCodes = () => [
    { id: "1", title: "9225", name: "Vijay Cross Road" },
    { id: "2", title: "9254", name: "Nehru Bridge Ashram Road " },
    { id: "3", title: "115",  name: "The Mall Amritsar" },
    {id: "4",  title: "2843", name: " Cidco -Aurangabad" },
    {id: "5",  title: "53",   name: "Koramangala Main Branch"},
    {id: "6",  title: "76",   name: "M G Road  Bengaluru"},
    {id: "7",  title: "133",  name: "J p Nagar"},
    {id: "8",  title: "184",  name: "Bangalore-Indira Nagar Cmh Road"},
    {id: "9",  title: "549",  name: "Electronic City"},
    {id: "10", title:"1226",  name:"Jayanagar-Rvs paradise"}


  ];

  const onChangeHandler = (e) => {
    setError({});
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "customerAccountNo") {
      console.log("acntno");
      setCustomerAcntNo(value);
    } else if (name === "customerBranchId") {
      let code = getBranchCodes().filter((p) => p.id === value)[0].title;
      setCustomerBranchId(code);
      console.log(name + code);
      console.log(name + customerBranchId);
      if (value === "") {
        setCustomerBranchName("");
      }
      const brchName = getBranchCodes().filter((p) => p.id === value)[0].name;
      setCustomerBranchName(brchName);
    } else if (name === "customerLeadType") {
      let leadType = getcustLeadTypes().filter((p) => p.id === value)[0].title;

      setCustomerLeadType(leadType);
      console.log(customerLeadType);
    } else if (name === "customerLeadsubType") {
      let types = getLeadSubTypes();
      let subType = types.filter((p) => p.id === value)[0].title;
      setCustomerLeadsubType(subType);
    }
  };

  const validation = (data) => {
    // console.log("data", data)
    const error = {};
    if (customerId == "") {
      error["customerId"] = "This is required";
    }
    if (customerAcntNo == "") {
      error["customerAcntNo"] = "This is required";
    }
    if (customerLeadType == "") {
      error["customerLeadType"] = "This is required";
    }
    if (customerLeadsubType == "") {
      error["customerLeadsubType"] = "This is required";
    }
    if (customerBranchId == "") {
      error["customerBranchId"] = "This is required";
    }

    return error;
  };

  const createLeadHaandler = () => {
    const CREATE_LEAD_URL = "http://localhost:3333/createLead";

    const isValid = validation();
    console.log("createLeadHaandler", isValid);
    if (Object.keys(isValid).length > 0) {
      console.log("isValid", isValid);
      setError(isValid);
    } else {
      axios
        .post(
          CREATE_LEAD_URL,
          {
            custId: customerId,
            custMobileNo: custDetailRes.customerMobileNo,
            custName: custDetailRes.customerName,
            custEmailId: custDetailRes.customerEmailId,
            custAccountNo: customerAcntNo,
            custLeadType: customerLeadType,
            custLeadsubType: customerLeadsubType,
            custBranchId: customerBranchId,
            custBranchName: customerBranchName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("response", res.data);
          setResponse(res.data);
          setSuccess(true);
          navigate('/viewLeadPage')
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  const custIdHandler = (e) => {
    console.log("customerId.length", customerId.length);
    if (customerId.length > 9) {
      setCustomerId(e.target.value);
      setError({
        customerId: "customerId Max length should be 1-10",
      });
    } else {
      setError({});
      setCustomerId(e.target.value);
    }
  };
  return (
    <div
      style={{
        marginLeft: "14%",
        height: "94vh",
        backgroundColor: "#c4dbda"
      }}
    >
      <LeadHomepage />
      <div style={{ marginTop: "130px" }}>
        <Paper_Core padding={2} elevation={4} width="70vw">
          <Box>
            <Grid container spacing={2}>
              {/* Customer Details */}

              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Customer ID :
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core
                      onChange={custIdHandler}
                      onBlur={fetchCustomerDetails}
                      value={customerId}
                      name="customerId"
                      // label="customer Id"
                      type="number"
                      error={error.customerId}
                      helperText={error.customerId}
                      autoComplete="off"
                      list="autocompleteOff"
                      maxLength={10}
                      minLength={1}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Mobile No:
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core
                      value={custDetailRes.customerMobileNo}
                      name="customerMobileNo"
                      type="number"
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Customer Name :
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core
                      value={custDetailRes.customerName}
                      name="customerName"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Email Id:
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core
                      value={custDetailRes.customerEmailId}
                      name="customerEmailId"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Account Number :
                  </Grid>
                  <Grid item md={6}>
                    <Select
                      style={{ width: "170px" }}
                      name="customerAccountNo"
                      value={customerAcntNo}
                      onChange={onChangeHandler}
                    >
                      {custDetailRes.customerAccountNo.map((actNo) => {
                        return (
                          <MenuItem value={actNo.customerAccountNo}>
                            {actNo.customerAccountNo}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Lead Type :
                  </Grid>
                  <Grid item md={6}>
                    <Controls.Select
                      name="customerLeadType"
                      // label="Lead Type"
                      value={customerLeadType[0]}
                      onChange={onChangeHandler}
                      options={getcustLeadTypes()}
                      error={error.customerLeadType}
                      helperText={error.customerLeadType}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Lead Sub Type :
                  </Grid>
                  <Grid item md={6}>
                    <Controls.Select
                      name="customerLeadsubType"
                      // label="Sub Type"
                      value={customerLeadsubType[0]}
                      onChange={onChangeHandler}
                      options={getLeadSubTypes()}
                      error={error.customerLeadsubType}
                      helperText={error.customerLeadsubType}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}></Grid>
                  <Grid item md={6}></Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Branch ID :
                  </Grid>
                  <Grid item md={6}>
                    <Controls.Select
                      name="customerBranchId"
                      // label="Branch Id"
                      value={customerBranchId[0]}
                      onChange={onChangeHandler}
                      options={getBranchCodes()}
                      error={error.customerBranchId}
                      helperText={error.customerBranchId}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Branch Name:
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core value={customerBranchName} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={2}
            style={{ marginTop: 2, marginBottom: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button_Core
                title="Submit"
                variant="contained"
                onClick={createLeadHandler}
              />
            </Grid>
          </Grid>
        </Paper_Core>
        {success && <h1 style={{ color: "green" }}>{response}</h1>}
      </div>
    </div>
  );
};

export default CreateLeadPage;