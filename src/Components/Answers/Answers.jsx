import "./Answers.css";
import AnswersFromSurvey from "../AnswersFromSurvey/AnswersFromSurvey";
import {useState, useEffect} from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";



function Answers() {
  const [arrayOfObjectsOfAnswers, setArrayOfObjectsOfAnswers] = useState([]);
  
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
    navigate("/Home");
  }
 
  useEffect(() => {
      fetch("http://localhost:8080/api/answers", {
          method: "GET",
          headers: {
              "Content-Type":"application/json",
          },
      })
      .then((res) => res.json())
      .then((data) => setArrayOfObjectsOfAnswers(
          data.map((answersFromUser) => ({
            firstName:answersFromUser.firstName,
            lastName:answersFromUser.lastName,
            id:answersFromUser.id,
            scaleAnswer:answersFromUser.scaleAnswer,
            openAnswer:answersFromUser.openAnswer
          })) 
      ))
  },[]);
  
  return(
    <div>

    <div className="header">
                <div className="siteName">מערכת משובים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>      
            </div>

      <div className="answersContainer">
        <div className="answersCreationForm">
            <div className="answersTitleContainer">
            <h3 className="answersTitle">תשובות המשוב</h3>
            </div>
           <div className="inputsContainer">
              <div className="answersFromUserContainer">
                 {arrayOfObjectsOfAnswers.length ? arrayOfObjectsOfAnswers.map((item) => 
                 ( <AnswersFromSurvey 
                   firstName={item.firstName}
                   lastName={item.lastName}
                   id={item.id}
                   scaleAnswer={item.scaleAnswer}
                   openAnswer={item.openAnswer}
                />
                 )) : null}
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

export default Answers;