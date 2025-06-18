import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState= {cart:[]}
// tHIS IS MY PRODUCT SLICE 
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart:(state,action)=>{      
        state.cart=action.payload
    },
  },
});
export const {addToCart,cartCountersData}=cartSlice.actions
export default cartSlice.reducer;
