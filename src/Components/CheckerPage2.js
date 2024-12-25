import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import CheckerPageForm2 from "./CheckerPageForm2";

const useStyles = makeStyles((theme) => ({
  userContent: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(0),
    padding: theme.spacing(3),
  },
}));

const CheckerPage2 = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.userContent}>
        <CheckerPageForm2 />
      </div>
    </>
  );
};

export default CheckerPage2;