import { Navigate } from "react-router-dom";
import api from "../constants/api";
import axios from "axios";

const signup = async (password, name, email, role, navigation) => {
  const detail = { email, password, role, name };
  console.log("Payload:", detail);

  try {
    const res = await axios.post(`${api}api/users/register/`, detail, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Details: ", res.data);
    navigation("login/");
  } catch (err) {
    if (err.response) {
      console.log("Backend validation errors:", err.response.data);
    } else {
      console.log("Error:", err.message);
    }
  }
};

export default signup;
