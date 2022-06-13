import "./PopUp.css";
import React from "react";

function popUp() {

    return (
       <div className="backdrop">
           <div className="popup"> 
               <p className="textOfPopUp">תודה שהקדשת מזמנך למילוי המשוב</p>
           </div>
       </div>
    );
}

export default popUp;