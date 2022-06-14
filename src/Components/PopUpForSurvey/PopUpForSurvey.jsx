import "./PopUpForSurvey.css";
import React from "react";

function PopUpForSurvey({message, setOpenPopUp}) {

    function closePopup () {
        setOpenPopUp(false)
    }
    
    return (
       <div className="backdrop">
           <div className="popup"> 
               <p className="textOfPopUp">{message}</p>
               <button className="popupButton" onClick={closePopup}>אישור</button>
           </div>
       </div>
    );
}

export default PopUpForSurvey;