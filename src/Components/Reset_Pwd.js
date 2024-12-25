import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  Box,
  InputLabel,
  Paper,
  makeStyles,
  Typography,
  FormControl,
} from "@material-ui/core";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SEND_OTP_API, VALIDATE_OTP } from "../../utils/APIs";
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

const Reset_Pwd = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [sendOtp, setSendOtp] = useState(false);
  const [formValues, setFormvalues] = useState({
    customerId: "",
    otp: "",
    submit: false,
    pwdSubmit: false,
  });

  const changeHandler = (e) => {
    setErrors({});
    setFormvalues({ ...formValues, [e.target.name]: e.target.value });
    // setPwdVal({ ...pwdVal, [e.target.name]: e.target.value });
  };
  // Set Password Component //
  const Resetpwd = ({ customerId }) => {
    const [pwdVal, setPwdVal] = useState({
      customerId,
      newPassword: "",
      confirmPassword: "",
    });
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const changeHandler = (e) => {
      setErrors({});
      setPwdVal({ ...pwdVal, [e.target.name]: e.target.value });
    };
    const validatePassword = ({ newPassword, confirmPassword }) => {
      let temp = {};
      if (newPassword == "") {
        temp["password"] = "Enter Password";
        return temp;
      } else if (newPassword !== confirmPassword) {
        temp["passwordConfirm"] = "password didn't match";
        return temp;
      } else {
        return newPassword == confirmPassword;
      }
    };
    const submitHandler = (e) => {
      e.preventDefault();
      let error = validatePassword(pwdVal);
      console.log("Final from validate function", error, Boolean(error));
      setErrors(error);
      if (Object.keys(error).length == 0) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/login");
        }, 2000);
      }
    };
    return (
      <Paper className={classes.root}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item sm={5}>
            <InputLabel>Login Id</InputLabel>
          </Grid>
          <Grid item sm={5}>
            <TextField
              fullWidth
              readOnly
              name="customerId"
              type="text"
              variant="outlined"
              size="small"
              value={pwdVal.customerId}
            />
          </Grid>
          <Grid item sm={2}></Grid>
          <Grid item sm={5}>
            <InputLabel>New Password</InputLabel>
          </Grid>
          <Grid item sm={5}>
            <TextField
              fullWidth
              type="password"
              name="newPassword"
              variant="outlined"
              size="small"
              value={pwdVal.newPassword}
              onChange={changeHandler}
              error={errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item sm={2}></Grid>
          <Grid item sm={5}>
            <InputLabel>Confirm Password</InputLabel>
          </Grid>
          <Grid item sm={5}>
            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              variant="outlined"
              size="small"
              value={pwdVal.confirmPassword}
              onChange={changeHandler}
              error={errors.passwordConfirm}
              helperText={errors.passwordConfirm}
            />
          </Grid>
          <Grid item sm={2}></Grid>
          <Grid item sm={5}>
            <Button
              onClick={submitHandler}
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity="success">Password Changed Successfully</Alert>
        </Snackbar>
      </Paper>
    );
  };

  // send-otp handler
  const sendOtpHandler = (e) => {
    const { customerId } = formValues;
    let temp = { ...errors };
    if (customerId == "") {
      temp["customerId"] = "Enter Customer Number";
      setErrors(temp);
    } else {
      axios
        .post(`http://localhost:1111/sendOtp`, { customerId })
        .then((res) => {
          console.log("Send Otp Handler Response : ", res);
          setSendOtp(true);
        })
        .catch((err) => {
          console.log(err);
          temp["customerId"] = "Wrong Customer Number";
          setErrors(temp);
        });
    }
  };

  //re sent-otp handler
  const resendOtpHandler = (e) => {
    const { customerId } = formValues;
    let temp = { ...errors };
    if (customerId == "") {
      temp["customerId"] = "Enter Customer Number";
      setErrors(temp);
    } else {
      axios
        .get(`http://localhost:1111/resendOtp`)
        .then((res) => {
          console.log("Send Otp Handler Response : ", res);
          setSendOtp(true);
        })
        .catch((err) => {
          console.log(err);
          temp["customerId"] = "Wrong Customer Number";
          setErrors(temp);
        });
    }
  };

  //Validate Otp Handler
  const validateOtpHandler = (e) => {
    let temp = { ...errors };
    const { customerId, otp } = formValues;
    if (customerId == "") {
      temp["customerId"] = "Enter Customer Id";
      setErrors({ ...temp });
    }
    if (otp == "") {
      temp["otp"] = "Enter OTP";
      setErrors({ ...temp });
    }
    if (customerId != "" && otp != "") {
      axios.post(VALIDATE_OTP, { otp }).then((res) => {
        console.log("Correct Otp : ", res);
        if (res.data == "Correct OTP") {
          setFormvalues({ ...formValues, pwdSubmit: true });
        } else {
          temp["otp"] = "OTP didn't Match";
          setErrors({ ...temp });
        }
      });
    }
  };

  //compoundDidMount
  useEffect(() => {
    console.log("render");
  }, []);

  //Render
  return (
    <div>
      <Box className={classes.boxStyle}>
        <Typography component="h3" variant="h6">
          RESET PASSWORD
        </Typography>
        {formValues.pwdSubmit ? (
          //Password
          <Resetpwd customerId={formValues.customerId} />
        ) : (
          // LogIn with OTP
          <Paper className={classes.root}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item sm={5}>
                <InputLabel>Login ID</InputLabel>
              </Grid>

              <Grid item sm={5}>
                <TextField
                  fullWidth
                  name="customerId"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={formValues.customerId}
                  onChange={changeHandler}
                  helperText={errors.customerId}
                  error={errors.customerId}
                />
              </Grid>
              <Grid item sm={2}></Grid>
              {sendOtp ? (
                <>
                  <Grid item sm={5}>
                    <InputLabel>Enter OTP</InputLabel>
                  </Grid>
                  <Grid item sm={5}>
                    <TextField
                      fullWidth
                      type="password"
                      name="otp"
                      variant="outlined"
                      size="small"
                      value={formValues.otp}
                      error={errors.otp}
                      helperText={errors.otp}
                      onChange={changeHandler}
                    />
                  </Grid>
                </>
              ) : (
                <></>
              )}
              <Grid item sm={2}></Grid>
              {sendOtp ? (
                <Grid item sm={5}>
                  <Button
                    onClick={validateOtpHandler}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    SUBMIT
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item sm={5}>
                {sendOtp ? (
                  <Button
                    onClick={resendOtpHandler}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    RESEND OTP
                  </Button>
                ) : (
                  <Button
                    onClick={sendOtpHandler}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    SEND OTP
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default Reset_Pwd;