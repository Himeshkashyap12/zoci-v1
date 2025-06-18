import api from "../../axios/axios";
export const uploadProductVideo = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.post("/upload/uploadProductVideos", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const uploadProductImages = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.post("/upload/uploadProductImages", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createProductApi = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.post("/product/create-new-product", data, {
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

export const editProductApi = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.put(`product/updateProduct/${id}`, data, {
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

export const deleteProductData = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.delete(`/product/deleteProduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res; // Handle response as needed
  } catch (error) {
    throw error;
  }
};

export const getAllOrder = async ({page}) => {
  console.log(page);
  
  const token = localStorage.getItem("token");

  try {
    const res = await api.get("/user/getallorders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sending token in the header
      },
      params: page, // Adding params here
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (data, id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.put(`/user/updateOrder/${id}`, data, {
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

export const getallCategaryApi = async (data) => {  
  const token = localStorage.getItem("token");
  try {
    const res = await api.get("/category/getallCategory",
     {
      params:{...data}, 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sending token in the header
      },
    });
    return await res.data;
  } catch (error) {
    throw error;
  }
};


export const deleteProductImage= async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.delete('/upload/deleteProductImage', {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
      data,  // Important! Axios delete uses 'data' for the body
    });

    return res.data;
  } catch (error) {
    console.error('Error deleting image:', error.response?.data || error.message);
    throw error;
  }

};