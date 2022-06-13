import "./PopUpForSurveyUser.css";
import React from "react";


function PopUp({message}) {

    return (
       <div className="backdrop">
           <div className="popup"> 
               <p className="textOfPopUp">{message}</p>
           </div>
       </div>
    );
}

export default PopUp;