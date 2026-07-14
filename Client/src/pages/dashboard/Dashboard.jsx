import { useEffect, useState } from "react";
import {
    FaTasks,
    FaCheckCircle,
    FaHourglassHalf,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import validateTodo from "../../utils/validateTodo";
import {
    getDashboardStats,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
} from "../../services/todoService";

import Navbar from "../../components/layout/Navbar";
import StatCard from "../../components/cards/StatCard";
import TodoCard from "../../components/cards/TodoCard";
import TodoForm from "../../components/forms/TodoForm";

function Dashboard() {

    const { user } = useAuth();

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
    });

    const [todos, setTodos] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [todoData, setTodoData] = useState({
        title: "",
        priority: "Low",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        refreshDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardStats();

            setStats(response.stats);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to load dashboard"
            );

        }

    };

    const loadTodos = async () => {

        try {

            const response = await getTodos();

            setTodos(response.todos);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to load todos"
            );

        }

    };

    const refreshDashboard = async () => {

        await loadDashboard();

        await loadTodos();

    };

    const clearForm = () => {

        setTodoData({
            title: "",
            priority: "Low",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
        });

        setEditingId(null);

    };

    const handleChange = (e) => {

        setTodoData({
            ...todoData,
            [e.target.name]: e.target.value,
        });

    };

   const handleSubmit = async (e) => {

    e.preventDefault();

    const validation = validateTodo(todoData);

    if (!validation.success) {

        toast.error(validation.message);

        return;

    }

    try {

        if (editingId) {

            await updateTodo(editingId, todoData);

            toast.success("Todo Updated Successfully");

        } else {

            await createTodo(todoData);

            toast.success("Todo Created Successfully");

        }

        clearForm();

        await refreshDashboard();

    } catch (err) {

        toast.error(
            err.response?.data?.message ||
            "Operation Failed"
        );

    }

};

    const handleToggle = async (id) => {

        try {

            await toggleTodo(id);

            toast.success("Todo Updated");

            await refreshDashboard();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to Update Todo"
            );

        }

    };

    const handleDelete = async (id) => {

        try {

            await deleteTodo(id);

            toast.success("Todo Deleted Successfully");

            await refreshDashboard();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to Delete Todo"
            );

        }

    };

    const handleEdit = (todo) => {

        setEditingId(todo._id);

        setTodoData({

            title: todo.title,

            priority: todo.priority,

            startDate: todo.startDate
                ? todo.startDate.slice(0, 10)
                : "",

            endDate: todo.endDate
                ? todo.endDate.slice(0, 10)
                : "",

            startTime: todo.startTime,

            endTime: todo.endTime,

        });

        toast("Editing Todo ✏️");

    };

    return (

        <div className="min-h-screen bg-[#F8FAFC]">

            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-8 py-8">

                <h1 className="text-4xl font-bold mb-8">

                    Hello, {user?.name} 👋

                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    <StatCard
                        title="Total Tasks"
                        value={stats.total}
                        icon={
                            <FaTasks className="text-[#BDEB25] text-4xl" />
                        }
                    />

                    <StatCard
                        title="Completed"
                        value={stats.completed}
                        icon={
                            <FaCheckCircle className="text-green-500 text-4xl" />
                        }
                    />

                    <StatCard
                        title="Pending"
                        value={stats.pending}
                        icon={
                            <FaHourglassHalf className="text-orange-500 text-4xl" />
                        }
                    />

                </div>

                <TodoForm
                    todoData={todoData}
                    editingId={editingId}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    clearForm={clearForm}
                />

                <div className="space-y-5 mt-8">

                    {

                        todos.length === 0

                            ? (

                                <div className="bg-white rounded-2xl shadow-md p-10 text-center">

                                    <h2 className="text-2xl font-bold">

                                        No Todos Found

                                    </h2>

                                    <p className="text-gray-500 mt-2">

                                        Start by creating your first task.

                                    </p>

                                </div>

                            )

                            : (

                                todos.map((todo) => (

                                    <TodoCard

                                        key={todo._id}

                                        todo={todo}

                                        handleToggle={handleToggle}

                                        handleDelete={handleDelete}

                                        handleEdit={handleEdit}

                                    />

                                ))

                            )

                    }

                </div>

            </div>

        </div>

    );

}

export default Dashboard;