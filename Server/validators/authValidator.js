const { z } = require("zod");
const signupSchema = z.object({
    name : z.string().trim().min(3, "Name must be atleast 3 characters").max(50, "Name cannot exceed 50 characters"),
    email : z.string().trim().email("Please enter the vaild email").transform((email)=>email.toLowerCase().trim()),
    password : z.string().min(8, "Password must be atleast 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).+$/, "Password must contain uppercase, lowercase, number and a special character"),
    profilePhoto : z.string().optional()

});

const verifyOtpSchema = z.object({
    email : z.email("please enter a valid email"),
    otp : z.string().length(6, "OTP must be exactly 6 digits"),
});

const loginSchema = z.object({
    email : z.string().trim().email().transform((email)=> email.toLowerCase()),
    password : z.string(),
});

const deleteAccountSchema = z.object({
    password : z.string().min(6),
});

const changePasswordSchema = z.object({
    oldPassword : z.string().min(1, "Old Password is Required"),
    newPassword : z.string().min(8, "Password must be atleast 8 characters")
                            .regex(/[A-Z]/, "Must contain an uppercase letter")
                            .regex(/[a-z]/,"Must contain at least one lowercase letter")
                            .regex(/[0-9]/, "Must contain atlest one number")
                            .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character"),
    confirmPassword : z.string(),
}).refine(
    (data)=>data.newPassword===data.confirmPassword,
    {
        message : "Password do not match",
        path :["confirmPassword"],
    }
);

const forgotPasswordSchema = z.object({
    email : z.string().trim().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email"),

        otp: z
            .string()
            .length(6, "OTP must be 6 digits"),

        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[a-z]/, "Must contain a lowercase letter")
            .regex(/[0-9]/, "Must contain a number")
            .regex(/[^A-Za-z0-9]/, "Must contain a special character"),

        confirmPassword: z.string(),
    }).refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

const resendOTPSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email"),
});

module.exports = {
    signupSchema,
    verifyOtpSchema,
    loginSchema,
    deleteAccountSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    resendOTPSchema,
};