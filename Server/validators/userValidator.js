const { z } = require("zod");

const updateProfileSchema = z.object({

    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(50, "Name cannot exceed 50 characters.")
        .optional(),

    profilePhoto: z
        .string()
        .trim()
        .url("Please enter a valid image URL.")
        .optional()
        .or(z.literal("")),

});

module.exports = {
    updateProfileSchema,
};