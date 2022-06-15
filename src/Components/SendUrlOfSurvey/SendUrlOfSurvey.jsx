import "./SendUrlOfSurvey.css";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import * as emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import React,{useState} from "react";
// import {BitlyClient} from "bitly";
import PopUp from "../PopUp/PopUp";


function SendUrlOfSurvey ({setAccessToUserSurveyPage}) {
  // const newUrl = "https://bit.ly/39o5QJq";
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);
  const location = useLocation();
  const idOfSurvey = location.state.theChosenSurvey._id;
  const detailsOfSurvey = location.state.theChosenSurvey;
  const [openPopup, setOpenPopup] = useState(false);
  const message = "המייל נשלח בהצלחה"
  // const bytly = new BitlyClient("0d66211ad66f7e7782358b66faeeda428a384b2a", {});
  //   const [shortURL, setShortURL] = useState("");
    
    
    // const getShortUrl = async (longUrl) => {
    //     let result;
    //     try{
    //         result = await bytly.shorten(longUrl);
    //     }catch (e){
    //         console.log(e);
    //     }

    //     if (result?.url) {
    //         setShortURL(result?.url);
    //     }
    // }

  function goBackToHomePage() {
    navigate("/");
  }

  function goToSurveyForUserPage() {
    
    console.log(url)
    setAccessToUserSurveyPage(true)
    navigate("/SurveyForUser/:idOfSurvey", {serach: params, replace: true})
    // navigate(url)
  }
  
  const data=JSON.stringify(detailsOfSurvey);
  const params = new URLSearchParams(data);
  const url = new URL(`https://survey-services.netlify.app/surveyforuser/${idOfSurvey}`)
  url.search = params;
  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_9r6nz3w', 'template_iywedyq', e.target,'LCss0q5vqj-VYk3f9')
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
                  <button className="logout" >חזור לדף הבית</button>
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
                  <form onSubmit={sendEmail}>
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
                      <textarea className="messageEmailInput emailInput" cols="30" rows="8" placeholder="ההודעה שלך" name="message"
                       direction="rtl" onClick={goToSurveyForUserPage}>url</textarea>
                    </div>
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