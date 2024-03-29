import "./Answers.css";
import AnswersFromSurvey from "../AnswersFromSurvey/AnswersFromSurvey";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

function Answers() {
  const [arrayOfObjectsOfAnswers, setArrayOfObjectsOfAnswers] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);
  const location = useLocation();
  const idOfSurvey = location.state.idSurvey;

  function goBackToHomePage() {
    navigate("/");
  }

  useEffect(() => {
    fetch(
      `https://survey-backend-wnwj.onrender.com/api/answers/${idOfSurvey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        setArrayOfObjectsOfAnswers(
          data.map((answersFromUser) => ({
            firstName: answersFromUser.firstName,
            lastName: answersFromUser.lastName,
            id: answersFromUser.id,
            scaleAnswer: answersFromUser.scaleAnswer,
            openAnswer: answersFromUser.openAnswer,
          }))
        )
      );
  }, [idOfSurvey]);

  return (
    <div>
      <div className="header">
        <div className="siteName">מערכת סקרים דיגיטלית</div>
        <div className="hi_logout_container">
          <button className="logout" onClick={goBackToHomePage}>
            חזור לדף הבית
          </button>
          <div className="HiTitle">{decoded.username} שלום</div>
        </div>
      </div>
      <div className="answersContainer">
        <div className="answersCreationForm">
          <div className="answersTitleContainer">
            <h3 className="answersTitle">תשובות המשוב</h3>
          </div>
          <div className="inputsContainer">
            <div className="answersFromUserContainer">
              {arrayOfObjectsOfAnswers.length
                ? arrayOfObjectsOfAnswers.map((item) => (
                    <AnswersFromSurvey
                      key={item.id}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      id={item.id}
                      scaleAnswer={item.scaleAnswer}
                      openAnswer={item.openAnswer}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="iconContainer">
          <i className="fas fa-phone"></i>
          <i className="fas fa-at"></i>
          <i className="fa fa-facebook-square"></i>
          <i className="fa fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}

export default Answers;
