import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signinFailure: (state, action) => { // Fixed function name typo
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const { signinStart, signinSuccess, signinFailure } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
