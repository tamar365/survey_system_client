import "./SurveyForUser.css";
import PopUp from "../PopUp/PopUp";
import OpenQuestion from "../OpenQuestion/OpenQuestion";
import ScaleQuestion from "../ScaleQuestion/ScaleQuestion";
import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import React from "react";


function SurveyForUser() {
    
    const fName =useRef("");
    const lName =useRef("");
    const id =useRef("");
    
    const [messageForUser, setMessageForUser] = useState("");
    const [userChoice, setUserChoice] = useState("");
    const [userAnswer, setUserAnswer] = useState("")
    const [popUp, setPopUp] = useState(false);
    
    const location = useLocation();
    console.log("🚀 ~ file: SurveyForUser.jsx ~ line 23 ~ SurveyForUser ~ location", location)
    
    const data = location.search
    
    const {idOfSurvey} = useParams();
    const data1 = data.replace(/\+/g, ' ')
    let decodedSearch = decodeURIComponent(data1)
  
    decodedSearch = decodedSearch.substring(1);
    decodedSearch = decodedSearch.slice(0, -1);
    
    const detailsOfSurvey = JSON.parse(decodedSearch);
    console.log("🚀 ~ file: SurveyForUser.jsx ~ line 39 ~ SurveyForUser ~ detailsOfSurvey", detailsOfSurvey)
    
    
    const questionsDecoded = detailsOfSurvey.questions;
    console.log("🚀 ~ file: SurveyForUser.jsx ~ line 39 ~ SurveyForUser ~ questionsDecoded", questionsDecoded)

    const sendSurveyByClient = async () => {
      setMessageForUser("");
      if(id.current.value) {
        try{
          const response = await fetch("http://localhost:8080/api/answers/newanswers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ 
                  firstName:fName.current.value,
                  lastName:lName.current.value,
                  id:id.current.value,
                  scaleAnswer:userChoice,
                  openAnswer:userAnswer,
                  idOfSurvey: idOfSurvey
          
            }),
          })
          const data = await (response.json());
          console.log(data) 
          if (response.status === 200) {
            alert("סקר נשלח בהצלחה. תודה על שיתוף הפעולה")
          }         
            // setPopUp(true)
            // setTimeout(() => window.close(),5000)
        } catch (e) {
          console.log(e);
        }
      } else{
        setMessageForUser("שדה חובה");
      }
      
  }

    return (
        <div className="surveyForUser_allThePage">
  
        <div className="surveyContainer">
          <div className="surveyUserForm">
            
             <div className="inputsContainer">
                <h4 className="surveyTitleUser">{detailsOfSurvey.title}</h4>
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
                  questionsDecoded.map((question) => (
                    (question.optionOfQuestion === "שאלה פתוחה") ? <OpenQuestion theTypeOfQuestion={question.optionOfQuestion} theQuestion={question.theWrittenQuestion} setUserAnswer={setUserAnswer}/> : 
                    (question.optionOfQuestion === "שאלת דירוג") ? <ScaleQuestion theTypeOfQuestion={question.optionOfQuestion} theQuestion={question.theWrittenQuestion}  setUserChoice={setUserChoice}/> :
                    null
                   ))
                  }
                
                </div>
                <button className="saveButton" onClick={sendSurveyByClient}>שלח תשובות</button>
                {popUp && <PopUp/>}
            </div>
          </div>
        </div>
      </div>
    )
}

export default SurveyForUser;