const validateTodo = (todoData) => {

    const {
        startDate,
        endDate,
        startTime,
        endTime,
    } = todoData;

    const now = new Date();

    const today = new Date().toISOString().split("T")[0];

    const currentTime = now.toTimeString().slice(0, 5);

    if (startDate < today) {
        return {
            success: false,
            message: "Start date cannot be in the past.",
        };
    }

    if (endDate < startDate) {
        return {
            success: false,
            message: "End date cannot be before start date.",
        };
    }

    if (startDate === today && startTime < currentTime) {
        return {
            success: false,
            message: "Start time cannot be in the past.",
        };
    }

    if (
        startDate === endDate &&
        endTime <= startTime
    ) {
        return {
            success: false,
            message: "End time must be after start time.",
        };
    }

    return {
        success: true,
    };

};

export default validateTodo;