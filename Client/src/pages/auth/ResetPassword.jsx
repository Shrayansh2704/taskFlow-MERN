import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaTasks,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authService";

function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.otp.length !== 6) {

            toast.error("OTP must be 6 digits.");

            return;

        }

        if (formData.newPassword !== formData.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            const response = await resetPassword({
                email,
                otp: formData.otp,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });

            toast.success(response.message);

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Password Reset Failed"
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

                        Reset Password

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Enter the OTP sent to

                    </p>

                    <p className="font-semibold break-all">

                        {email}

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            OTP

                        </label>

                        <input

                            type="text"

                            name="otp"

                            value={formData.otp}

                            maxLength={6}

                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    otp: e.target.value.replace(/\D/g, ""),
                                })
                            }

                            placeholder="Enter OTP"

                            required

                            className="w-full text-center tracking-[8px] text-2xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            New Password

                        </label>

                        <div className="relative">

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                name="newPassword"

                                value={formData.newPassword}

                                onChange={handleChange}

                                placeholder="Enter New Password"

                                required

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

                                        ? <FaEyeSlash />

                                        : <FaEye />

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

                                placeholder="Confirm Password"

                                required

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

                                        ? <FaEyeSlash />

                                        : <FaEye />

                                }

                            </button>

                        </div>

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-[#BDEB25] hover:bg-[#acd61f] disabled:bg-gray-300 disabled:cursor-not-allowed transition py-3 rounded-xl font-semibold"

                    >

                        {

                            loading

                                ? "Resetting Password..."

                                : "Reset Password"

                        }

                    </button>

                </form>

                <div className="text-center mt-8">

                    <Link
                        to="/"
                        className="font-semibold hover:text-[#7DA000]"
                    >

                        Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ResetPassword;