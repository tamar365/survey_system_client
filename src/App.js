import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Survey from "./Components/Survey/Survey";
import SurveyForUser from "./Components/SurveyForUser/SurveyForUser";
import Answers from "./Components/Answers/Answers";
import SendUrlOfSurvey from "./Components/SendUrlOfSurvey/SendUrlOfSurvey";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import ExampleOfCreatedSurvey from "./Components/ExampleOfCreatedSurvey/ExampleOfCreatedSurvey";
import MySurveys from "./Components/MySurveys/MySurveys";
import {useState} from "react";


function App() {
  
  const isAuthenticated = JSON.parse(localStorage.getItem("accessToken")) || false;
  const [accessToUserSurveyPage, setAccessToUserSurveyPage] = useState(false);

  return (
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : (accessToUserSurveyPage && isAuthenticated) ? <Navigate to="/SurveyForUser/:idOfSurvey" setAccessToUserSurveyPage={setAccessToUserSurveyPage} replace/> : <Navigate to="/login" replace />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Survey" element={<Survey/>} />
          <Route exact path="/MySurveys" element={<MySurveys/>} />
          <Route exact path="/ExampleOfCreatedSurvey/:idOfSurvey" element={<ExampleOfCreatedSurvey/>} />
          <Route exact path="/SurveyForUser/:idOfSurvey" element={<SurveyForUser setAccessToUserSurveyPage={setAccessToUserSurveyPage}/>} />
          <Route exact path="/Answers" element={<Answers/>} />
          <Route exact path="/SendUrlOfSurvey" element={<SendUrlOfSurvey/>} />
        </Routes>
      </Router>
  );
  
}

export default App;