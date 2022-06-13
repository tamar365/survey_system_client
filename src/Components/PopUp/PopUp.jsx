import "./PopUp.css";
import React from "react";
import {useNavigate} from "react-router-dom";

function PopUp({message}) {

    const navigate = useNavigate();

    function closePopup () {
        navigate("/") 
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

export default PopUp;