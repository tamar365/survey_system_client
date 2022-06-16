import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Survey from "./Components/Survey/Survey";
import SurveyForUser from "./Components/SurveyForUser/SurveyForUser";
import Answers from "./Components/Answers/Answers";
import SendUrlOfSurvey from "./Components/SendUrlOfSurvey/SendUrlOfSurvey";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import ExampleOfCreatedSurvey from "./Components/ExampleOfCreatedSurvey/ExampleOfCreatedSurvey";
import MySurveys from "./Components/MySurveys/MySurveys";
import {useEffect, useState} from "react";


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("accessToken")) || false);

  const setAuth = (value) => {
    setIsAuthenticated(value);
    alert(value);
  }

  useEffect(() => {
    localStorage.setItem("accessToken", JSON.stringify(isAuthenticated));
  },[isAuthenticated])
 
  return (
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route exact path="/login" element={<Login setAuth={setAuth}/>} />
          <Route exact path="/Survey" element={<Survey/>} />
          <Route exact path="/MySurveys" element={<MySurveys/>} />
          <Route exact path="/ExampleOfCreatedSurvey/:idOfSurvey" element={<ExampleOfCreatedSurvey/>} />
          <Route exact path="/Surveyforuser/:idOfSurvey" element={<SurveyForUser s />} />
          <Route exact path="/Answers" element={<Answers/>} />
          <Route exact path="/SendUrlOfSurvey" element={<SendUrlOfSurvey/>} />
        </Routes>
      </Router>
  );
  
}

export default App;