import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
    name: "loginModal",
    initialState: {
        shown: false
    },
})