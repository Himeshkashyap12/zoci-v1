import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState= {products: [],searchData:[],productDetails:[]}
// tHIS IS MY PRODUCT SLICE 
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts:(state,action)=>{
        state.products=action.payload
    },
    searchProducts:(state,action)=>{
      state.searchData=action.payload;
    },
   addProductDetals:(state,action)=>{
     state.productDetails=action.payload
   }
  },
});
export const {addProducts,searchProducts,addProductDetals}=productSlice.actions
export default productSlice.reducer;
