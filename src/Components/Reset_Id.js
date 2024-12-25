import React, { useState, useEffect } from "react";
import {
  GET_OTP,
  GET_CUSTID,
  VALIDATE_OTP,
  RESEND_OTP,
} from "../../utils/APIs";
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
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Reset_Id = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [infoDetails, setInfoDetails] = useState({
    debitCardNo: "",
    debitCardPin: "",
    otp: "",
  });
  const [open, setOpen] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);

  // Validate Form
  const validate = (values) => {
    const { debitCardNo, debitCardPin, otp, tempOtp } = values;
    console.log("OTP", otp, "tempOtp", tempOtp);
    let temp = {};
    if (debitCardNo == "" && debitCardPin == "" && otp == "") {
      temp["debitCardNo"] = "Enter Card Number";
      temp["debitCardPin"] = "Enter Card Pin";
      temp["otp"] = "Enter OTP";
      return temp;
    } else if (debitCardNo == "" || debitCardNo.length < 16) {
      temp["debitCardNo"] = "Enter Card Number";
    } else if (debitCardPin == "" || debitCardPin.length < 4) {
      temp["debitCardPin"] = "Enter Card Pin";
    } else if (otp == "") {
      temp["otp"] = "Enter OTP";
    }
    return temp;
  };

  // Format Card
  const formatCardNumber = (value) => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  //OTP Handler
  const otpHandler = (e) => {
    const { debitCardNo, debitCardPin } = infoDetails;
    let temp = { ...errors };
    const debitCardNowithoutSpace = debitCardNo.split(" ").join("");
    if (!infoDetails.debitCardNo) {
      temp["debitCardNo"] = "Enter card number";
      setErrors(temp);
    }
    if (infoDetails.debitCardPin == "") {
      temp["debitCardPin"] = "Enter Pin number";
      setErrors(temp);
    } else {
      axios
        .post(GET_OTP, {
          debitCardNo: debitCardNowithoutSpace,
          debitCardPin,
        })
        .then((res) => {
          setSendOtp(true);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          temp["debitCardNo"] = "Wrong debit Card No";
          temp["debitCardPin"] = "Wrong Pin number";
          setErrors(temp);
        });
    }
  };

  //RE-SEND OTP Handler
  const reSendOtpHandler = (e) => {
    const { debitCardNo, debitCardPin } = infoDetails;
    let temp = { ...errors };
    const debitCardNowithoutSpace = debitCardNo.split(" ").join("");
    if (!infoDetails.debitCardNo) {
      temp["debitCardNo"] = "Enter card number";
      setErrors(temp);
    }
    if (infoDetails.debitCardPin == "") {
      temp["debitCardPin"] = "Enter Pin number";
      setErrors(temp);
    } else {
      axios.get(`http://localhost:1111/resendOtp`).then((res) => {
        let tempOtp = res.data.split("-")[1];
        console.log("OTP from API", tempOtp);
      });
    }
  };
  // Submit Handler
  const submitHandler = (e) => {
    const { debitCardNo, debitCardPin, otp } = infoDetails;
    console.log("Final card No without format");
    e.preventDefault();
    let error = validate(infoDetails);
    setErrors(error);
    if (Object.keys(error).length == 0) {
      axios
        .post(VALIDATE_OTP, { otp })
        .then((res) => {
          console.log("validate otp from api", res);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/login");
          }, 3000);
        })
        .then((res) => {
          axios.post(GET_CUSTID, {
            debitCardNo,
            debitCardPin,
            otp,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Change Handler
  const changeHandler = (e) => {
    const { debitCardNo, debitCardPin } = infoDetails;
    const { name, value } = e.target;
    setErrors({});
    if (e.target.name == "debitCardNo" && debitCardNo.length < 19) {
      setInfoDetails({ ...infoDetails, [name]: value });
    }
    if (e.target.name == "debitCardPin" && debitCardPin.length < 5) {
      setInfoDetails({ ...infoDetails, [name]: value });
    }
    setInfoDetails({ ...infoDetails, [name]: value });
  };

  //Validate Otp Handler
  const validateOtpHandler = (e) => {
    let temp = { ...errors };
    const { debitCardNo, debitCardPin, otp } = infoDetails;
    if (debitCardNo == "") {
      temp["debitCardNo"] = "Enter debit Card No";
      setErrors({ ...temp });
    }
    if (debitCardPin == "") {
      temp["debitCardPin"] = "Enter debit Card Pin";
      setErrors({ ...temp });
    }
    if (otp == "") {
      temp["otp"] = "Enter OTP";
      setErrors({ ...temp });
    }
    if (debitCardNo != "" && debitCardPin != "" && otp != "") {
      axios.post(VALIDATE_OTP, { otp }).then((res) => {
        console.log("Correct Otp : ", res);
        if (res.data == "Correct OTP") {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/login");
          }, 3000);
        } else {
          temp["otp"] = "OTP didn't Match";
          setErrors({ ...temp });
        }
      });
    }
  };

  return (
    <div>
      <Box className={classes.boxStyle}>
        <Typography component="h3" variant="h6">
          Retrieve Login ID
        </Typography>
        <Paper className={classes.root}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sm={4}>
              <InputLabel>Debit Card No</InputLabel>
            </Grid>
            <Grid item sm={6}>
              <TextField
                style={{ width: 185 }}
                inputProps={{
                  maxLength: 19,
                }}
                fullWidth
                name="debitCardNo"
                type="text"
                variant="outlined"
                size="small"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={formatCardNumber(infoDetails.debitCardNo)}
                onChange={changeHandler}
                helperText={errors.debitCardNo && errors.debitCardNo}
                error={errors.debitCardNo}
              />
            </Grid>
            <Grid item sm={2}></Grid>

            <Grid item sm={5}>
              <InputLabel>Debit Card Pin</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <TextField
                style={{ position: "relative", right: 33, width: 182 }}
                inputProps={{
                  maxLength: 4,
                }}
                fullWidth
                name="debitCardPin"
                type="password"
                variant="outlined"
                size="small"
                value={infoDetails.debitCardPin}
                onChange={changeHandler}
                helperText={errors.debitCardPin && errors.debitCardPin}
                error={errors.debitCardPin}
              />
            </Grid>
            <Grid item sm={2}></Grid>
            {sendOtp ? (
              <>
                <Grid item sm={4} sx={{ marginLeft: 10 }}>
                  <InputLabel>Enter OTP</InputLabel>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    name="otp"
                    variant="outlined"
                    size="small"
                    value={infoDetails.otp}
                    error={errors.otp}
                    helperText={errors.otp}
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item sm={2}></Grid>
              </>
            ) : (
              <></>
            )}
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
            <Grid item sm={3}>
              {sendOtp ? (
                <Button
                  onClick={reSendOtpHandler}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  RESEND OTP
                </Button>
              ) : (
                <Button
                  onClick={otpHandler}
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
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="success">
          Login ID sent to registered Email ID. moto*****@gmail.com
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Reset_Id;