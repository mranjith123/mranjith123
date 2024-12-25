import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Button from "@mui/material/Button";
import { FaUserAlt, FaKey } from "react-icons/fa";
import Header from "../Header/header";
import Footer from "../Footer/footer";

function Login() {
  const [custId, setCustId] = useState("");
  const [password, setPassword] = useState("");
  const handleUserId = (e) => {
    setCustId(e.target.value);
    console.log(custId);
  };
  const API = "http://localhost:8085/api/v1/user/login";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("custId", typeof custId);
    axios
      .post(API, {
        method: "POST",
        body: JSON.stringify({ custId: Number(custId), password }),
      })
      .then((res) => {
        console.log("axios respond", res);
        navigate("/home");
      })
      .catch((err) => {
        console.log("catch error : ", err.message, err);
      });
  };
  return (
    <div>
      <div className="header">WELCOME</div>
      <center>
        <div>
          <div className="form-formatter">
            <div className="input-box-wrapper">
              <h3>Enter Login Details</h3>

              <div>
                <FaUserAlt className="icon-style" />
                <label>User Id &nbsp;&nbsp;</label>
                <input
                  className="input-box"
                  type="text"
                  name="custId"
                  required
                  maxLength={10}
                  minLength={5}
                  value={custId}
                  // pattern="(?=.*[0-9]).{5,10}"
                  // title="Must be Numeric"
                  onChange={handleUserId}
                />
              </div>
              <div>
                <FaKey className="icon-style" />
                <label>Password</label>
                <input
                  className="input-box"
                  type="password"
                  required
                  maxLength={17}
                  minLength={7}
                  name="Password"
                  value={password}
                  // pattern="(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{7,17}"
                  // title="Must contain at least one number one uppercase one special character and lowercase letter, and at least 7 characters"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <FaEyeSlash />  */}
              </div>
              <div>
                <Button
                  className="button-style"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </div>
              <a href="sample">Forget Password</a>
            </div>
          </div>
        </div>
      </center>
      <Footer />
    </div>
  );
}
export default Login;