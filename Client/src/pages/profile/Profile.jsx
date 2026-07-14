import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    FaCamera,
    FaUserCheck,
    FaCalendarAlt,
    FaSave,
    FaTrash,
    FaKey,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

import {
    updateProfile,
    deleteAccount,
} from "../../services/profileService";

import uploadImage from "../../utils/uploadImage";

import Navbar from "../../components/layout/Navbar";
import Avatar from "../../components/ui/Avatar";
import Spinner from "../../components/ui/Spinner";

function Profile() {

    const navigate = useNavigate();

    const {
        user,
        fetchProfile,
    } = useAuth();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [imageUploading, setImageUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        profilePhoto: "",
    });

    useEffect(() => {

        if (user) {

            setFormData({
                name: user.name,
                profilePhoto: user.profilePhoto || "",
            });

            setLoading(false);

        }

    }, [user]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleImage = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setImageUploading(true);

            const imageUrl = await uploadImage(file);

            setFormData((prev) => ({
                ...prev,
                profilePhoto: imageUrl,
            }));

            toast.success("Image uploaded successfully.");

        } catch (err) {

            toast.error(err.message);

        } finally {

            setImageUploading(false);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const response = await updateProfile(formData);

            toast.success(response.message);

            await fetchProfile();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to update profile."
            );

        } finally {

            setSaving(false);

        }

    };

    const handleDelete = async () => {

        const password = prompt(
            "Enter your password to delete your account:"
        );

        if (!password) return;

        try {

            const response = await deleteAccount(password);

            toast.success(response.message);

            navigate("/");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to delete account."
            );

        }

    };

    if (loading) {

        return <Spinner />;

    }

    return (

        <div className="min-h-screen bg-[#F8FAFC]">

            <Navbar user={user} />

            <div className="max-w-3xl mx-auto py-10 px-5">

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    <div className="flex flex-col items-center">

                        <Avatar
                            src={formData.profilePhoto}
                            size={150}
                        />

                        <label
                            htmlFor="image"
                            className="mt-5 cursor-pointer bg-[#BDEB25] hover:bg-[#acd61f] transition px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
                        >

                            <FaCamera />

                            {

                                imageUploading

                                    ? "Uploading..."

                                    : "Change Photo"

                            }

                        </label>

                        <input

                            id="image"

                            type="file"

                            accept="image/*"

                            hidden

                            onChange={handleImage}

                        />

                        {

                            formData.profilePhoto && (

                                <button

                                    type="button"

                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            profilePhoto: "",
                                        })
                                    }

                                    className="mt-3 text-red-500 hover:text-red-600 font-semibold transition"

                                >

                                    Remove Photo

                                </button>

                            )

                        }

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 mt-10"
                    >

                        <div>

                            <label className="block mb-2 font-semibold">

                                Name

                            </label>

                            <input

                                type="text"

                                name="name"

                                value={formData.name}

                                onChange={handleChange}

                                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#BDEB25] outline-none"

                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-semibold">

                                Email

                            </label>

                            <input

                                value={user.email}

                                disabled

                                className="w-full bg-gray-100 border rounded-xl px-4 py-3"

                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">

                                <FaUserCheck className="text-[#BDEB25] text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Status

                                    </p>

                                    <p className="font-semibold">

                                        {

                                            user.isVerified

                                                ? "Verified"

                                                : "Not Verified"

                                        }

                                    </p>

                                </div>

                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">

                                <FaCalendarAlt className="text-[#BDEB25] text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Joined

                                    </p>

                                    <p className="font-semibold">

                                        {

                                            new Date(
                                                user.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        <button

                            disabled={saving}

                            className="w-full bg-[#BDEB25] hover:bg-[#acd61f] py-3 rounded-xl font-semibold flex justify-center items-center gap-2"

                        >

                            <FaSave />

                            {

                                saving

                                    ? "Saving..."

                                    : "Save Changes"

                            }

                        </button>

                    </form>

                    <div className="grid md:grid-cols-2 gap-4 mt-8">

                        <button

                            onClick={() =>
                                navigate("/change-password")
                            }

                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

                        >

                            <FaKey />

                            Change Password

                        </button>

                        <button

                            onClick={handleDelete}

                            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"

                        >

                            <FaTrash />

                            Delete Account

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;