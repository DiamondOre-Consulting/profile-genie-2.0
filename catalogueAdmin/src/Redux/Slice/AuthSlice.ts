import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { axiosInstance } from '../../Helper/axiosInstance'

interface registerData {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    role: string
}

const initialState = {
    user: null as null | undefined,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
}

export const login = createAsyncThunk("auth/signin", async (data: FormData) => {
    try {
        const res = await axiosInstance.post("auth/login", data)
        return res?.data
    } catch (err: any) {
        return toast.error(err.response.data.message)
    }
})

export const register = createAsyncThunk("auth/register", async (data: registerData) => {
    try {
        const res = await axiosInstance.post("auth/register", data)
        return res?.data
    } catch (err: any) {
        return toast.error(err.response.data.message)
    }
})

export const logout = createAsyncThunk("auth/signout", async () => {
    try {
        const res = await axiosInstance.get("auth/logout")
        return res?.data
    } catch (err: any) {
        return toast.error(err.response.data.message)
    }
})

export const profile = createAsyncThunk("auth/profile", async () => {
    try {
        const res = await axiosInstance.get("auth/profile")
        return res?.data
    } catch (err: any) {
        return toast.error(err.response.data.message)
    }
})

export const getDetailProfile = createAsyncThunk("auth/detail-profile", async () => {
    try {
        const res = await axiosInstance.get("auth/get-detail-profile")
        return res?.data
    } catch (err: any) {
        return toast.error(err.response.data.message)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action?.payload?.user
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isLoggedIn = false
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.user = action?.payload?.user
            })
    },
})


export default authSlice.reducer