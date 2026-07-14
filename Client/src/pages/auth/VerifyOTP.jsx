import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import toast from "react-hot-toast";

import {
    verifyOtp,
    resendOtp,
} from "../../services/authService";

function VerifyOTP() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email || "";
    useEffect(() => {
        if (!email) {
            navigate("/signup");

        }
    }, [email, navigate]);

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [resendLoading, setResendLoading] = useState(false);

    const [timer, setTimer] = useState(60);

    useEffect(() => {

        if (timer === 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (otp.length !== 6) {

            toast.error("OTP must be 6 digits.");

            return;

        }

        try {

            setLoading(true);

            const response = await verifyOtp({
                email,
                otp,
            });

            toast.success(response.message);

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "OTP Verification Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const handleResendOTP = async () => {

        try {

            setResendLoading(true);

            const response = await resendOtp({
                email,
            });

            toast.success(response.message);

            setTimer(60);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to resend OTP"
            );

        } finally {

            setResendLoading(false);

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

                        Verify OTP

                    </h1>

                    <p className="text-gray-500 mt-2 text-center">

                        Enter the OTP sent to

                    </p>

                    <p className="font-semibold mt-1 break-all">

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

                            value={otp}

                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(/\D/g, "")
                                )
                            }

                            maxLength={6}

                            placeholder="Enter 6 Digit OTP"

                            className="w-full text-center tracking-[10px] text-2xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#BDEB25] focus:ring-2 focus:ring-[#BDEB25]/30"

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-[#BDEB25] hover:bg-[#acd61f] disabled:bg-gray-300 disabled:cursor-not-allowed transition py-3 rounded-xl font-semibold"

                    >

                        {

                            loading

                                ? "Verifying..."

                                : "Verify OTP"

                        }

                    </button>

                </form>

                <div className="mt-6 text-center">

                    {

                        timer > 0

                        ?

                        <p className="text-gray-500">

                            Resend OTP in

                            {" "}

                            <span className="font-bold">

                                {timer}s

                            </span>

                        </p>

                        :

                        <button

                            onClick={handleResendOTP}

                            disabled={resendLoading}

                            className="text-[#7DA000] hover:underline font-semibold"

                        >

                            {

                                resendLoading

                                    ? "Sending..."

                                    : "Resend OTP"

                            }

                        </button>

                    }

                </div>

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

export default VerifyOTP;