import api from "../../axios/axios";

export const getProductApi = async () => {
  try {
    const res = await api.get(`/product/getAllProduct`);

    return await res.data.products;
  } catch (error) {
    throw error;
  }
};
export const getProductDetailsApi = async (id) => {
  try {
    const res = await api.get(`/product/get-productbyid/${id}`);

    return await res.data;
  } catch (error) {
    throw error;
  }
};

export const getProductFilterApi = async ({
  page,
  limit,
  sortby,
  filters,
  search,
  newly,
}) => {
  try {
    const params = {
      page,
      limit,
      ...newly,
      ...search,
      ...sortby,
      ...filters,
      // Spread filters dynamically
    };

    const response = await api.get("/product/getAllProduct", { params });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductbyMinAndMaxPrice = async (pricerange) => {
  try {
    const response = await api.get(
      `/product/getAllProduct?minPrice=${pricerange.min}&&maxPrice=${pricerange.max}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
