import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headermenu: false,
    headerActive:"home"
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        headermenuHandler: (state, action) => {
            state.headermenu = action.payload;
        },
        headerActiveTab:(state,action)=>{
            state.headerActive=action.payload
        }
    },
});

export const { headermenuHandler,headerActiveTab } = headerSlice.actions;
export default  headerSlice.reducer;