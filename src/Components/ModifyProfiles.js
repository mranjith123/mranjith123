import React, { useState, useContext, useEffect } from "react";
import MuiTable from "./table/MuiTable";
import { TableContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ModifyProfiles = (props) => {
  const { columns, rows, setRows } = useContext(TableContext);
  const navigate = useNavigate();
  const dbHandler = (empNo) => {
    console.log(empNo);
    navigate(`/admin/modify-profile/data/${empNo}`);
  };
  const VIEWALL_API = "http://localhost:8086/viewAll";
  useEffect(() => {
    axios.get(VIEWALL_API).then((res) => {
      console.log("view page ", res.data);
      setRows(res.data);
    });
  }, []);
  return (
    <div>
      <h2>Modify Profile</h2>
      <MuiTable
        columns={columns}
        rows={rows}
        setRows={setRows}
        onDoubleClick={dbHandler}
      />
    </div>
  );
};

export default ModifyProfiles;