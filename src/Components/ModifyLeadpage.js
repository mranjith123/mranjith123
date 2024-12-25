import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Paper_Core from "../ui_core/Paper_Core";
import Input_Core from "../ui_core/Input_Core";
import Button_Core from "../ui_core/Button_Core";
import Controls from "../Maker/controls/Controls";
import LeadHomepage from "./leadHomePage";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';


const leadDetails = {
  customerMobileNo: "",
  customerName: "",
  customerEmailId: "",
  customerAccountNo: "",
};

const ModifyLeadPage = (props) => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [customerId, setCustomerId] = useState("");
  const [customerLeadType, setCustomerLeadType] = useState("");
  const [customerLeadsubType, setCustomerLeadsubType] = useState("");
  const [customerBranchId, setCustomerBranchId] = useState("");
  const [customerBranchName, setCustomerBranchName] = useState("");

  const [leadDetailRes, setLeadDetailRes] = useState(leadDetails);
  const [custDetailRes, setCustDetailRes] = useState([]);

  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "customerAccountNo") {
    } else if (name === "customerBranchId") {
      let code = getBranchCodes().filter((p) => p.id === value)[0].title;
      setCustomerBranchId(value);

      if (value === "") {
        setCustomerBranchName("");
      }
      const brchName = getBranchCodes().filter((p) => p.id === value)[0].name;
      setCustomerBranchName(brchName);
    } else if (name === "customerLeadType") {
      //let leadType = getLeadTypes().filter((p) => p.id === value)[0].title;
      //console.log(leadType)
      setCustomerLeadType(value);
    } else if (name === "customerLeadsubType") {
      let types = getLeadSubTypes(customerLeadType);
      let subType = types.filter((p) => p.id === value)[0].id;
      setCustomerLeadsubType(subType);
    }
  };

  const getLeadSubTypes = (leadType) => {
    if (leadType == "New Account" || leadType == "1") {
      console.log("1");
      return getNewAccountLeadSubTypes();
    } else if (leadType == "Credit Card" || leadType == "2") {
      console.log("2");
      return getCreditCardLeadSubTypes();
    } else if (leadType == "Loan" || leadType == "3") {
      console.log("3");
      return getLoanLeadSubTypes();
    } else {
      return [];
    }
  };

  const getLeadTypes = () => [
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
    { id: "3", title: "115", name: "The Mall Amritsar" },
  ];



  const fetchCustomerDetails = (e) => {
    const GET_CUTOMER_URL = "http://localhost:3333/customerId/";

    axios
      .get(`${GET_CUTOMER_URL}${parseInt(location.state.totData.custId)}`)
      .then((res) => {
        console.log("response", res.data.customerAccountNo);
        setCustDetailRes(res.data.customerAccountNo)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };




  useEffect(() => {
    fetchCustomerDetails()
  }, [])



  useEffect(() => {
    const GET_LEAD_BY_ID = "http://localhost:3333/lead/";
    axios.get(`${GET_LEAD_BY_ID}${leadId}`).then((res) => {
      console.log("modify page ", res.data);
      let leadData = res.data;
      let {
        leadId,
        custId,
        custMobileNo,
        custName,
        custEmailId,
        custAccountNo,
        custLeadType,
        custLeadsubType,
        custBranchId,
        custBranchName,
      } = res.data;
      setLeadDetailRes({
        custMobileNo,
        custName,
        custEmailId,
        custAccountNo,
      });
      setCustomerBranchName(custBranchName);
      setCustomerId(leadData.custId);
      let branchId = getBranchCodes().filter((p) => p.title == custBranchId)[0]
        .id;
      setCustomerBranchId(branchId);

      let leadType = getLeadTypes().filter((p) => p.title == custLeadType)[0]
        .id;
      setCustomerLeadType(leadType);

      let subTypes = getLeadSubTypes(leadType);

      let leadSubType = subTypes.filter((p) => p.title == custLeadsubType)[0]
        .id;
      setCustomerLeadsubType(leadSubType);
    });
  }, []);

  const updateLeadHandler = () => {
    let leadType = getLeadTypes().filter((p) => p.id === customerLeadType)[0]
      .title;
    let leadSubType = getLeadSubTypes(customerLeadType).filter(
      (p) => p.id === customerLeadsubType
    )[0].title;
    let branchId = getBranchCodes().filter((p) => p.id === customerBranchId)[0]
      .title;

    const UPDATE_LEAD_URL = "http://localhost:3333/leads/";
    axios
      .put(
        `${UPDATE_LEAD_URL}${leadId}`,
        {
          custId: customerId,
          custMobileNo: leadDetailRes.customerMobileNo,
          custName: leadDetailRes.customerName,
          custEmailId: leadDetailRes.customerEmailId,
          custAccountNo: leadDetailRes.customerAccountNo,
          custLeadType: leadType,
          custLeadsubType: leadSubType,
          custBranchId: branchId,
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
        //navigate('/viewLeadPage')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const backHandler = () => {
    navigate("/viewLeadPage");
  };



  return (
    <div
      style={{
        marginLeft: "25%",
      }}
    >
      <LeadHomepage />
      <div style={{ marginTop: 130 }}>
        <Paper_Core padding={2} elevation={4} width="90vw" height="100vw">
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
                      // onChange={(e) => setCustomerId(e.target.value)}
                      value={customerId}
                      name="custId"
                      type="number"
                      readOnly
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
                      value={leadDetailRes.custMobileNo}
                      name="customerMobileNo"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Account Details */}

              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Customer Name :
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core value={leadDetailRes.custName} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Email Id:
                  </Grid>
                  <Grid item md={6}>
                    <Input_Core value={leadDetailRes.custEmailId} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container>
                  <Grid item md={6}>
                    Account Number :
                  </Grid>
                  <Grid item md={6}>
                    {/* <Input_Core value={leadDetailRes.custAccountNo} /> */}
                    <Select
                      style={{ width: "170px" }}
                      name="customerAccountNo"
                      value={location.state.totData.custAccountNo}
                      onChange={onChangeHandler}
                    >
                      {custDetailRes.map((actNo) => {
                        return (
                          <MenuItem value={actNo.customerAccountNo}>
                            {actNo.customerAccountNo}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {/* <Controls.Select
                      name="customerAccountNo"
                      label=""
                      value={leadDetailRes.custAccountNo}
                      onChange={onChangeHandler}
                      //options={leadDetailRes.custAccountNo}
                      error=""
                    /> */}
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
                      value={customerLeadType}
                      onChange={onChangeHandler}
                      options={getLeadTypes()}
                      error=""
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
                      value={customerLeadsubType}
                      onChange={onChangeHandler}
                      options={getLeadSubTypes(customerLeadType)}
                      error=""
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
                      value={customerBranchId}
                      onChange={onChangeHandler}
                      options={getBranchCodes()}
                      error=""
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
                title="Modify"
                variant="contained"
                onClick={updateLeadHandler}
              />
            </Grid>
            <Grid item>
              <Button_Core
                title="Back"
                variant="contained"
                onClick={backHandler}
              />
            </Grid>
          </Grid>
        </Paper_Core>
        {success && <h1 style={{ color: "green" }}>{response}</h1>}
      </div>
    </div>
  );
};

export default ModifyLeadPage;