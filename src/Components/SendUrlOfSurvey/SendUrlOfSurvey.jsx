import "./SendUrlOfSurvey.css";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import * as emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import React,{useState} from "react";
import PopUp from "../PopUp/PopUp";


function SendUrlOfSurvey ({setAccessToUserSurveyPage, setFullURL}) {
  
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);
  const location = useLocation();
  const idOfSurvey = location.state.theChosenSurvey._id;
  const detailsOfSurvey = location.state.theChosenSurvey;
  const [openPopup, setOpenPopup] = useState(false);
  const message = "המייל נשלח בהצלחה"

 
  function goBackToHomePage() {
    navigate("/");
  }

  // function goToSurveyForUserPage() {
  //   console.log(url)
  //   setAccessToUserSurveyPage(true)
  //   navigate("/SurveyForUser/:idOfSurvey", {serach: params, replace: true})
  //   // navigate(url)
  // }
  
  const data=JSON.stringify(detailsOfSurvey);
  const params = new URLSearchParams(data);
  const url = new URL(`https://survey-services.netlify.app/surveyforuser/${idOfSurvey}`)
  url.search = params;
  
  const sendEmail = (e) => {
    e.preventDefault();
    const formValue = Object.fromEntries(new FormData(e.target));
    formValue.my_html = `<a href="${url}" target="_blank" rel="noopener" data-mce-href="${url}" data-mce-selected="inline-boundary">עבור לסקר</a>`
    emailjs.send('service_9r6nz3w', 'template_iywedyq', formValue,'LCss0q5vqj-VYk3f9')
    .then((result) => {
          console.log(result.text);
          setOpenPopup(true)
    }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  return(
    <div>
           <div className="header">
                <div className="siteName">מערכת סקרים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
            </div>    
      <div className="answersContainer">
        <div className="answersCreationForm">
            <div className="answersTitleContainer">
            <h3 className="answersTitle">שליחת סקר</h3>
            </div>
           <div className="inputsContainer">
              <div className="answersFromUserContainer">
                  <form onSubmit={
                    sendEmail
                  }>
                  <div>
                      <input className="tomailInput emailInput" type="email" placeholder="לשלוח אל כתובת המייל" name="toEmail"/> 
                    </div>
                    <div>
                      <input className="nameEmailInput emailInput" type="text" placeholder="שם" name="name"/> 
                    </div>
                    <div>
                      <input className="subjectEmailInput emailInput" type="text" placeholder="נושא" name="subject"/> 
                    </div>
                    <div>
                      <textarea className="messageEmailInput emailInput" type="text" cols="30" rows="8" placeholder="ההודעה שלך" name="message" direction="rtl" > 
                      </textarea>
                    </div>
                    {/* <div>
                    <a className="anchor"  name="link" href={url} direction="rtl" >לחץ בכדי לעבור לסקר</a>
                    </div> */}
                    {/* <div>
                      <input type ="button" className="dinamicUrl" name="my_html" value={url} />
                    </div> */}
                    <div>
                      <input type="submit" value="שלח"></input>
                    </div>
                  </form>  
              </div>   
          </div>
        </div>
        {openPopup && <PopUp message={message}/>}
      </div>
        <div className="footer">
          <div className="iconContainer">
            <i className='fas fa-phone'></i>
            <i className='fas fa-at'></i>
            <i className="fa fa-facebook-square"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div> 
    </div>
  )
}

export default SendUrlOfSurvey;