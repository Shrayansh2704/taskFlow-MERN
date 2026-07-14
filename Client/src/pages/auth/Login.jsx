import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaTasks,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { fetchProfile } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            await loginUser(formData);

            await fetchProfile();

            toast.success("Welcome Back!");

            navigate("/dashboard");

        } catch (err) {

            if (err.response?.data?.needsVerification) {

                toast.success(
                    "A new OTP has been sent to your email."
                );

                navigate("/verify-otp", {
                    state: {
                        email: formData.email,
                    },
                });

                return;

            }

            toast.error(
                err.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="flex flex-col items-center mb-8">

                    <div className="w-16 h-16 rounded-full bg-[#BDEB25] flex items-center justify-center shadow-md">

                        <FaTasks className="text-3xl text-gray-900" />

                    </div>

                    <h1 className="text-3xl font-bold mt-4">

                        TaskFlow

                    </h1>

                    <p className="text-gray-500 mt-2 text-center">

                        Organize your work efficiently.

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30 transition"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30 transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                            >

                                {

                                    showPassword

                                        ? <FaEyeSlash />

                                        : <FaEye />

                                }

                            </button>

                        </div>

                    </div>

                    <div className="flex justify-between items-center">

                        <Link
                            to="/forgot-password"
                            className="text-sm text-gray-600 hover:text-black hover:underline transition"
                        >

                            Forgot Password?

                        </Link>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#BDEB25] hover:bg-[#acd61f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all py-3 rounded-xl font-semibold text-gray-900 shadow-md"
                    >

                        {

                            loading

                                ? "Logging In..."

                                : "Login"

                        }

                    </button>

                </form>

                <div className="mt-8 text-center">

                    <p className="text-gray-600">

                        Don't have an account?

                    </p>

                    <Link
                        to="/signup"
                        className="font-semibold text-gray-900 hover:text-[#7da000] transition"
                    >

                        Create Account

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;