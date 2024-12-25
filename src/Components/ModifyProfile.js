import React, { useState, useContext, useEffect } from "react";
import { TableContext } from "../../../App";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Alert,
  Snackbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";
import { validate } from "../CreateProfile";
import axios from "axios";

const ModifyProfile = (props) => {
  const { id } = useParams();
  const { rows, setRows } = useContext(TableContext);
  console.log("rows", rows);
  const navigate = useNavigate();
  const UPDATE_API = "http://localhost:8086/update/";
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    empId: "",
    empName: "",
    mobileNo: "",
    emailId: "",
    accessType: "",
    userType: "",
  });

  const data = rows.find((row) => row.empId == id);
  const accessType = [
    "Maker-1",
    "Checker-1",
    "Maker-2",
    "Checker-2",
    "Maker-1 & Checker-1",
    "Maker-2 & Checker-2",
  ];
  const userType = ["Branch User", "NOC User"];
  useEffect(() => {
    console.log("row data", data);
    setProfile({
      empId: data.empId,
      empName: data.empName,
      mobileNo: data.mobileNo,
      emailId: data.emailId,
      accessType: data.accessType,
      userType: data.userType,
    });
  }, []);
  const submitHandler = () => {
    let error = validate(profile);
    const { empId } = profile;
    setError(error);
    if (Object.keys(error).length == 0) {
      axios.put(`${UPDATE_API} ${empId}`, profile);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/admin/modify-profile");
      }, 1500);
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const backHandler = () => {
    navigate("/admin/modify-profile");
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
                type="number"
                name="empId"
                value={profile.empId}
                error={error.empId}
                helperText={error ? error.empId : ""}
                readOnly
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
                name="empName"
                value={profile.empName}
                error={error.empName}
                helperText={error ? error.empName : ""}
                readOnly
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
                    readOnly
                  />
                </Grid>
                <Grid item sm={9}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="large"
                    color="primary"
                    type="number"
                    name="mobileNo"
                    onChange={changeHandler}
                    value={profile.mobileNo}
                    error={error.mobileNo}
                    helperText={error ? error.mobileNo : ""}
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
                name="emailId"
                value={profile.emailId}
                error={error.emailId}
                helperText={error ? error.emailId : ""}
                readOnly
              />
            </Grid>
            <Grid item sm={4}>
              <Typography>Access Type</Typography>
            </Grid>
            <Grid item sm={8}>
              <FormControl error={error.accessType}>
                <Select
                  sx={{ width: 313 }}
                  value={profile.accessType}
                  onChange={changeHandler}
                  name="accessType"
                  error={error.accessType}
                  helperText={error ? error.accessType : ""}
                >
                  {accessType.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
                <FormHelperText>
                  {error.accessType ? "required" : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <Typography>User Type</Typography>
            </Grid>
            <Grid item sm={8}>
              <FormControl error={error.userType}>
                <Select
                  sx={{ width: 313 }}
                  name="userType"
                  value={profile.userType}
                  onChange={changeHandler}
                  error={error.userType}
                  helperText={error ? error.userType : ""}
                >
                  {userType.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
                <FormHelperText>
                  {error.userType ? "required" : ""}
                </FormHelperText>
              </FormControl>
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
                  onClick={submitHandler}
                  color="error"
                >
                  Modify
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
        <Alert>Profile Modified Successfully</Alert>
      </Snackbar>
    </div>
  );
};

export default ModifyProfile;