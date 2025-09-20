import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk("auth/registerUser",
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${backendUrl}/auth/register`, data, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error registering user");
        }
    }
);

export const loginUser = createAsyncThunk("auth/loginUser",
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(`${backendUrl}/auth/login`, data, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error logging in user");
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await axios.post(`${backendUrl}/auth/logout`, null, {
                withCredentials: true    // ✅ Must be in config, not body
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error logging out user");
        }
    }
);

export const checkAuth = createAsyncThunk("auth/checkAuth",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${backendUrl}/auth/check-auth`, {
                withCredentials: true
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Error checking authentication");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });

        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("action.payload : ", action.payload);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });

        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });

        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    }
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;