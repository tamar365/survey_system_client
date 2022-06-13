import "./AnswersFromSurvey.css";
import React from "react";

function AnswersFromSurvey ({firstName, lastName, id, scaleAnswer, openAnswer}) {
    return (
        <div className="answerFromSurvey">
            <span className="fontAnswers" direction="rtl"> שם פרטי : {firstName}</span>
            <span className="fontAnswers" direction="rtl"> שם משפחה : {lastName}</span>
            <span className="fontAnswers" direction="rtl">{id} : ת.ז</span>
            <span className="fontAnswers" direction="rtl">{scaleAnswer} : שאלת דירוג</span>
            <span className="fontAnswers" direction="rtl"> שאלה פתוחה : {openAnswer}</span>
        </div>
    )
}

export default AnswersFromSurvey;