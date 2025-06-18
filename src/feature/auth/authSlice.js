import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
const token = Cookies.get('token');
const initialState= {
    role:localStorage.getItem("role"),
    userData:{},
    user:null,
    token:token || null,
    isAuthenticated:!!token,
    mobile:""
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess:(state,action)=>{ 
        state.userData=action.payload.users;   
        state.user=action.payload?.users._id;
        state.token=action.payload.token;
        state.isAuthenticated=true;
        Cookies.set('token', action.payload?.token, { expires: 1 });
    },
    logout:(state,action)=>{
        state.user=null;
        state.token=null;
        state.isAuthenticated=false;
        Cookies.remove("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("wish");
        localStorage.removeItem("cart");
    },
    handleMobile:(state,action)=>{
      state.mobile=action.payload
    },
    addUserData:(state,action)=>{
      state.userData=action.payload
    }

  
  },
});
export const {loginSuccess,logout,addUserData,handleMobile}=authSlice.actions
export default authSlice.reducer;
