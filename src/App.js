import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Survey from "./Components/Survey/Survey";
import SurveyForUser from "./Components/SurveyForUser/SurveyForUser";
import Answers from "./Components/Answers/Answers";
import SendUrlOfSurvey from "./Components/SendUrlOfSurvey/SendUrlOfSurvey";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExampleOfCreatedSurvey from "./Components/ExampleOfCreatedSurvey/ExampleOfCreatedSurvey";
import MySurveys from "./Components/MySurveys/MySurveys";
import React from "react";



function App() {

  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/Home" element={<Home/>} />
          <Route exact path="/Survey" element={<Survey/>} />
          <Route exact path="/MySurveys" element={<MySurveys/>} />
          <Route exact path="/ExampleOfCreatedSurvey/:idOfSurvey" element={<ExampleOfCreatedSurvey/>} />
          <Route exact path="/SurveyForUser/:idOfSurvey" element={<SurveyForUser/>} />
          <Route exact path="/Answers" element={<Answers/>} />
          <Route exact path="/SendUrlOfSurvey" element={<SendUrlOfSurvey/>} />
        </Routes>
      </Router>
  );
  
}

export default App;