import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk(
    'orders/fetchTransactions', 
    async () => {

    },
    {
        pending: (state, action) => {
            state.status = "loading";
        },
        rejected: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
)
