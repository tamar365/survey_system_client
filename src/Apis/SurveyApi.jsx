// import axios from "axios";
// // import ClientConfig from "../Common/Config";

// class SurveyApi {
//   updateSurvey = async (survey) => {
//     try {
//       const res = await axios.put("http://localhost:3001/survey/update", { survey }, {
//         headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("auth_token") },
//       });
//       return res.data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   getAllSurveys = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/survey");
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   login = async (body) => {
//     try {
//       const res = await axios.get("http://localhost:3001/general/login", body);
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };


// }

// export default new SurveyApi();