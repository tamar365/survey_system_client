import "./Survey.css";
import QuestionBox from "../QuestionBox/QuestionBox";
import { useState, useRef } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import PopUpForSurvey from "../PopUpForSurvey/PopUpForSurvey";


function Survey() {
  
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [arrayOfCreatedQuestionsUI, setArrayOfCreatedQuestionsUI] = useState([]);
  const [arrayOfObjectOfQuestionsToDB, setArrayOfObjectOfQuestionsToDB] = useState([]);
  const [scaleQuestionOption, setScaleQuestionOption] = useState(false);
  const [openQuestionOption, setOpenQuestionOption] = useState(false);
  const [optionOfQuestion,setOptionOfQuestion] = useState("");
  const [theWrittenQuestion, setTheWrittenQuestion] = useState("");
  const [savedDetailsOfSurvey, setSavedDetailsOfSurvey] = useState({});
  const [idOfSurvey, setIdOfSurvey] = useState("");
  const [openPopUp,setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const nameOfSurvey = useRef("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
      navigate("/");
  }

  const addQuestionToContainer = () => {
    setNumberOfQuestion(numberOfQuestion+1)
    setArrayOfCreatedQuestionsUI([...arrayOfCreatedQuestionsUI,numberOfQuestion])
  }

  const saveOneQuestionFunc = () => {
    setArrayOfObjectOfQuestionsToDB ([ ...arrayOfObjectOfQuestionsToDB,{
      theWrittenQuestion:theWrittenQuestion,
      optionOfQuestion:optionOfQuestion,
      numberOfQuestion:numberOfQuestion
    }])
  }

  const saveTheQuestions = async () => {
    
    try{
      const response = await fetch("https://survey-services.herokuapp.com/api/surveys/newsurvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ 
            title: nameOfSurvey.current.value,
            questions: arrayOfObjectOfQuestionsToDB 
        }),
      });
      const status = response.status;
      const data = await(response.json()); 
      console.log(data)
      if (status === 200) { 
          setSavedDetailsOfSurvey(data);
          setIdOfSurvey(data._id);
          data.questions.filter(item => item.optionOfQuestion === "שאלה פתוחה" ? setOpenQuestionOption(true) : item.optionOfQuestion === "שאלת דירוג" ? setScaleQuestionOption(true) : null)
      }else{
        setMessage(data.message)
        setOpenPopUp(true)
      }   
    } catch (e) {
      console.log(e);
    }
  }
  
  if (idOfSurvey && savedDetailsOfSurvey) {
    navigate(`/ExampleOfCreatedSurvey/${idOfSurvey}`, {state:{
      savedDetailsOfSurvey:savedDetailsOfSurvey,
      scaleQuestionOption:scaleQuestionOption,
      openQuestionOption:openQuestionOption
    }})
  }
  
  return(
    <div>
            <div className="header">
                <div className="siteName">מערכת סקרים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
            </div>
      <div className="surveyContainer">
        <div className="surveycreationForm">
            <h3 className="createSurveyTitle">יצירת סקר</h3>
            <input className="surveyTitle" placeholder="כותרת-שם הסקר" ref={nameOfSurvey}></input>
           <div className="inputsContainer">
              <div className="addQuestionContainer">
                <button className="addQuestionButton" onClick={addQuestionToContainer}><i className="fa fa-plus"></i></button>
                <h4 className="addQuestionTitle">צור שאלה</h4>
              </div>
              <div className="questionsContainer">
                 {arrayOfCreatedQuestionsUI.length ? arrayOfCreatedQuestionsUI.map((question) => (
                  <QuestionBox id={question.numberOfQuestion} setOptionOfQuestion={setOptionOfQuestion} 
                  setTheWrittenQuestion={setTheWrittenQuestion} saveOneQuestionFunc={saveOneQuestionFunc}
                  />
                 )) : undefined}
              </div>
              <button className="saveButton" onClick={saveTheQuestions}>שמור סקר</button>
          </div>
        </div>
        {openPopUp && <PopUpForSurvey message={message} setOpenPopUp={setOpenPopUp}/>}
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

export default Survey;