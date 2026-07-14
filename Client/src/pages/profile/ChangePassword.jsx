import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";

import useAuth from "../../hooks/useAuth";

import {
    changePassword,
} from "../../services/profileService";

function ChangePassword() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showOld, setShowOld] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({

        oldPassword: "",

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

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            toast.error(
                "Passwords do not match."
            );

            return;

        }

        try {

            setLoading(true);

            const response =
                await changePassword(formData);

            toast.success(response.message);

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to change password."
            );

        } finally {

            setLoading(false);

        }

    };

    const renderPasswordField = (
        label,
        name,
        value,
        show,
        setShow
    ) => (

        <div>

            <label className="block mb-2 font-semibold">

                {label}

            </label>

            <div className="relative">

                <input

                    type={
                        show
                            ? "text"
                            : "password"
                    }

                    name={name}

                    value={value}

                    onChange={handleChange}

                    required

                    className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#BDEB25]"

                />

                <button

                    type="button"

                    onClick={() =>
                        setShow(!show)
                    }

                    className="absolute right-4 top-1/2 -translate-y-1/2"

                >

                    {

                        show

                            ? <FaEyeSlash />

                            : <FaEye />

                    }

                </button>

            </div>

        </div>

    );

    return (

        <div className="min-h-screen bg-[#F8FAFC]">

            <Navbar user={user} />

            <div className="max-w-xl mx-auto py-10 px-5">

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <div className="flex flex-col items-center mb-8">

                        <div className="w-16 h-16 rounded-full bg-[#BDEB25] flex justify-center items-center">

                            <FaLock className="text-2xl"/>

                        </div>

                        <h1 className="text-3xl font-bold mt-4">

                            Change Password

                        </h1>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {

                            renderPasswordField(
                                "Old Password",
                                "oldPassword",
                                formData.oldPassword,
                                showOld,
                                setShowOld
                            )

                        }

                        {

                            renderPasswordField(
                                "New Password",
                                "newPassword",
                                formData.newPassword,
                                showNew,
                                setShowNew
                            )

                        }

                        {

                            renderPasswordField(
                                "Confirm Password",
                                "confirmPassword",
                                formData.confirmPassword,
                                showConfirm,
                                setShowConfirm
                            )

                        }

                        <button

                            disabled={loading}

                            className="w-full bg-[#BDEB25] hover:bg-[#acd61f] py-3 rounded-xl font-semibold"

                        >

                            {

                                loading

                                    ? "Changing..."

                                    : "Change Password"

                            }

                        </button>

                    </form>

                    <div className="text-center mt-8">

                        <Link

                            to="/profile"

                            className="font-semibold hover:text-[#7DA000]"

                        >

                            Back to Profile

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChangePassword;