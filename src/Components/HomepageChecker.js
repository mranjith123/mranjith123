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

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    display: "flex",
    "& .MuiDrawer-root": -1200,
  },
}));

function HomepageChecker(props) {
  const classes = useStyles();
  const [markerFlag, setMakrkerFlag] = useState(false);
  const [tableFlag, setTableFlag] = useState(false);
  const [accessType, setAccessType] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleMarker = (e) => {
    setTableFlag(false);
    setMakrkerFlag(!markerFlag);
  };

  const newCaseHandler = (e) => {
    navigate("/makerpage");
  };
  const checkerHandler = (e) => {
    setTableFlag(!tableFlag);
    markerFlag(false);
  };
  // useEffect(() => {
  //   let ACCESS_API = `http://localhost:8080/api/access/1`;
  //   axios.get(ACCESS_API).then((res) => {
  //     const access = res.data;
  //     console.log("access", access);
  //     setAccessType(access);
  //   });
  //   // navigate("/");
  //   return () => {
  //     console.log("back button working");
  //   };
  // });
  // const subList = () => (
  //   <Box role="presentation">
  //     <List>
  //       <ListItem>
  //         <ListItemButton onClick={newCaseHandler}>
  //           <ListItemText primary="New Case" />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //     <List>
  //       <ListItem>
  //         <ListItemButton>
  //           <ListItemText primary="Existing Case" />
  //         </ListItemButton>
  //       </ListItem>
  //     </List>
  //   </Box>
  // );

  const list = () => (
    <Box className="drawer" role="presentation">
      <List>
        <ListItem>
          <ListItemText primary="Type " />
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        <ListItem>
          <ListItemButton onClick={handleMarker}>
            <ListItemText primary="Maker" />
            {markerFlag ? subList() : <></>}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider /> */}
      <List>
        <ListItem>
          <ListItemButton onClick={checkerHandler}>
            <ListItemText primary="Checker" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" open={true}>
        {/* <Header /> */}
        {list()}
      </Drawer>
      {tableFlag ? <CheckerTable /> : "no data availble"}
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
export default HomepageChecker;