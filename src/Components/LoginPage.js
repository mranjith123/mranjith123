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
} from "@material-ui/core";
import { generate } from "../../utils/generator";
import Paper_Core from "../ui_core/Paper_Core";
import Button_Core from "../ui_core/Button_Core";
import Input_Core from "../ui_core/Input_Core";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sideImag from "../../Assets/sideImg.jpg";

const initialValue = {
  userId: "",
  password: ""
  
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

const LoginPage1 = ({ setLogin, setCustomerLogin }) => {
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
      if (formValues.userId == "991188" && formVhalues.password == "Pass@123") {
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
        navigate("/");
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
            setCustomerLogin(true);
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
    setErrors({});
    setFormvalues({ ...formValues, [e.target.name]: e.target.value });
  };

 
  return (
    <div style={{ position: "absolute", left: "60%", top: "30%" }}>
      <div
        style={{
          position: "absolute",
          right: "650px",
          top: -10,
        }}
      >
        <img src={sideImag} />
      </div>
      <Box>
        <Paper_Core width={500} padding={2}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography component="h3" variant="h5">
                Login to NetBanking
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <Grid item sm={4}>
              <InputLabel>User ID</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <Input_Core
                fullWidth
                name="userId"
                type="number"
                variant="outlined"
                size="small"
                value={formValues.userId}
                onChange={changeHandler}
                helperText={errors.userId && errors.userId}
                error={errors.userId}
                autoComplete="off"
              />
            </Grid>
            <Grid item sm={4}>
              <InputLabel>Password</InputLabel>
            </Grid>
            <Grid item sm={5}>
              <Input_Core
                fullWidth
                type="password"
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
            
            <Grid item sm={3}>
              <Box>
                {/* <TextField
                  style={{ color: "white" }}
                  color="warning"
                  fullWidth
                  variant="outlined"
                  size="normal"
                  value={formValues.temCaptcha}
                  disabled
                /> */}
                <h5
                  style={{
                    color: "white",
                    fontSize: "18px",
                    letterSpacing: 6,
                    fontFamily: "serif",
                    fontStyle: "italic",
                  }}
                >
                  {formValues.temCaptcha}
                </h5>
              </Box>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item sm={3}>
                <Button_Core
                  onClick={loginHandler}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  title="SUBMIT"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item md={4}>
                <a href="resetpwd">Forget Password</a>
                <Grid item md={6}>
                  <a href="sample">New User</a>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <a href="resetid">Forget Login ID</a>
              </Grid>
            </Grid>
          </Grid>
        </Paper_Core>
      </Box>
    </div>
  );
};

export default LoginPage1;