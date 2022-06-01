import "./QuestionsContainer.css";
import ScaleQuestion from "../ScaleQuestion/ScaleQuestions";
import OpenQuestion from "../OpenQuestion/OpenQuestion";


function QuestionsContainer ({newQuestion}) {
    //when user click save the question got into the array of the survey. delete will disapear the component of this question
     
    return (
        <div className="questionsContainer">
        {(newQuestion === "שאלת דירוג") ? <ScaleQuestion/> : (newQuestion === "שאלה פתוחה") ? <OpenQuestion/> : null}
        </div>
    )
}

export default QuestionsContainer;