import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        email: null,
        error: false,
    },
    reducers: {
        getEmailSuccess: (state, action) => {
            state.email = action.payload;
            state.error = false;
        },
        getEmailError: (state) => {
            state.error = true;
            state.email = null;
        },
    },
});

export const { getEmailSuccess, getEmailError } = emailSlice.actions;

export default emailSlice.reducer;
