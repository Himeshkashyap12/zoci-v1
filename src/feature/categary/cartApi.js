import { useState } from "react";
import api from "../../axios/axios";
var userId = localStorage.getItem("userId");
export const addToCartData = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.post(`/user/addtocart`, data, {
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

export const getCartData = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const res = await api.get(`/user/cart/view/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCartData = async (id) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const res = await api.delete(`/user/cart/removeitem/${userId}/${id}`, {
      headers: {
        // Sending token in the header
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return { data: res.data, status: "success" };
  } catch (error) {
    throw { message: error, status: "fail" };
  }
};

export const updateCartApi = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.put(`/user/cart/updatequantity`, data, {
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
