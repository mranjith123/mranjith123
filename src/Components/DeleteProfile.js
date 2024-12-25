import React, { useState, useContext, useEffect } from "react";
import { TableContext } from "../../../App";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteProfile = (props) => {
  const { id } = useParams();
  const { rows, setRows } = useContext(TableContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const DELETE_API = "http://localhost:8086/delete/";
  const [profile, setProfile] = useState({
    empId: "",
    empName: "",
    mobileNo: "",
    emailId: "",
    accessType: "",
    userType: "",
  });

  useEffect(() => {
    const data = rows.find((row) => row.id == id);
    console.log(data);
    setProfile({
      empId: data.empId,
      empName: data.empName,
      mobileNo: data.mobileNo,
      emailId: data.emailId,
      accessType: data.accessType,
      userType: data.userType,
    });
  }, []);

  const deleteHandler = () => {
    console.log("deleted");
    axios
      .delete(`${DELETE_API}${id}`)
      .then((res) => {
        console.log(res);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setOpen(false);
      navigate("/admin/delete-profile");
    }, 1500);
  };
  const backHandler = () => {
    navigate("/admin/delete-profile");
  };

  return (
    <div>
      <Box sx={{ width: 500, display: "flex" }}>
        <form>
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <Typography>Emp Id</Typography>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="large"
                color="primary"
                type="text"
                disabled
                value={profile.empId}
              />
            </Grid>
            <Grid item sm={4}>
              <Typography>Emp Name</Typography>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="large"
                color="primary"
                type="text"
                disabled
                value={profile.empName}
              />
            </Grid>
            <Grid item sm={4}>
              <Typography>Mobile Number</Typography>
            </Grid>
            <Grid item sm={8}>
              <Grid container spacing={1}>
                <Grid item sm={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="phone"
                    value="+91"
                    disabled
                  />
                </Grid>
                <Grid item sm={9}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="mobile"
                    disabled
                    value={profile.mobileNo}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Typography>Email ID</Typography>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                size="large"
                color="primary"
                type="email"
                disabled
                value={profile.emailId}
              />
            </Grid>
            <Grid item sm={4}>
              <Typography>Access Type</Typography>
            </Grid>
            <Grid item sm={8}>
              <Select
                sx={{ width: 313 }}
                value={profile.accessType}
                name="accessType"
                disabled
              >
                <MenuItem value={profile.accessType}>
                  {profile.accessType}
                </MenuItem>
              </Select>
            </Grid>
            <Grid item sm={4}>
              <Typography>User Type</Typography>
            </Grid>
            <Grid item sm={8}>
              <Select
                sx={{ width: 313 }}
                name="userType"
                disabled
                value={profile.userType}
              >
                <MenuItem value={profile.userType}>{profile.userType}</MenuItem>
              </Select>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={deleteHandler}
                  color="error"
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={backHandler}
                  color="success"
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error">Profile Deleted Successfully</Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteProfile;