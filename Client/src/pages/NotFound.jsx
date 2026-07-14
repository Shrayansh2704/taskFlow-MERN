import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-lg w-full">

                <div className="w-24 h-24 bg-[#BDEB25] rounded-full flex items-center justify-center mx-auto">

                    <FaExclamationTriangle className="text-5xl text-gray-900" />

                </div>

                <h1 className="text-7xl font-extrabold text-gray-900 mt-8">

                    404

                </h1>

                <h2 className="text-3xl font-bold mt-3">

                    Page Not Found

                </h2>

                <p className="text-gray-500 mt-4">

                    The page you're looking for doesn't exist or may have been moved.

                </p>

                <button

                    onClick={() => navigate("/dashboard")}

                    className="mt-8 bg-[#BDEB25] hover:bg-[#acd61f] transition px-8 py-3 rounded-xl font-semibold flex items-center gap-3 mx-auto"

                >

                    <FaHome />

                    Back to Dashboard

                </button>

            </div>

        </div>

    );

}

export default NotFound;