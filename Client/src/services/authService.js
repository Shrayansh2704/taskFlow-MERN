import api from "./api";

export const loginUser = async (userData) => {

    const response = await api.post("/auth/login", userData);

    return response.data;

};

export const signupUser = async (userData) => {

    const response = await api.post("/auth/signup", userData);

    return response.data;

};

export const verifyOtp = async (data) => {

    const response = await api.post("/auth/verify-otp", data);

    return response.data;

};

export const forgotPassword = async (data) => {

    const response = await api.post("/auth/forgot-password", data);

    return response.data;

};

export const resetPassword = async (data) => {

    const response = await api.post("/auth/reset-password", data);

    return response.data;

};

export const resendOtp = async (data) => {

    const response = await api.post("/auth/resend-otp", data);

    return response.data;

};

export const logoutUser = async () => {

    const response = await api.post("/auth/logout");

    return response.data;

};