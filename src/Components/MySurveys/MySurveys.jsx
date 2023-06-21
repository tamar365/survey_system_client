import "./MySurveys.css";
import { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";

function MySurveys() {
  const [idOfSurveyForAnswers, setIdOfSurveyForAnsweres] = useState("");
  const [arrayOfDetailsOfSurveys, setArrayOfDetailsOfSurveys] = useState([]);
  const [theChosenSurvey, setTheChosenSurvey] = useState();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
    navigate("/");
  }

  function goToSendUrlOfSurveyPage(id) {
    setTheChosenSurvey(
      ...arrayOfDetailsOfSurveys.filter((survey) => survey._id === id)
    );
  }

  useEffect(() => {
    if (theChosenSurvey) {
      navigate("/SendUrlOfSurvey", {
        state: { theChosenSurvey: theChosenSurvey },
      });
    }
  }, [theChosenSurvey, navigate]);

  function goToAnswersPage(idSurvey) {
    setIdOfSurveyForAnsweres(idSurvey);
  }

  useEffect(() => {
    if (idOfSurveyForAnswers) {
      navigate("/Answers", { state: { idSurvey: idOfSurveyForAnswers } });
    }
  }, [idOfSurveyForAnswers, navigate]);

  useEffect(() => {
    fetch("https://survey-backend.netlify.app/api/surveys", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setArrayOfDetailsOfSurveys(data));
  }, []);

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
      <div className="surveyContainer">
        <div className="surveycreationForm">
          <h3 className="createSurveyTitle">רשימת הסקרים שלי</h3>
          <div className="inputsContainer">
            <div className="questionsContainer">
              {arrayOfDetailsOfSurveys.length
                ? arrayOfDetailsOfSurveys.map((boxOfSurvey) => (
                    <div className="surveyBox" key={boxOfSurvey._id}>
                      <div className="nameOfSurvey">{boxOfSurvey.title}</div>
                      <div className="containerOfSorveyBoxButtons">
                        <button
                          className="sendButton btnMySurvey"
                          id={boxOfSurvey._id}
                          value={boxOfSurvey._id}
                          onClick={(e) =>
                            goToSendUrlOfSurveyPage(e.target.value)
                          }
                        >
                          שלח סקר<i className="fa fa-envelope-o"></i>
                        </button>
                        <button className="editButton btnMySurvey">
                          ערוך סקר<i className="fa fa-pencil"></i>
                        </button>
                        <button className="deleteButton btnMySurvey">
                          מחק סקר<i className="fa fa-trash-o"></i>
                        </button>
                        <button
                          className="answersButton btnMySurvey"
                          id={boxOfSurvey._id}
                          value={boxOfSurvey._id}
                          onClick={(e) => goToAnswersPage(e.target.value)}
                        >
                          תשובות לסקר<i className="fa fa-group"></i>
                        </button>
                      </div>
                    </div>
                  ))
                : undefined}
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

export default MySurveys;
