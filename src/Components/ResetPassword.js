import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
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

const ResetPassword = (props) => {
    const initialValue = {
        loginId: "",
        newPassword: "",
        confirmPassword: ""

    };

    const classes = useStyles();

    const [errors, setErrors] = useState({});
    const [formValues, setFormvalues] = useState(initialValue);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const validate = (values) => {
        let error = {};
        if (!values.loginId) {
            error.loginId = "LoginId Field is Mandatory";
        }
        if (!validatePasswordReg(values.newPassword)) {

            error.newPassword = "NewPassword should be alphaNumeric and !@#$%^&* of length min 7 and max 15";
        }
        if (!validatePassword(values.newPassword, values.confirmPassword)) {
            error.password = "NewPassword and confirm password didn't Match";
        }
        return error;
    };

    const validatePasswordReg = (userId) => {
        const re = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{7,15})/
        return re.test(userId);

    }

    const validatePassword = (newPassword, confirmPassword) => {
        if (newPassword === "" || confirmPassword === "") {

            return false
        }
        else {
            return newPassword === confirmPassword;
        }
    }

    const resetPasswordHandler = (e) => {
        e.preventDefault();
        let error = validate(formValues);
        console.log("from validate function", error, Boolean(error));
        setErrors(error);
        if (Object.keys(error).length === 0) {
            setOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }

    }

    const changeHandler = (e) => {
        setFormvalues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Box className={classes.boxStyle}>
                <Typography component="h3" variant="h6">
                    RESET PASSWORD
                </Typography>
                <Paper className={classes.root}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item sm={5}>
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
                        <Grid item sm={2}></Grid>
                        <Grid item sm={5}>
                            <InputLabel>New Password</InputLabel>
                        </Grid>
                        <Grid item sm={5}>
                            <TextField
                                fullWidth
                                type="password"
                                label=""
                                name="newPassword"
                                variant="outlined"
                                size="small"
                                value={formValues.newPassword}
                                onChange={changeHandler}
                                helperText={errors.newPassword && errors.newPassword}
                                error={errors.newPassword}
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
                                label=""
                                name="confirmPassword"
                                variant="outlined"
                                size="small"
                                value={formValues.confirmPassword}
                                onChange={changeHandler}
                                helperText={errors.newPassworderrors == null && errors.password}
                                error={errors.password}


                            />
                        </Grid>
                        <Grid item sm={2}></Grid>
                        <Grid item sm={5}>
                            <Button
                                onClick={resetPasswordHandler}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"

                            >
                                SUBMIT
                            </Button>

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
                <Alert severity="success">Password Changed Successfully</Alert>
            </Snackbar>
        </div>
    );
};

export default ResetPassword;