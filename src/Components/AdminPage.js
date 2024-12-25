import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { Link, Outlet, NavLink } from "react-router-dom";
import axios from "axios";

const AdminPage = ({ setLogin }) => {
  const API = "http://localhost:8086/viewAll";
  const [rows, setRows] = useState([]);
  let columns = ["S No", "Emp Name", "Emp Id", "Access Type", "User Type"];
  useEffect(() => {
    setLogin(true);
    axios.get(API).then((res) => {
      setRows(res.data);
    });
  }, []);

  return (
    <Grid container style={{ marginTop: "5%" }}>
      <Grid item sm={3}>
        <div className="sidebar">
          <h3 style={{ marginLeft: "4%" }}>Select</h3>
          <div>
            <div>
              <Button sx={{ width: 200 }}>
                <NavLink
                  activeClassName="active"
                  to="/admin/create-profile"
                  style={{ textDecoration: "none" }}
                >
                  Create Profile
                </NavLink>
              </Button>
            </div>
            <div>
              <Button sx={{ width: 200 }}>
                <NavLink
                  activeClassName="active"
                  to="/admin/delete-profile"
                  style={{ textDecoration: "none" }}
                >
                  Delete Profile
                </NavLink>
              </Button>
            </div>
            <div>
              <Button sx={{ width: 200 }}>
                <NavLink
                  activeClassName="active"
                  to="/admin/modify-profile"
                  style={{ textDecoration: "none" }}
                >
                  Modify Profile
                </NavLink>
              </Button>
            </div>
            <div>
              <Button sx={{ width: 200 }}>
                <NavLink
                  activeClassName="active"
                  to="/admin/view-profile"
                  style={{ textDecoration: "none" }}
                >
                  View Profile
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </Grid>
      <Grid item sm={9} container style={{ marginTop: "3%" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminPage;