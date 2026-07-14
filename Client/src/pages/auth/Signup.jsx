import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaTasks,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { signupUser } from "../../services/authService";

function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePhoto: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const response = await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                profilePhoto: formData.profilePhoto,
            });

            toast.success(response.message);

            navigate("/verify-otp", {
                replace: true,
                state: {
                    email: formData.email,
                },
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Signup Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">

                <div className="flex flex-col items-center mb-8">

                    <div className="w-16 h-16 rounded-full bg-[#BDEB25] flex items-center justify-center shadow-md">

                        <FaTasks className="text-3xl text-gray-900"/>

                    </div>

                    <h1 className="text-3xl font-bold mt-4">

                        Create Account

                    </h1>

                    <p className="text-gray-500 mt-2 text-center">

                        Start organizing your tasks today.

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Full Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Full Name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"
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
                                required
                                placeholder="Enter Password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >

                                {

                                    showPassword

                                        ? <FaEyeSlash/>

                                        : <FaEye/>

                                }

                            </button>

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Confirm Password

                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm Password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >

                                {

                                    showConfirmPassword

                                        ? <FaEyeSlash/>

                                        : <FaEye/>

                                }

                            </button>

                        </div>

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Profile Photo URL (Optional)

                        </label>

                        <input
                            type="text"
                            name="profilePhoto"
                            value={formData.profilePhoto}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#BDEB25] hover:bg-[#acd61f] disabled:bg-gray-300 disabled:cursor-not-allowed transition py-3 rounded-xl font-semibold"
                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Sign Up"

                        }

                    </button>

                </form>

                <div className="text-center mt-8">

                    <p className="text-gray-600">

                        Already have an account?

                    </p>

                    <Link
                        to="/"
                        className="font-semibold hover:text-[#8BB000]"
                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Signup;