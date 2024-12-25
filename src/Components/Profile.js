import React, { useState, useContext, useEffect } from "react";
// import { TableContext } from "../../../App";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Profile = (props) => {
  const { id } = useParams();
  // const { rows } = useContext(TableContext);
  const FETCH_API = "http://localhost:8086/fetch/";
  const [profile, setProfile] = useState({
    empId: "",
    empName: "",
    mobileNo: "",
    emailId: "",
    accessType: "",
    userType: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${FETCH_API}${id}`)
      .then((res) => {
        console.log("Fetch Data ", res.data);
        let data = res.data;
        setProfile({
          empId: data.empId,
          empName: data.empName,
          mobileNo: data.mobileNo,
          emailId: data.emailId,
          accessType: data.accessType,
          userType: data.userType,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickHandler = () => {
    navigate("/admin/view-profile");
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
                value={profile.empId}
                disabled
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
                value={profile.userType}
                disabled
              >
                <MenuItem value={profile.userType}>{profile.userType}</MenuItem>
              </Select>
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
                  // onClick={clickHandler}
                  color="success"
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Profile;