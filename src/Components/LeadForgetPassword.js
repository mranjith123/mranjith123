import React, {useState, useEffect} from "react";
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

const LeadForgetPassword = (props) => {
    const initialValue = {
        loginId: "",
        mobileOtp: "",
        emailOtp:""
    
    };
    
    const classes = useStyles();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formValues, setFormvalues] = useState(initialValue);
    const resendOtpHandler = (e) => {
        e.preventDefault();

    };

    const validate = (values) => {
        let error = {};
        if (!values.loginId) {
            error.loginId = "LoginId Field is Mandatory";
        }
        if (!validateMobileOtp(values.mobileOtp)) {
            error.mobileOtp = "MobileOtp didn't Match";
        }
        if (!validateEmailOtp(values.emailOtp)) {
            error.emailOtp = "EmailOtp didn't Match";
        }
        

        return error;
    };
    const sendOtpApi = "http://localhost:8085/sendOtp"; 

    useEffect(()=>{
        axios
        .post(
        sendOtpApi,
          { customerId: 1},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("response", res.data);
          
          
        })
        .catch((err) => {
          console.log(err.response.data);
          setErrors({
            loginId: err.response.data,
            
          });
        });
    },[]);

    const validateOtpApi = "http://localhost:8085/validateOtp"; 
    const nextHandler = (e) => {
        e.preventDefault();
        let error = validate(formValues);
        console.log("from validate function", error, Boolean(error));
        setErrors(error);
        if (Object.keys(error).length === 0) { 
            navigate("/leadResetPassword");
            axios
            .post(
              validateOtpApi,
              { sendOtpApi: formValues.mobileOtp},
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log("response", res.data);
              navigate("/leadResetPassword");
              
            })
            .catch((err) => {
              console.log(err.response.data);
              setErrors({
                loginId: err.response.data,
                
              });
            });
            
        }

    };

    const changeHandler = (e) => {
        setFormvalues({ ...formValues, [e.target.name]: e.target.value });
    };

    const validateMobileOtp = (otp) =>{
        const re ="1234"
        return re === otp;

   }

   const validateEmailOtp = (otp) =>{
    const re ="4321"
    return re === otp;

}

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
                                helperText={errors.loginId && errors.loginId}
                                error={errors.loginId}

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
                                helperText={errors.mobileOtp && errors.mobileOtp}
                                error={errors.mobileOtp}

                            />
                        </Grid>
                        <Grid item sm={4}>
                            <Button
                                onClick={resendOtpHandler}
                                type="submit"
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
                                helperText={errors.emailOtp && errors.emailOtp}
                                error={errors.emailOtp}

                            />
                        </Grid>
                        <Grid item sm={4}>
                            <Button
                                onClick={resendOtpHandler}
                                type="submit"
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

export default LeadForgetPassword;