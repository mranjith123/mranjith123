import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";
import { Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ login, setLogin, customerLogin, setCustomerLogin }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const logout = (e) => {
    setAnchorEl(null);
    setLogin(false);
    setCustomerLogin(false);
    navigate("/");
  };
  

  const tabChange = (e, value) => {
    setValue(value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar elevation={0} style={{ zIndex: 1201 }} position="static">
      <Toolbar>
        <img src={logo} style={{ width: "10%" }} alt="logo" />
        {customerLogin ? (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 2,
              
            }}
          >
            <Typography>
              Tony Mark
            </Typography>
            <Typography
              variant="h"
              style={{
                marginRight: 10,
              }}
            >
              Profile
            </Typography>
            <AccountCircle />
          </div>
        ) : (
          <Box sx={{ marginLeft: "2em" }}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={tabChange}
              indicatorColor="secondary"
            >
              
         </Tabs>
          </Box>
        )}

       
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ width: "5em" }} onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;