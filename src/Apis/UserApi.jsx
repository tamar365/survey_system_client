// import axios from "axios";
// // import ClientConfig from "../Common/Config";

// class UserApi {
//   updateUser = async (user) => {
//     try {
//       const res = await axios.put("http://localhost:8080/user/update", { user }, {
//         headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("auth_token") },
//       });
//       return res.data;
//     } catch (err) {
//       throw err;
//     }
//   };

//   getAllUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/user");
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   login = async (body) => {
//     try {
//       const res = await axios.get("http://localhost:8080/general/login", body);
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };


// }

// export default new UserApi();
