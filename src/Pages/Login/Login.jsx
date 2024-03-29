import "./Login.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";

function Login({ setAuth }) {
  const userNameEntered = useRef("");
  const passwordEntered = useRef("");
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");

  async function login1() {
    setLoginMessage("");
    if (userNameEntered.current.value && passwordEntered.current.value) {
      const response = await fetch(
        "https://survey-backend-wnwj.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: userNameEntered.current.value,
            password: passwordEntered.current.value,
          }),
        }
      );
      const status = response.status;
      console.log(status);
      const data = await response.json();
      if (status === 200) {
        localStorage.setItem("accessToken", JSON.stringify(data));
        setAuth(JSON.parse(localStorage.getItem("accessToken")));
        navigate("/");
      } else {
        setLoginMessage("שם משתמש או מייל לא תקינים");
      }
    } else {
      setLoginMessage("בבקשה הכנס/י שם משתמש ומייל");
    }
  }

  function register() {
    setLoginMessage("");
    if (userNameEntered.current.value && passwordEntered.current.value) {
      fetch("https://survey-backend-wnwj.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: userNameEntered.current.value,
          password: passwordEntered.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      setLoginMessage("לאחר הרישום לחץ על כפתור - התחבר");
    } else {
      setLoginMessage("הכנס שם משתמש וסיסמא");
    }
  }

  return (
    <div className="board">
      <div className="login">
        <div className="inputFields">
          <div className="title">
            <div className="title">כניסה</div>
          </div>
          <div className="signUpBox">
            <div className="userNameBox inputField">
              <PersonIcon className="personIcon icon" />
              <input
                className="userName"
                type="text"
                ref={userNameEntered}
                placeholder="שם משתמש"
                durection="rtl"
                required
              />
              <PersonIcon className="personIcon icon" />
            </div>
            <div className="emailBox inputField">
              <input
                className="email"
                type="email"
                ref={passwordEntered}
                placeholder="אימייל"
                required
              />
              <EmailIcon className="emailIcon icon" />
            </div>
          </div>
          <button type="button" className="registerButton" onClick={register}>
            הרשם
          </button>
          <p className="errorMessage">{loginMessage}</p>
          <div className="signInBox">
            <button type="button" className="loginButton" onClick={login1}>
              התחבר
            </button>
            <h4 className="smallTitle">?האם אתה כבר רשום במערכת </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
