import "./OpenQuestion.css";
import React from "react";


function OpenQuestion ({ theQuestion, setUserAnswer}) {
    
    return (
        <div className="openQuestion">
        <label htmlFor="questionInput" className="writeHereTitle">{theQuestion}</label>
        <textarea type="text" className="questionInput" onChange={(e) => setUserAnswer(e.target.value)} rows="5" cols="30" maxLength="250"></textarea>
        </div>
    )

}

export default OpenQuestion;