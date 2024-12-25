import React, { useContext, useState, useEffect } from "react";
import MuiTable from "../Admin/table/MuiTable";
import { TableContext } from "../../App";
import { useNavigate } from "react-router-dom";
import LeadHomepage from "./leadHomePage";
import { Box } from "@mui/material";
import Paper_Core from "../ui_core/Paper_Core";
import {
  Button,
  Table,
  Paper,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
const ViewLeadPage = (props) => {
  const { rows, setRows } = useContext(TableContext);
  const API = "http://localhost:3333/leads";

  let columns = [
    "Lead Id",
    "Customer Id",
    "Customer Name",
    "Branch Id",
    "Branch Name",
    "Status",
  ];
  const navigate = useNavigate();
  const handleModify = (leadId) => {
    navigate(`/modifyleadpage/${leadId.leadRefNo}`, { state: { totData: leadId } });
  };

  useEffect(() => {
    axios.get(API).then((res) => {
      console.log("res.data", res.data);
      setRows(res.data);
    });
  }, []);
  return (
    <div style={{ marginLeft: "15%", height: "100vh",overflow:"hidden", }}>
      <LeadHomepage />

      <Paper_Core padding={2} elevation={4} width="100vw" height="100vw">
        <Box>
          <div
            className="table-container"
            style={{ 
              // position: "relative", right: 320, 
              marginTop: 25 }}
          >
            <TableContainer componenet={Paper} sx={{ marginTop: -40 }}>
              <Table sx={{ width: 700 }}>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => {
                      return (
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {column}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ? (
                    rows.map((data, idx) => {
                      return (
                        <TableRow key={data.id} hover>
                          <TableCell>{data.leadRefNo}</TableCell>
                          <TableCell>{data.custId}</TableCell>
                          <TableCell>{data.custName}</TableCell>
                          <TableCell>{data.custBranchId}</TableCell>
                          <TableCell>{data.custBranchName}</TableCell>

                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleModify(data)}
                            >
                              Click here
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow
                      sx={{
                        position: "absolute",
                        left: "45%",
                        marginBottom: "90px",
                      }}
                    >
                      No Data Availble
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Paper_Core>
    </div>
  );
};

export default ViewLeadPage;