import {  configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/productSlice"
import cartReducer from "../feature/categary/cartSlice"
import wishlistReducer from "../feature/wishlist/wishlistSlice";
import authReducer from "../feature/auth/authSlice"
import shopReducer from "../feature/shop/shopSlice"
import loaderReaducer from "../feature/loader/loaderSlice"
import orderReducer from "../feature/order/orderSlice"
import adminReducer from "../feature/admin/adminSlice"
import headerSlice from "../feature/header/headerSlice"
const store=configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer,
        wish:wishlistReducer,
        auth:authReducer,
        shop:shopReducer,
        load:loaderReaducer,
        order:orderReducer,
        admin:adminReducer,
        header:headerSlice
    }
})

export default store;