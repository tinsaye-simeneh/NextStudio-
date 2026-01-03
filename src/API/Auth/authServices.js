import axios from "axios";
import {URL} from '../../Url/Url'

const login = async (userData) => {
  const response = await axios.post(`${URL}/api/NextStudio/admin/login`, userData);

  if (response.data) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user))
  }
  
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const updatePassword = async (userData,token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }


  
  const response = await axios.patch(
    `${URL}/api/NextStudio/admin/changepassword`,
    userData,config
  );

  return response.data;
};

const authService = {
  logout,
  login,
  updatePassword,
};

export default authService;
