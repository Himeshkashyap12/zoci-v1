import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageLoading: false,
};

const loaderSlice = createSlice({
    name: "Loader",
    initialState,
    reducers: {
        togglePageLoader: (state, action) => {
            state.pageLoading = action.payload;
        },
    },
});

export const { togglePageLoader } = loaderSlice.actions;
export default  loaderSlice.reducer;