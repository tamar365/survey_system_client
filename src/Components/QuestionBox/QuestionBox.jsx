import "./QuestionBox.css";
import {useState} from "react";

function QuestionBox ({deleteQuestionFunc}) {
    
    const [optionOfQuestion,setOptionOfQuestion] = useState("")//the variable is an option to send kind of question to built SurveyForUser from DB
    console.log(optionOfQuestion)
    return (
        <div className="openQuestion">
            <label for="questionInput" className="writeHereTitle">:כתב/י כאן את השאלה</label>
            <input type="text" className="questionInput"></input>
            <div className="selectDiv">
            <select className="selectKindOfQuestion" onChange={(e) => setOptionOfQuestion(e.target.value)}>
              <option className="fillOfSelectBox" selected disabled hidden>בחר את סוג השאלה</option>
              <option className="scaleOption" value="שאלת דירוג">שאלת דירוג</option>
              <option className="openQuestionOption" value="שאלה פתוחה">שאלה פתוחה</option>
            </select>
            </div>
            <div className="questionButtonContainer">
            <button className="deleteQuestionButton" onClick={deleteQuestionFunc}><i class="fa fa-trash-o"></i></button>
            </div>
        </div>
    )
}

export default QuestionBox;