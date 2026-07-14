const { z } = require("zod");

const todoSchema = z.object({
    title : z.string().trim().min(1, "Todo is Required").max(100, "Todo cannont exceed 100 characters"),
    priority : z.enum(["Low", "Medium", "High"]),
    startDate : z.string(),
    endDate : z.string(),
    startTime : z.string(),
    endTime : z.string(),
});


const createTodoSchema = todoSchema;
const updateTodoSchema = todoSchema.partial();



module.exports = {
    createTodoSchema,
    updateTodoSchema,
};