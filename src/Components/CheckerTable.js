import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import "./Dashboard.css";
import {
  Button,
  Table,
  Paper,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
const useStyle = makeStyles((theme) => ({
  root: {},
  boderStyle: {
    border: "1px solid black",
  },
}));
const data = [
  {
    refNo: "REF65479",
    customer: "Mr.A",
    customerId: "0001289485",
    amount: 10000,
    currency: "USD",
  },
];

const CheckerTable = (props) => {
  let navigate = useNavigate();
  const [leadData, setLeadData] = useState([]);
  let CHECKERAPI = `http://localhost:8083/api/checker1/`;
  const [data1, setData1] = useState([]);
  const classes = useStyle();
  useEffect(() => {
    let FETCH_REFNO = `http://localhost:8080/fetch/`;
    setLeadData(data);
    axios.get(`${FETCH_REFNO}${1}`).then((res) => {
      let {
        refNo,
        currency,
        amount,
        id,
        accountId: { accountName },
      } = res.data;
      setData1([
        {
          refNo,
          currency,
          amount,
          id,
          accountId: { accountName },
        },
      ]);
    });
  }, []);
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/checkerpage");
  };
  console.log("data-1-", data1);
  return (
    <div className="table-container">
      <TableContainer componenet={Paper}>
        <Table
          sx={{ width: 700, height: "auto", margin: "auto" }}
          className={classes.boderStyle}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Ref No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Currency</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadData.length > 0 ? (
              data1.map((data) => {
                return (
                  <TableRow key={data.refNo}>
                    <TableCell>{data.refNo}</TableCell>
                    <TableCell>{data.accountId.accountName}</TableCell>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.currency}</TableCell>
                    <TableCell>
                      <a href="" onClick={clickHandler}>
                        Click Here
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{ position: "absolute", left: "45%", marginBottom: "90px" }}
              >
                No Data Availble
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckerTable;