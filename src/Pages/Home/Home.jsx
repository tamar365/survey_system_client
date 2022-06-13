import "./Home.css";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";


function App() {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwt(accessToken);

    function logout() {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    function goToCreateSurveyPage() {
        navigate("/Survey");
    }
    
    function goToMySurveys() {
        navigate("/MySurveys");
    }

    return (
        <div className="home">
            <div className="header">
                <div className="siteName">מערכת סקרים דיגיטלית</div>
                <div className="hi_logout_container">
                  <button className="logout" onClick={logout}>התנתק</button>
                  <div className="HiTitle">{decoded.username}  שלום</div>
                </div>                
            </div>
            <div className="body">
                <div className="bodyleft">
                    <h3 className="optionTitle">...אני מעוניין</h3>
                    <div className="optionsButtonContainer">
                    <button className="createButton button" onClick={goToCreateSurveyPage}>ליצור סקר</button>
                    <button className="mySurveysButton button" onClick={goToMySurveys}>הסקרים שלי</button>
                    </div>
                </div>
                <div className="bodyright">
                    <h3>ברוכים הבאים</h3>
                    <h3>לאתר הסקרים הדיגיטלי</h3>
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

export default App;