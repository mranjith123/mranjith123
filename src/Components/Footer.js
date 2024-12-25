import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import "./footer.css";

const Footer = (props) => {
  return (
    <div className="footer-bottom" style={{ zIndex: 1201 }}>
      <Box>
        <Grid
          style={{ backgroundColor: "#3f51b5", padding: 10, bottom: 0 }}
          container
          justifyContent="center"
        >
          <Grid item sx={{ marginLeft: 10 }}>
            <Typography component="p" variant="p">
              About us
            </Typography>
            <Typography component="p" variant="p">
              Locate us
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="p">
              Customer care
            </Typography>
            <Typography component="p" variant="p">
              Feedback
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Footer;