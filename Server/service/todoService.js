const Todo = require("../models/Todo");
const validateTodo = require("../utils/validateTodo");

const createTodoService = async(todoData, user)=>{
    const {
        title,
        priority,
        startDate,
        endDate,
        startTime,
        endTime,
    } = todoData;
    const validation = validateTodo(todoData);

    if (!validation.success) {

        return validation;

    }

    const todo = await Todo.create({
        owner : user._id,
        title,
        priority,
        startDate,
        endDate,
        startTime,
        endTime,
    });

    return {
        success : true,
        statusCode : 201,
        message : "Todo created successfully",
        todo,
    };
};

const getTodosService = async(user)=>{
    const todos = await Todo.find({
        owner : user._id,
    })
    .select("-__v")
    .sort({
        created : -1,
    });

    return{
        success : true,
        statusCode : 200,
        todos
    }
}

const updateTodoService = async(todoId, todoData, user)=>{
    const validation = validateTodo(todoData);

    if (!validation.success) {

        return validation;

    }
    const updatedTodo = await Todo.findOneAndUpdate(
        {
            _id: todoId,
            owner: user._id,
        },
        todoData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedTodo) {
        return {
            success: false,
            statusCode: 404,
            message: "Todo not found.",
        };
    }

    return {
        success: true,
        statusCode: 200,
        message: "Todo updated successfully.",
        todo: updatedTodo,
    };

};

const deleteTodoService = async(todoId, user)=>{
    const deleteTodo = await Todo.findOneAndDelete({
        _id : todoId,
        owner : user._id,
    });

    if(!deleteTodo){
        return {
            success : false,
            statusCode : 400,
            message : "Todo not Found",
        };
    }
    return{
        success : true,
        statusCode : 200,
        message : "Todo Successfully deleted",
    };
}

const toggleTodoService = async(todoId, user)=>{

    const todo = await Todo.findOne({
        _id: todoId,
        owner: user._id,
    });

    if (!todo) {
        return {
            success: false,
            statusCode: 404,
            message: "Todo not found",
        };
    }

    todo.isCompleted = !todo.isCompleted;

    await todo.save();

    return {
        success: true,
        statusCode: 200,
        message: "Todo status updated successfully.",
        todo,
    };
}

const getDashboardStatsService = async(user)=>{
    const total = await Todo.countDocuments({
        owner : user._id,
    });

    const completed = await Todo.countDocuments({
        owner : user._id,
        isCompleted : true,
    });

    const pending = total - completed;

    return {
        success: true,
        statusCode: 200,
        stats: {
            total,
            completed,
            pending,
        },
    };
};

module.exports = {
    createTodoService,
    getTodosService,
    updateTodoService,
    deleteTodoService,
    toggleTodoService,
    getDashboardStatsService,
}