import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormGroup,
  FormHelperText,
  FormControl,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
export const validate = (profile) => {
  const { empId, empName, mobileNo, emailId, accessType, userType } = profile;
  let temp = {};
  let empIdRegex = /[0-9]{6,11}/;

  let emailIdRegex = /^([a-z0-9_\.\+-]+)@hdfcbank.com$/;
  if (empId == "") {
    temp.empId = "this is required";
  } else if (empId.length > 10) {
    temp.empId = "too long";
  } else if (empId.length < 6) {
    temp.empId = "too short";
  }
  if (empName == "" || empName.length > 20) {
    temp.empName = "this is required or shoud contain only 20 character";
  }
  if (mobileNo == "") {
    temp.mobileNo = "this is required";
  } else if (mobileNo.length > 10 || mobileNo.length < 10) {
    temp.mobileNo = "this is required 10 digits only";
  }
  if (emailId == "") {
    temp.emailId = "this is required";
  } else if (!emailIdRegex.test(emailId)) {
    temp.emailId = "wrong email format";
  }
  if (accessType == "") {
    temp.accessType = "this is required";
  }
  if (userType == "") {
    temp.userType = "this is required";
  }
  return temp;
};

const CreateProfile = (props) => {
  const [profile, setProfile] = useState({
    empId: "",
    empName: "",
    mobileNo: "",
    emailId: "",
    accessType: "",
    userType: "",
  });
  const CREATE_API = "http://localhost:8086/save";
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const accessType = [
    "MAKER1",
    "CHECKER1",
    "MAKER2",
    "CHECKER2",
    "MAKER1 & CHECKER1",
    "MAKER2 & CHECKER2",
  ];
  const userType = ["Branch User", "NOC User"];
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const submitHandler = () => {
    let error = validate(profile);
    setError(error);
    console.log(error);
    if (Object.keys(error).length == 0) {
      axios
        .post(CREATE_API, profile)
        .then((res) => {
          console.log(res);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            // setProfile({
            //   empId: "",
            //   empName: "",
            //   mobileNo: "",
            //   emailId: "",
            //   accessType: "",
            //   userType: "",
            // });
            navigate("/admin/view-profile");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                    value={profile.mobileNo}
                    error={error.mobileNo}
                    helperText={error ? error.mobileNo : ""}
                    onChange={changeHandler}
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
                onChange={changeHandler}
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
                  defaultValue="Please Select"
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
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={submitHandler}
                  color="success"
                >
                  Submit
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
        <Alert severity="success">Profile Created Successfully</Alert>
      </Snackbar>
    </div>
  );
};

export default CreateProfile;