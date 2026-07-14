import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

function ForgotPassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await forgotPassword({
                email,
            });

            toast.success(response.message);

            navigate("/reset-password", {
                state: {
                    email,
                },
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to send OTP"
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

                        <FaTasks className="text-3xl text-gray-900"/>

                    </div>

                    <h1 className="text-3xl font-bold mt-4">

                        Forgot Password

                    </h1>

                    <p className="text-gray-500 mt-2 text-center">

                        Enter your registered email.

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

                            value={email}

                            onChange={(e) =>
                                setEmail(e.target.value)
                            }

                            placeholder="Enter Email"

                            required

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

                                ? "Sending OTP..."

                                : "Send OTP"

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

export default ForgotPassword;