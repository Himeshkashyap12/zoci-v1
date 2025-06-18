import { createSlice } from "@reduxjs/toolkit";

const initialState= {wishlist: []}
// tHIS IS MY PRODUCT SLICE 
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList:(state,action)=>{
        state.wishlist=action.payload
        
    },

  },
});
export const {addToWishList}=wishlistSlice.actions
export default wishlistSlice.reducer;
