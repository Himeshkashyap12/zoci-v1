import api from "../../axios/axios";
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
export const sendOtp = async (data) => {
  try {
    const res = await api.post(`/user/sendOtp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const verifyOtp = async (data) => {
  try {
    const res = await api.post(`/user/register`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createPassword = async (data) => {
  try {
    const res = await api.put(`/user/password`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logOutApi = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const res = await api.post(`/user/logout/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userid) => {
  
  try {
    const res = await api.get(`/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Sending token in the header
      },
    });
    return await res.data;
  } catch (error) {
    throw error;
  }
};

export const loginWithNumberAndPassword = async (data) => {
  try {
    const res = await api.post(`/user/loginwithpassword`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
