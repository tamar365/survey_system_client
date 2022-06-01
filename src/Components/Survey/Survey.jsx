import "./Survey.css";
import QuestionBox from "../QuestionBox/QuestionBox";
import {useState} from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";



function Survey() {
  
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const [arrayOfCreatedQuestions, setArrayOfCreatedQuestions] = useState([])
  
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
      
      navigate("/Home");
  }

  const addQuestionToContainer = () => {
    setNumberOfQuestion(numberOfQuestion+1)
    setArrayOfCreatedQuestions([...arrayOfCreatedQuestions,numberOfQuestion])
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
            <input className="surveyTitle" placeholder="כותרת-שם המשוב"></input>
           <div className="inputsContainer">
              {/* <div className="firstNameInputContainer">
                <h4 className="firstNameTitle">:שם פרטי</h4>
                <input className="firstNameInput"></input>
              </div>
              <div className="lastNameInputContainer">
                <h4 className="lastNameTitle">:שם משפחה</h4>
                <input className="lastNameInput"></input>
              </div> */}
              <div className="addQuestionContainer">
                <button className="addQuestionButton" onClick={addQuestionToContainer}><i className="fas fa-pencil-alt"></i></button>
                <h4 className="addQuestionTitle">צור שאלה</h4>
              </div>
              <div className="questionsContainer">
                 {arrayOfCreatedQuestions.length ? arrayOfCreatedQuestions.map((question) => (
                  <QuestionBox id={question}/>
                 ))  : null}
              </div>
              <button className="saveButton" onClick={goBackToHomePage}>שמור משוב</button>
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