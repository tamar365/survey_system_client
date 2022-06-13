import "./ScaleQuestion.css";
import React from "react";

function ScaleQuestion ({setUserChoice, theQuestion}) {
    
    return (
     <div className="scaleQuestion">
        <label htmlFor="questionScale" className="writeHereTitle" >{theQuestion}</label>
        <div className="questionScale">
         <input type="radio" className="rating-5" name="rating" value="5" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-5">מצויין</label>
         <input type="radio" className="rating-4" name="rating" value="4" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-4">מרוצה מאוד</label>
         <input type="radio" className="rating-3" name="rating" value="3" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-3">מרוצה</label>
         <input type="radio" className="rating-2" name="rating" value="2" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-2">לא מרוצה</label>
         <input type="radio" className="rating-1" name="rating" value="1" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-1">לא מרוצה בכלל</label>
        </div>
     </div>
    )
}

export default ScaleQuestion;