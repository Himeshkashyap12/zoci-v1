import { createSlice } from "@reduxjs/toolkit";

const initialState = { shop: [], category: "" };
// tHIS IS MY PRODUCT SLICE
const shopSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addproductToshop: (state, action) => {      
      state.shop = action.payload;
    },
    addCategary: (state, action) => {
      console.log("ddsf",action.payload);
      
      state.category = action.payload;
    },
  },
});
export const { addproductToshop, addCategary } = shopSlice.actions;
export default shopSlice.reducer;
