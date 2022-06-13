import "./ExampleOfCreatedSurvey.css";
import OpenQuestion from "../OpenQuestion/OpenQuestion";
import ScaleQuestion from "../ScaleQuestion/ScaleQuestion";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import jwt from "jwt-decode";


function ExampleOfCreatedSurvey() {
    
    const fName =useRef("");
    const lName =useRef("");
    const id =useRef("");
    const [messageForUser, setMessageForUser] = useState("");
    const [userChoice, setUserChoice] = useState("");
    const [userAnswer, setUserAnswer] = useState("")
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwt(accessToken);
    const location = useLocation();
    const savedDetailsOfSurvey = location.state.savedDetailsOfSurvey;
   
    function goBackToHomePage() {
        navigate("/");
    }

    return (
        <div className="surveyForUser_allThePage">
          <div className="header">
                <div className="siteName">מערכת סקרים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
            </div>
        <div className="surveyContainer">
          <div className="surveyUserForm">
             <div className="inputsContainer">
                <h4 className="surveyTitleUser">{savedDetailsOfSurvey.title} - דוגמא </h4>
                <div className="firstNameInputContainer">
                  <h4 className="firstNameTitle">:שם פרטי</h4>
                  <input className="firstNameInput" ref={fName}></input>
                </div>
                <div className="lastNameInputContainer">
                  <h4 className="lastNameTitle">:שם משפחה</h4>
                  <input className="lastNameInput" ref={lName}></input>
                </div>
                <div className="IDInputContainer">
                  <div className="IdAndAsteriskDiv">
                  <i className="fa fa-asterisk"></i>
                  <h4 className="IDTitle">:תעודת זהות</h4>
                  </div>
                  <input className="IDInput" maxLength="9" ref={id} required></input>
                  <p className="messageForUser">{messageForUser}</p>
                </div>
                <div className="questionsContainer">
                  {
                  savedDetailsOfSurvey.questions.map((question) => (
                    (question.optionOfQuestion === "שאלה פתוחה") ? <OpenQuestion theTypeOfQuestion={question.theTypeOfQuestion} theQuestion={question.theWrittenQuestion} setUserAnswer={setUserAnswer}/> : 
                    (question.optionOfQuestion === "שאלת דירוג") ? <ScaleQuestion theTypeOfQuestion={question.theTypeOfQuestion} theQuestion={question.theWrittenQuestion}  setUserChoice={setUserChoice}/> :
                    null
                   ))
                  }
                </div>
                <button className="saveButton" >שלח תשובות</button>
            </div>
          </div>
        </div>
        <div className="footer">
                <div className="iconContainer">
                   <i className='fas fa-phone'></i>
                   <i className='fas fa-at'></i>
                   <i className="fa fa-facebook-square"></i>
                   <i className="fa fa-instagram"></i>
                </div>
            </div>
      </div>
    )
}

export default ExampleOfCreatedSurvey;