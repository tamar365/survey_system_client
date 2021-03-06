import "./QuestionBox.css";
import React from "react";

function QuestionBox ({deleteQuestionFunc, setOptionOfQuestion, setTheWrittenQuestion, saveOneQuestionFunc, id}) {
    
    return (
        <div className="openQuestion">
            <label htmlFor="questionInput" className="writeHereTitle">כתב/י כאן את השאלה:</label>
            <input type="text" className="questionInput" onChange={(e) => setTheWrittenQuestion(e.target.value)}></input>
            <div className="selectDiv">
            <select className="selectKindOfQuestion" onChange={(e) => setOptionOfQuestion(e.target.value)}>
              <option className="fillOfSelectBox" selected disabled hidden>בחר את סוג השאלה</option>
              <option className="scaleOption" value="שאלת דירוג">שאלת דירוג</option>
              <option className="openQuestionOption" value="שאלה פתוחה">שאלה פתוחה</option>
            </select>
            </div>
            <div className="questionButtonContainer">
            <button className="deleteQuestionButton" onClick={deleteQuestionFunc}>מחק <i className="fa fa-trash-o"></i></button>
            <button className="saveOneQuestionButton" onClick={saveOneQuestionFunc}>שמור <i className="fa fa-thumb-tack"></i></button>
            </div>
        </div>
    )
}

export default QuestionBox;