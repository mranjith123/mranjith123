import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Box,
  InputLabel,
  Paper,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    padding: "10px",
  },
  boxStyle: {
    flexDirection: "column",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "91vh",
  },
}));

const Prac = () => {
  const initialValue = {
    loginId: "",
    mobileOtp: "",
    emailOtp: "",
  };

  const classes = useStyles();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.loginId) {
      newErrors.loginId = "Login Id is required";
    }

    if (!formValues.mobileOtp) {
      newErrors.mobileOtp = "Mobile OTP is required";
    }

    if (!formValues.emailOtp) {
      newErrors.emailOtp = "Email OTP is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resendOtpHandler = (e) => {
    e.preventDefault();
    // Add logic for resending OTP if needed
  };

  const nextHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add logic for handling the "Next" button click
      navigate("/reset_password");
    }
  };

  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div>
      <Box className={classes.boxStyle}>
        <Typography component="h3" variant="h6">
          FORGOT PASSWORD
        </Typography>

        <Paper className={classes.root}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item sm={3}>
              <InputLabel>Login Id</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <TextField
                fullWidth
                label=""
                name="loginId"
                type="text"
                variant="outlined"
                size="small"
                value={formValues.loginId}
                onChange={changeHandler}
                error={Boolean(errors.loginId)}
                helperText={errors.loginId}
              />
            </Grid>
            <Grid item sm={4}></Grid>

            <Grid item sm={3}>
              <InputLabel>Mobile OTP</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <TextField
                fullWidth
                type="number"
                label=""
                name="mobileOtp"
                variant="outlined"
                size="small"
                value={formValues.mobileOtp}
                onChange={changeHandler}
                error={Boolean(errors.mobileOtp)}
                helperText={errors.mobileOtp}
              />
            </Grid>
            <Grid item sm={4}>
              <Button
                onClick={resendOtpHandler}
                variant="contained"
                color="primary"
                size="small"
              >
                Resend OTP
              </Button>
            </Grid>

            <Grid item sm={3}>
              <InputLabel>Email OTP</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <TextField
                fullWidth
                type="number"
                label=""
                name="emailOtp"
                variant="outlined"
                size="small"
                value={formValues.emailOtp}
                onChange={changeHandler}
                error={Boolean(errors.emailOtp)}
                helperText={errors.emailOtp}
              />
            </Grid>
            <Grid item sm={4}>
              <Button
                onClick={resendOtpHandler}
                variant="contained"
                color="primary"
                size="small"
              >
                Resend OTP
              </Button>
            </Grid>

            <Grid item sm={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={nextHandler}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default Prac;
