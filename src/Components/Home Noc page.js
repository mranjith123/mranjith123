import React, { useState, useEffect } from "react";
import "./home.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/List";
import axios from "axios";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate, Outlet, useHistory } from "react-router-dom";
import CheckerTable from "../Checker/CheckerTable";
import Maker2Table from "../Table/Maker2Table";
import Checker2Table from "../Table/Checker2Table";
const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    display: "flex",
    "& .MuiDrawer-root": -1200,
  },
}));

function HomeNocpage({ setLogin }) {
  const classes = useStyles();
  const [markerFlag, setMakrkerFlag] = useState(false);
  const [tableFlag, setTableFlag] = useState(false);
  const [makerFlag, setMakerFlag] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleMarker = (e) => {
    setMakerFlag(!makerFlag);
    setTableFlag(false);
  };

  const newCaseHandler = (e) => {
    navigate("/makerpage");
  };
  const checkerHandler = (e) => {
    setTableFlag(!tableFlag);
    setMakerFlag(false);
  };
  useEffect(() => {
    setLogin(true);
  }, []);

  const list = () => (
    <Box className="drawer" role="presentation">
      <List>
        <ListItem>
          <ListItemText primary="Transaction Type" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={handleMarker}>
            <ListItemText primary="NOC MAKER" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={checkerHandler}>
            <ListItemText primary="NOC CHECKER" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" open={true}>
        {list()}
      </Drawer>
      {makerFlag ? <Maker2Table /> : <></>}
      {tableFlag ? <Checker2Table /> : "no data availble"}
      <Outlet />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">Access Not Allowed</Alert>
      </Snackbar>
    </div>
  );
}
export default HomeNocpage;