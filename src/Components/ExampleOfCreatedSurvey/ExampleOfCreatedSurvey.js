import "./ExampleOfCreatedSurvey.css";
import PopUp from "../PopUp/PopUp";
import OpenQuestion from "../OpenQuestion/OpenQuestion";
import ScaleQuestion from "../ScaleQuestion/ScaleQuestion";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";


function ExampleOfCreatedSurvey() {
    
    const fName =useRef("");
    const lName =useRef("");
    const id =useRef("");
    
    const [messageForUser, setMessageForUser] = useState("");
    const [userChoice, setUserChoice] = useState("");
    const [userAnswer, setUserAnswer] = useState("")
    const [popUp, setPopUp] = useState(false);
    const location = useLocation();
    
    console.log("🚀 ~ file: SurveyForUser.jsx ~ line 23 ~ SurveyForUser ~ location", location)

    const savedDetailsOfSurvey = location.state.savedDetailsOfSurvey;
    // const location.state.savedDetailsOfSurvey._id = parameters;
     
    // const {props.location.state.savedDetailsOfSurvey._id} = parameters;
    // const scaleQuestionOption = props.location.state.scaleQuestionOption;
    // const openQuestionOption = props.location.state.openQuestionOption;
      
    // const sendSurveyByClient = async () => {
    //   setMessageForUser("");
    //   if(id.current.value) {
    //     try{
    //       const response = await fetch("http://localhost:8080/api/answers/newanswers", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: `bearer ${localStorage.getItem("accessToken")}`,
    //         },
    //         body: JSON.stringify({ 
    //               firstName:fName.current.value,
    //               lastName:lName.current.value,
    //               id:id.current.value,
    //               scaleAnswer:userChoice,
    //               openAnswer:userAnswer
    //         }),
    //       })
    //       const data = await (response.json());
    //       console.log(data)
           
            
            
    //         // setPopUp(true)
    //         // setTimeout(() => window.close(),5000)
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   } else{
    //     setMessageForUser("שדה חובה");
    //   }
      
  // }

    return (
        <div className="surveyForUser_allThePage">
  
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
                {popUp && <PopUp/>}
            </div>
          </div>
        </div>
      </div>
    )
}

export default ExampleOfCreatedSurvey;