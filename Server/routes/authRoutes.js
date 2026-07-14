const express = require("express");

const validate = require("../middlewares/validate");
const {signupSchema, verifyOtpSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema, resendOTPSchema} = require("../validators/authValidator");
const {signup, verifyOtp, login, logout, getProfile, updateProfile, deleteAccount, changePassword, forgotPassword, resetPassword, resendOTP} = require("../controllers/authController");
const { updateProfileSchema } = require("../validators/userValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const { deleteAccountSchema } = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, validate(updateProfileSchema), updateProfile);
router.delete("/delete-account", authMiddleware, validate(deleteAccountSchema), deleteAccount);
router.patch("/change-password", authMiddleware, validate(changePasswordSchema),changePassword);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema),resetPassword);
router.post("/resend-otp", validate(resendOTPSchema), resendOTP);
module.exports = router;