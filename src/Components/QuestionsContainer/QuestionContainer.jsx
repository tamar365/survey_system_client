import "./QuestionsContainer.css";
import ScaleQuestion from "../ScaleQuestion/ScaleQuestions";
import OpenQuestion from "../OpenQuestion/OpenQuestion";


function QuestionsContainer ({newQuestion}) {
     
    return (
        <div className="questionsContainer">
        {(newQuestion === "שאלת דירוג") ? <ScaleQuestion/> : (newQuestion === "שאלה פתוחה") ? <OpenQuestion/> : null}
        </div>
    )
}

export default QuestionsContainer;