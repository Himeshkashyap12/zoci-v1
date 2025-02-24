import { createSlice } from "@reduxjs/toolkit";

const initialState = { shop: [], categary: "" };
// tHIS IS MY PRODUCT SLICE
const shopSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addproductToshop: (state, action) => {
      state.shop = action.payload;
    },
    addCategary: (state, action) => {
      state.categary = action.payload;
    },
  },
});
export const { addproductToshop, addCategary } = shopSlice.actions;
export default shopSlice.reducer;
