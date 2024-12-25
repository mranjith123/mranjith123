import React, { useState } from "react";
import './Sidebar.css';
import {
  Box,
  // Toolbar,
  // AppBar,
  // IconButton,
  Tab,
  // Button,
  Tabs,
  Paper,
} from "@material-ui/core";
import { List, ListItemButton, ListItem, MenuItem, Menu } from "@mui/material";

const Horizontalbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCLose = (e) => {
    setAnchorEl(null);
  };
  return (
    <Box style={{ position: "relative" }}>
      <Paper
        variant="outlined"
        square
        style={{ position: "absolute", left: 160, width: "88vw" }}
      >
        <List sx={{ display: "flex", width: "60%" }}>
          <ListItemButton
            onClick={handleClick}
            // aria-control={open ? "book" : undefined}
          >
            <ListItem>Accounts</ListItem>
          </ListItemButton>
          <ListItemButton>
            <ListItem>Deposits</ListItem>
          </ListItemButton>
          <ListItemButton>
            <ListItem>Loans</ListItem>
          </ListItemButton>
          <ListItemButton>
            <ListItem>Credit Cards</ListItem>
          </ListItemButton>
          <ListItemButton>
            <ListItem>Other servies</ListItem>
          </ListItemButton>
        </List>
      </Paper>
      <Menu open={open} anchorEl={anchorEl} onClose={handleCLose}>
        <MenuItem id="book">Profile</MenuItem>
      </Menu>
    </Box>
  );
};

const Sidebar = (props) => {
  return (
    <div>
      <Horizontalbar />
      <Paper style={{ width: 160, height: "100vh" }}>
        <Tabs orientation="vertical">
          <Tab
            label={
              <p>
              Upload File
              </p>
            }
          />
         <Tab label="Account Statement" />
          <Tab label="Cheque Services" />
          <Tab label="Funds Transfer" />
          <Tab label="Book FD " />
          <Tab label="Manage Card" />
          
        </Tabs>
      </Paper>
    </div>
  );
};

export default Sidebar;