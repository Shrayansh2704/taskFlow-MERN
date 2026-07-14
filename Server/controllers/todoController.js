const {
    createTodoService,
    getTodosService,
    updateTodoService,
    deleteTodoService,
    toggleTodoService,
    getDashboardStatsService,
} = require("../service/todoService");

const createTodo = async (req, res) => {
    try {

        const response = await createTodoService(
            req.body,
            req.user
        );

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: false,
                message: response.message,
            });
        }

        return res.status(response.statusCode).json({
            success: true,
            message: response.message,
            todo: response.todo,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const getTodos = async (req, res) => {

    try {

        const response = await getTodosService(req.user);

        return res.status(response.statusCode).json({
            success: response.success,
            todos: response.todos,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const updateTodo = async (req, res) => {

    try {

        const response = await updateTodoService(
            req.params.id,
            req.body,
            req.user
        );

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: false,
                message: response.message,
            });
        }

        return res.status(response.statusCode).json({
            success: true,
            message: response.message,
            todo: response.todo,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const deleteTodo = async (req, res) => {

    try {

        const response = await deleteTodoService(
            req.params.id,
            req.user
        );

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: false,
                message: response.message,
            });
        }

        return res.status(response.statusCode).json({
            success: true,
            message: response.message,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const toggleTodo = async (req, res) => {

    try {

        const response = await toggleTodoService(
            req.params.id,
            req.user
        );

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: false,
                message: response.message,
            });
        }

        return res.status(response.statusCode).json({
            success: true,
            message: response.message,
            todo: response.todo,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const getDashboardStats = async (req, res) => {

    try {

        const response = await getDashboardStatsService(req.user);

        return res.status(response.statusCode).json({
            success: response.success,
            stats: response.stats,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getDashboardStats,
};