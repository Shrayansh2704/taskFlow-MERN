const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");

const { createTodoSchema, updateTodoSchema } = require("../validators/todoValidator");

const { createTodo, getTodos, updateTodo, deleteTodo, toggleTodo, getDashboardStats} = require("../controllers/todoController");

router.post("/", authMiddleware, validate(createTodoSchema), createTodo);
router.get("/", authMiddleware, getTodos);
router.patch("/:id", authMiddleware, validate(updateTodoSchema), updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.patch("/:id/toggle", authMiddleware, toggleTodo);
router.get("/dashboard", authMiddleware, getDashboardStats);

module.exports = router;