import { Navigate } from "react-router-dom";
import api from "../constants/api";
import axios from "axios";

const signup = async (name, email, password, role, navigation) => {
  const detail = {
    email: email,
    password: password,
    role: role,
    name: name,
  };

  try {
    const res = await axios.post(`${api}api/users/register/`, detail, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Details: ", res.data)
    navigation("login/")
  } catch (err) {
    console.log("Error: ", err)
  }
};

export default signup;
