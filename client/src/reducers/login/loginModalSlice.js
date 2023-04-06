import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
    name: "loginmodal",
    initialState: {
        shown: false
    },
    reducers: {
        showModal: state => { state.shown = true },

        hideModal: state => { state.shown = false }
    }
});

export const { showModal, hideModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
export const selectShown = state => state.loginmodal.shown;