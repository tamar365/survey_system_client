import "./SurveyForUser.css";
import PopUp from "../PopUp/PopUp";
import {useRef, useState} from "react";


function SurveyForUser() {
    const fName =useRef("");
    const lName =useRef("");
    const id =useRef("");
    const open_answer=useRef("");
    const [messageForUser, setMessageForUser] = useState("");
    const [userChoice, setUserChoice] = useState("");
    const [popUp, setPopUp] = useState(false);
      
    const sendSurveyByClient = () => {
      setMessageForUser("");
      if(id.current.value) {
        try{
          fetch("http://localhost:8080/api/answers/newanswers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ 
                  firstName:fName.current.value,
                  lastName:lName.current.value,
                  id:id.current.value,
                  scaleAnswer:userChoice,
                  openAnswer:open_answer.current.value
            }),
          })
            .then((res) => console.log(res.status))
            .then((res) => res.json())
            .then((data) => console.log(data))
            
            setPopUp(true)
            setTimeout(() => window.close(),5000)
        } catch (e) {
          console.log(e);
        }
      } else{
        setMessageForUser("שדה חובה");
      }
      
  }

    return (
        <div>
  
        <div className="surveyContainer">
          <div className="surveyUserForm">
            
             <div className="inputsContainer">
                <h4 className="surveyTitleUser">סקר שביעות רצון-מחלקת שירות לקוחות פלאפון</h4>
                <div className="firstNameInputContainer">
                  <h4 className="firstNameTitle">:שם פרטי</h4>
                  <input className="firstNameInput" ref={fName}></input>
                </div>
                <div className="lastNameInputContainer">
                  <h4 className="lastNameTitle">:שם משפחה</h4>
                  <input className="lastNameInput" ref={lName}></input>
                </div>
                <div className="IDInputContainer">
                  <div className="IdAndAsteriskDiv">
                  <i className="fa fa-asterisk"></i>
                  <h4 className="IDTitle">:תעודת זהות</h4>
                  </div>
                  <input className="IDInput" maxLength="9" ref={id} required></input>
                  <p className="messageForUser">{messageForUser}</p>
                </div>
             
                <div className="questionsContainer">
                <div className="openQuestion">
                  <label htmlFor="questionScale" className="writeHereTitle">?איך היה השירות שקיבלת</label>
                  <div className="questionScale">
                  <input type="radio" className="rating-5" name="rating" value="5" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-5">מצויין</label>
                  <input type="radio" className="rating-4" name="rating" value="4" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-4">מרוצה מאוד</label>
                  <input type="radio" className="rating-3" name="rating" value="3" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-3">מרוצה</label>
                  <input type="radio" className="rating-2" name="rating" value="2" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-2">לא מרוצה</label>
                  <input type="radio" className="rating-1" name="rating" value="1" onChange={(e) => (setUserChoice(e.target.value))}/><label htmlFor="rating-1">לא מרוצה בכלל</label>
                  </div>
               </div>
                  
                <div className="openQuestion">
                  <label htmlFor="questionInput" className="writeHereTitle">?מה ניתן לשפר לפעם הבאה</label>
                  <textarea type="text" className="questionInput" ref={open_answer} rows="5" cols="30" maxLength="250"></textarea>
               </div>
                </div>
                <button className="saveButton" onClick={sendSurveyByClient}>שלח תשובות</button>
                {popUp && <PopUp/>}
            </div>
          </div>
        </div>
      </div>
    )
}

export default SurveyForUser;