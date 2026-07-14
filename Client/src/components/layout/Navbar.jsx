import { useNavigate } from "react-router-dom";

import {
    FaTasks,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";

function Navbar({ user }) {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const handleLogout = async () => {

        try {

            await logoutUser();

            setUser(null);

            navigate("/");

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                {/* Logo */}

                <button

                    onClick={() => navigate("/dashboard")}

                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition hover:bg-[#BDEB25]/20"

                >

                    <div className="w-12 h-12 rounded-xl bg-[#BDEB25] flex items-center justify-center">

                        <FaTasks className="text-2xl text-gray-900" />

                    </div>

                    <div className="text-left">

                        <h1 className="text-2xl font-bold">

                            TaskFlow

                        </h1>

                        <p className="text-sm text-gray-500">

                            Manage your day

                        </p>

                    </div>

                </button>

                <div className="flex items-center gap-8">

                    {/* User Section */}

                    <button

                        onClick={() => navigate("/profile")}

                        className="flex items-center gap-3 px-3 py-2 rounded-xl transition hover:bg-[#BDEB25]/20"

                    >

                        {

                            user?.profilePhoto

                                ? (

                                    <img

                                        src={user.profilePhoto}

                                        alt="Profile"

                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#BDEB25]"

                                    />

                                )

                                : (

                                    <FaUserCircle className="text-4xl text-gray-600" />

                                )

                        }

                        <div className="text-left">

                            <p className="font-semibold">

                                {user?.name}

                            </p>

                            <p className="text-sm text-gray-500">

                                {user?.email}

                            </p>

                        </div>

                    </button>

                    {/* Logout */}

                    <button

                        onClick={handleLogout}

                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-xl"

                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;