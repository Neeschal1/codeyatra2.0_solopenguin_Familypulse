import axios from "axios";
import api from "../constants/api";

const login = async (email, password, navigation) => {

  const detail = {
    email, password
  };

  try {
    const res = await axios.post(`${api}api/users/login/`, detail, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log("Data: ", res.data)
    navigation("/home")
  } catch (err) {
    console.log("Error: ", err)
  }
};

export default login;
