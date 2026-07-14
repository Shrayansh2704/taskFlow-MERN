const validateTodo = (todoData) => {

    const {
        startDate,
        endDate,
        startTime,
        endTime,
    } = todoData;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);

    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);

    end.setHours(0, 0, 0, 0);

    if (start < today) {

        return {
            success: false,
            statusCode: 400,
            message: "Start date cannot be in the past.",
        };

    }

    if (end < start) {

        return {
            success: false,
            statusCode: 400,
            message: "End date cannot be before start date.",
        };

    }

    if (startDate === endDate && endTime <= startTime) {

        return {
            success: false,
            statusCode: 400,
            message: "End time must be after start time.",
        };

    }

    if (startDate === new Date().toISOString().split("T")[0]) {

        const currentTime = new Date()
            .toTimeString()
            .slice(0, 5);

        if (startTime < currentTime) {

            return {
                success: false,
                statusCode: 400,
                message: "Start time cannot be in the past.",
            };

        }

    }

    return {
        success: true,
    };

};

module.exports = validateTodo;