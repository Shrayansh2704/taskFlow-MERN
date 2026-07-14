import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
    try {

        const response = await api.get("/auth/profile");

        console.log(response.data);

        setUser(response.data.user);

    } catch (err) {

        if(err.response?.status !== 401){
            setUser(null);
        }else{
            console.error(err);
        }
    } finally {

        setLoading(false);

    }
};

    useEffect(() => {
        fetchProfile();
    }, []);

    console.log(user);

    const value = {
        user,
        setUser,
        loading,
        fetchProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;