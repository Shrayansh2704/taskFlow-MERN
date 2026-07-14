import {
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaHourglassHalf,
} from "react-icons/fa";

function TodoCard({

    todo,

    handleToggle,

    handleDelete,

    handleEdit,

}) {

    const priorityColor = {

        High: "bg-red-100 text-red-600",

        Medium: "bg-yellow-100 text-yellow-700",

        Low: "bg-green-100 text-green-600",

    };

    return (

        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">

            <div className="flex justify-between items-start">

                <div className="flex items-center gap-4">

                    <input

                        type="checkbox"

                        checked={todo.isCompleted}

                        onChange={() => handleToggle(todo._id)}

                        className="w-5 h-5 accent-[#BDEB25] cursor-pointer"

                    />

                    <div>

                        <h2
                            className={`text-xl font-bold ${
                                todo.isCompleted
                                    ? "line-through text-gray-400"
                                    : "text-gray-800"
                            }`}
                        >

                            {todo.title}

                        </h2>

                        <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                                priorityColor[todo.priority]
                            }`}
                        >

                            {todo.priority} Priority

                        </span>

                    </div>

                </div>

                <div className="flex gap-4 text-lg">

                    <button

                        onClick={() => handleEdit(todo)}

                        className="text-blue-500 hover:text-blue-700 transition"

                    >

                        <FaEdit />

                    </button>

                    <button

                        onClick={() => handleDelete(todo._id)}

                        className="text-red-500 hover:text-red-700 transition"

                    >

                        <FaTrash />

                    </button>

                </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

                <div className="flex items-center gap-3">

                    <FaCalendarAlt className="text-[#BDEB25]" />

                    <div>

                        <p className="text-xs text-gray-500">

                            Start Date

                        </p>

                        <p className="font-medium">

                            {todo.startDate?.slice(0,10)}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <FaCalendarAlt className="text-[#BDEB25]" />

                    <div>

                        <p className="text-xs text-gray-500">

                            End Date

                        </p>

                        <p className="font-medium">

                            {todo.endDate?.slice(0,10)}

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <FaClock className="text-[#BDEB25]" />

                    <div>

                        <p className="text-xs text-gray-500">

                            Time

                        </p>

                        <p className="font-medium">

                            {todo.startTime} - {todo.endTime}

                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-6 flex justify-end">

                {

                    todo.isCompleted

                    ?

                    <div className="flex items-center gap-2 text-green-600 font-semibold">

                        <FaCheckCircle />

                        Completed

                    </div>

                    :

                    <div className="flex items-center gap-2 text-orange-500 font-semibold">

                        <FaHourglassHalf />

                        Pending

                    </div>

                }

            </div>

        </div>

    );

}

export default TodoCard;