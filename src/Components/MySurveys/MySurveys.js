import "./MySurveys.css";
// import QuestionBox from "../QuestionBox/QuestionBox";
// import SurveyForUser from "../SurveyForUser/SurveyForUser";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";



function MySurveys() {
  
  const [idOfSurvey, setIdOfSurvey] = useState("");
  const [arrayOfDetailsOfSurveys, setArrayOfDetailsOfSurveys] = useState([]);
  const [detailsForMailPage, setDetailsOfMailPage] = useState({});
  const [theChosenSurvey,setTheChosenSurvey] = useState();
  const [theChosenAnswersOfSurvey, setTheChosenAnswersOfSurvey] = useState("");
  // let openQuestionOption;
  // let scaleQuestionOption;

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
      navigate("/Home");
  }

  function goToSendUrlOfSurveyPage(id) {
    console.log(id)
    setTheChosenSurvey(...arrayOfDetailsOfSurveys.filter((survey) => survey._id === id))
    console.log(theChosenSurvey)
  //   setDetailsOfMailPage(...theChosenSurvey,
  //     theChosenSurvey[openQuestionOption]=true,
  //     // theChosenSurvey.scaleQuestionOption=true
  // ) 
  //   console.log(detailsForMailPage) 
  }

  if (theChosenSurvey) {
    navigate("/SendUrlOfSurvey", {state:{theChosenSurvey:theChosenSurvey, openQuestionOption:true, scaleQuestionOption:true }});
  }
//maybe not need the 2 last key & value
  function goToAnswersPage(idSurvey) {
    console.log(idSurvey)
    navigate("/Answers", {state:{idSurvey:idSurvey}})
  }  

  useEffect (() => {
      fetch("http://localhost:8080/api/surveys", {
          method:"GET",
          headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
      })
      .then((res) => res.json())
      .then((data) => setArrayOfDetailsOfSurveys(data))
      
  
      
     
  },[])
   
  console.log(arrayOfDetailsOfSurveys)

  return(
    <div>

            <div className="header">
                <div className="siteName">מערכת משובים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
                
            </div>

      <div className="surveyContainer">
        <div className="surveycreationForm">
            <h3 className="createSurveyTitle">רשימת הסקרים שלי</h3>
            {/* <input className="surveyTitle" placeholder="כותרת-שם המשוב" ref={nameOfSurvey}></input> */}
           <div className="inputsContainer">
              {/* <div className="addQuestionContainer">
                <button className="addQuestionButton" onClick={addQuestionToContainer}><i className="fa fa-plus"></i></button>
                <h4 className="addQuestionTitle">רשימת הסקרים</h4>
              </div> */}
              <div className="questionsContainer">
                 {arrayOfDetailsOfSurveys.length ? arrayOfDetailsOfSurveys.map((boxOfSurvey) => (
                  <div className="surveyBox" key={boxOfSurvey._id}>
                      <div className="nameOfSurvey" >{boxOfSurvey.title}</div>
                      <div className="containerOfSorveyBoxButtons">
                          <button className="sendButton btnMySurvey" key={boxOfSurvey._id} value={boxOfSurvey._id} onClick={(e) => goToSendUrlOfSurveyPage(e.target.value)}>שלח סקר<i className="fa fa-envelope-o"></i></button>
                          <button className="editButton btnMySurvey">ערוך סקר<i className="fa fa-pencil"></i></button>
                          <button className="deleteButton btnMySurvey">מחק סקר<i className="fa fa-trash-o"></i></button>
                          <button className="answersButton btnMySurvey" key={boxOfSurvey._id} value={boxOfSurvey._id} onClick={(e) => goToAnswersPage(e.target.value)}>תשובות לסקר<i className="fa fa-group"></i></button>
                      </div>
                  </div>
                 )) : undefined}
              </div>
              
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

export default MySurveys;