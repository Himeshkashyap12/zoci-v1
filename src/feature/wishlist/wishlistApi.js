import api from "../../axios/axios"; 

export const addToWishlistData = async (data) => {
  const token = localStorage.getItem("token");
  console.log(token);
  

  try {
    const res = await api.post(`/product/addtowishlist`, data, {
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
export const getWishlistData = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const res = await api.get(`/product/get-wishlist/${userId}`, {
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
export const deleteWishlistData = async (items) => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.delete(
      `/product/removeFromWishlist/${items.userId}/${items.prodId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res; // Handle response as needed
  } catch (error) {
    throw error;
  }
};
