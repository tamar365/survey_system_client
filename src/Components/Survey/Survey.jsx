import "./Survey.css";
import QuestionBox from "../QuestionBox/QuestionBox";
// import SurveyForUser from "../SurveyForUser/SurveyForUser";
import { useState, useRef } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";



function Survey() {
  
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [arrayOfCreatedQuestionsUI, setArrayOfCreatedQuestionsUI] = useState([]);
  // const arrayOfObjectOfQuestionsToDB = [];
  const [arrayOfObjectOfQuestionsToDB, setArrayOfObjectOfQuestionsToDB] = useState([]);
  const [scaleQuestionOption, setScaleQuestionOption] = useState(false);
  const [openQuestionOption, setOpenQuestionOption] = useState(false);
  const [optionOfQuestion,setOptionOfQuestion] = useState("");
  const [theWrittenQuestion, setTheWrittenQuestion] = useState("");
  // const [showTheSurveyForUser, setShowTheSurveyForUser] = useState(false);
  const [savedDetailsOfSurvey, setSavedDetailsOfSurvey] = useState({});
  const [idOfSurvey, setIdOfSurvey] = useState("");
  const nameOfSurvey = useRef("");
  
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
      navigate("/Home");
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
    console.log(arrayOfObjectOfQuestionsToDB)
    try{
      const response = await fetch("http://localhost:8080/api/surveys/newsurvey", {
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
      
        if (status === 200) {
          console.log(data);
          
          setSavedDetailsOfSurvey(data);
          setIdOfSurvey(data._id);
          
          data.questions.filter(item => item.optionOfQuestion === "שאלה פתוחה" ? setOpenQuestionOption(true) : item.optionOfQuestion === "שאלת דירוג" ? setScaleQuestionOption(true) : null)
          // setShowTheSurveyForUser(true);
          
         
       
        }    

        
        // setPopUp(true)
        // setTimeout(() => window.close(),5000)
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
                <div className="siteName">מערכת משובים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
                
            </div>

      <div className="surveyContainer">
        <div className="surveycreationForm">
            <h3 className="createSurveyTitle">יצירת משוב</h3>
            <input className="surveyTitle" placeholder="כותרת-שם המשוב" ref={nameOfSurvey}></input>
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
              <button className="saveButton" onClick={saveTheQuestions}>שמור משוב</button>
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

export default Survey;