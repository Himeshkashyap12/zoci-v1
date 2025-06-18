import { createSlice } from "@reduxjs/toolkit";
const initialState={order:[],category:[],products:[]}
const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        addAdminOrder:(state,action)=>{            
            state.order=action.payload
        },
        addAdminCategary:(state,action)=>{            
            state.category=action.payload
        },
        addAdminProducts:(state,action)=>{            
            state.products=action.payload
        },

    }
})
export const {addAdminOrder,addAdminCategary,addAdminProducts}=adminSlice.actions;
export default adminSlice.reducer;
