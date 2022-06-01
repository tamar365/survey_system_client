import "./SendUrlOfSurvey.css";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import emailjs from '@emailjs/browser';
import * as emailjs from "emailjs-com";



function SendUrlOfSurvey () {

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decoded = jwt(accessToken);

  function goBackToHomePage() {
    navigate("/Home");
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_9r6nz3w', 'template_iywedyq', e.target, 'LCss0q5vqj-VYk3f9')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

 
  return(
    <div>

           <div className="header">
                <div className="siteName">מערכת משובים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={goBackToHomePage}>חזור לדף הבית</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>
            </div>    
            

      <div className="answersContainer">
        <div className="answersCreationForm">
            <div className="answersTitleContainer">
            <h3 className="answersTitle">שליחת משוב</h3>
            </div>
           <div className="inputsContainer">
              <div className="answersFromUserContainer">
                  <form onSubmit={sendEmail}>
                    <div>
                      <input className="nameEmailInput emailInput" type="text" placeholder="שם" name="name"/> 
                    </div>
                    <div>
                      <input className="mailInput emailInput" type="email" placeholder="מייל" name="email"/> 
                    </div>
                    <div>
                      <input className="subjectEmailInput emailInput" type="text" placeholder="נושא" name="subject"/> 
                    </div>
                    <div>
                      <textarea className="messageEmailInput emailInput" cols="30" rows="8" placeholder="ההודעה שלך" name="message" direction="rtl"></textarea>
                    </div>
                    <div>
                      <input type="submit" value="שלח"></input>
                    </div>
                  </form>  
              </div>   
          </div>
        </div>
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