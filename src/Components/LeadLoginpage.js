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

import { FaUserAlt, FaKey } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValue = {
  userId: "",
  password: "",
};

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
    height: "93vh",
  },
}));

const LeadLoginPage = ({ setLogin, setCustomerLogin }) => {
  const classes = useStyles();

  const [formValues, setFormvalues] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateUserId = (userId) => {
    const re = /^[0-9]{5,10}$/;
    return re.test(userId);
  };

  const validatePassword = (password) => {
    const re = /.[0-9].[a-z].[A-Z].[!@#$%^&*].{7,17}$/;
    console.log("password validation --", re.test(password));
    return re.test(password);
  };

  const validate = (values) => {
    let error = {};
    if (!validateUserId(values.userId)) {
      error.userId = "UserId is required and it should be Numeric";
    }
    if (validatePassword(values.password)) {
      error.password =
        "•Password Field is Mandatory, and it can contain Numeric, Special Characters, Alphabets & Max & Min Length Should be 7 & 17";
    }

    return error;
    // let error = {};
    // if (!values.userId.trim()) {
    //   error.userId = "Id is required";
    // }
    // if (!values.password.trim()) {
    //   error.password = "Password is required";
    // }
    // return error;
  };
  const API = "http://localhost:8085/api/v1/user/login";
  const loginHandler = (e) => {
    e.preventDefault();
    let error = validate(formValues);
    setErrors(error);
    if (Object.keys(error).length === 0) {
      if (formValues.userId == "991188" && formValues.password == "Pass@123") {
        setLogin(true);
        navigate("/admin");
      } else if (
        formValues.userId == "567890" &&
        formValues.password == "Pass@123"
      ) {
        setLogin(true);
        navigate("/homeNocPage");
      } else if (
        formValues.userId == "332211" &&
        formValues.password == "Pass@123"
      ) {
        setLogin(true);
        navigate("/homepagechecker");
      } else {
        axios
          .post(
            API,
            { custId: formValues.userId, password: formValues.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("response", res.data);
            localStorage.setItem("token", res.data.token);
            //setLogin(true);
            // setCustomerLogin(true);
            navigate("/leadhomepage");
          })
          .catch((err) => {
            console.log(err.response.data);
            setErrors({
              userId: err.response.data,
              password: err.response.data,
            });
          });
      }
    }
  };

  const changeHandler = (e) => {
    setFormvalues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="lead_section">
      <Box className={`${classes.boxStyle} leadloginpage`}>
        <div className="leadlogin-welcome"><h2 className="wel_log_in">Welcome to LeadManagement</h2>
          <Typography component="h3" variant="h6">
            Login
          </Typography>
          <Paper className={classes.root}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item sm={1}>
                <FaUserAlt />
              </Grid>
              <Grid item sm={4}>
                <InputLabel>Emp Id</InputLabel>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  fullWidth
                  label=""
                  name="userId"
                  type="text"
                  variant="outlined"
                  size="small"
                  value={formValues.userId}
                  onChange={changeHandler}
                  helperText={errors.userId && errors.userId}
                  error={errors.userId}
                  autoComplete="off"
                />
              </Grid>
              <Grid item sm={2}></Grid>
              <Grid item sm={1}>
                <FaKey />
              </Grid>
              <Grid item sm={4}>
                <InputLabel>Emp Pwd</InputLabel>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  fullWidth
                  type="password"
                  label=""
                  name="password"
                  variant="outlined"
                  size="small"
                  value={formValues.password}
                  error={errors.password}
                  helperText={errors.password && errors.password}
                  onChange={changeHandler}
                  maxLength={17}
                  minLength={7}
                />
              </Grid>
              <Grid item sm={2}></Grid>
              <Grid item sm={2}>
                <Button
                  onClick={loginHandler}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  className="submit_btnn"
                >
                  SUBMIT
                </Button>
              </Grid>
              <Grid item sm={4}></Grid>
              <Grid item md={7}>
                <a href="/leadforgetpwd" style={{ marginLeft: "75px" }}>Forget Password</a>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Box>
    </div>
  );
};

export default LeadLoginPage;