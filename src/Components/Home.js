import React, { useState } from "react";
import "./home.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",

    display: "flex",

    height: "93vh",
  },
}));

function Home() {
  const [markerFlag, setMakrkerFlag] = useState(false);
  const [inward, setInward] = useState(false);
  const handleMarker = (e) => {
    setMakrkerFlag(!markerFlag);
  };

  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.root}>
        <nav>
          <ul className="orderlist">
            <li>Type</li>
            {false ? (
              <ul>
                <li>
                  <a onClick={handleMarker}>Maker</a>
                  {markerFlag ? (
                    <ul className="orderSublist">
                      <li>
                        <a>-- New Case</a>
                      </li>
                      <li>
                        <a>-- Existing Case</a>
                      </li>
                    </ul>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  <a>Checker</a>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
}
export default Home;