import api from "./api";

export const getProfile = async () => {

    const response = await api.get("/auth/profile");

    return response.data;

};

export const updateProfile = async (profileData) => {

    const response = await api.patch(
        "/auth/profile",
        profileData
    );

    return response.data;

};

export const deleteAccount = async (password) => {

    const response = await api.delete(
        "/auth/delete-account",
        {
            data: {
                password,
            },
        }
    );

    return response.data;

};

export const changePassword = async (passwordData) => {

    const response = await api.patch(
        "/auth/change-password",
        passwordData
    );

    return response.data;

};