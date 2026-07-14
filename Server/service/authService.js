const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendVerificationEmail");
const Todo = require("../models/Todo");
const generateToken = require("../utils/generateToken");
const sendResetEmail = require("../utils/sendResetEmail");


const signupService = async (userData)=>{
    const {name, email, password, profilePhoto} = userData;
    const existingUser = await User.findOne({ email });

if (existingUser) {

    if (!existingUser.isVerified) {

        const otp = generateOTP();

        existingUser.otp = otp;
        existingUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        try {

            await sendEmail(email, otp);

        } catch (err) {

            console.error(err);

            return {
                success: false,
                statusCode: 500,
                message: "Unable to send OTP. Please try again.",
            };

        }

        await existingUser.save();

        return {
            success: true,
            statusCode: 200,
            message: "Account already exists. A new OTP has been sent.",
        };

    }

    return {
        success: false,
        statusCode: 409,
        message: "User already registered.",
    };

}
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5*60*1000);
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        profilePhoto,
        otp,
        otpExpires
    });
    try{
        await sendEmail(email, otp);
    }catch(err){
        console.error("Email error : ", err);

        return {
            success : false,
            statusCode : 500,
            message : "Account created, but OTP could not be sent , Please try again."
        }
    }

    return {
        success : true,
        statusCode : 201,
        message : "OTP Sent successfully. Please verify your email"
    };
};

const verifyOtpService = async (userData)=>{
    const{ email, otp} = userData;

    const user = await User.findOne({ email });

    if(!user){
        return{
            success : false,
            statusCode : 404,
            message : "User not found",
        };
    }

    if(user.isVerified){
        return{
            success: false,
            statusCode: 400,
            message: "Email is already verified.",
        };
    }

    if(user.otp!==otp){
        return{
            success : false,
            statusCode : 400,
            message : "Invalid OTP",
        };
    }

    if(user.otpExpires < new Date()){
        return{
            success : false,
            statusCode : 400,
            message : "OTP has expired"
        };
    }

    user.isVerified = true;

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return{
        success : true,
        statusCode : 200,
        message : "Email verified successfully,",
    };
};

const loginService = async (userData) => {

    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user) {

        return {
            success: false,
            statusCode: 404,
            message: "Invalid Credentials",
        };

    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {

        return {
            success: false,
            statusCode: 401,
            message: "Invalid Credentials",
        };

    }

    if (!user.isVerified) {

        const otp = generateOTP();

        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        try {

            await sendEmail(email, otp);

        } catch (err) {

            console.error(err);

            return {
                success: false,
                statusCode: 500,
                message: "Unable to send verification OTP.",
            };

        }

        await user.save();

        return {
            success: false,
            statusCode: 401,
            message: "Please verify your email first.",
            needsVerification: true,
        };

    }

    const token = generateToken(user._id);

    const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
    };

    return {
        success: true,
        statusCode: 200,
        message: "Login Successful",
        token,
        user: userResponse,
    };

};

const getProfileService = async(user)=>{
    return {
        success: true,
        statusCode: 200,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        },
    };
};

const updateProfileService = async (profileData, user) => {

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        profileData,
        {
            new: true,
            runValidators: true,
        }
    );

    return {
        success: true,
        statusCode: 200,
        message: "Profile updated successfully",
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profilePhoto: updatedUser.profilePhoto,
            isVerified: updatedUser.isVerified,
        },
    };
};

const deleteAccountService = async (user, password) => {

    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isPasswordCorrect) {
        return {
            success: false,
            statusCode: 401,
            message: "Incorrect password",
        };
    }

    await Todo.deleteMany({
        owner: user._id,
    });

    await User.findByIdAndDelete(user._id);

    return {
        success: true,
        statusCode: 200,
        message: "Account deleted successfully",
    };

};

const changePasswordService = async(user, passwordData)=>{
    const {
        oldPassword,
        newPassword,
    } = passwordData;

    const existingUser = await User.findById(user._id);
    if(!existingUser){
        return{
            success : false,
            statusCode : 404,
            message : "User not found",
        };
    }

    const isOldPassword = await bcrypt.compare(oldPassword, existingUser.password);
    if(!isOldPassword){
        return {
            success : false,
            statusCode : 401,
            message : "Old Password is incorrect",
        };
    }

    const isSamePassword = await bcrypt.compare(newPassword, existingUser.password);
    if(isSamePassword){
        return {
            success: false,
            statusCode: 400,
            message: "New password must be different from the old password",
        };
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    return {
        success: true,
        statusCode: 200,
        message: "Password changed successfully. Please login again.",
    };
}   

const forgotPasswordService = async (userData) => {

    const { email } = userData;

    const user = await User.findOne({ email });

    if (!user) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendResetEmail(email, user.name, otp);

    return {
        success: true,
        statusCode: 200,
        message: "Password reset OTP sent successfully.",
    };

};

const resetPasswordService = async(userData)=>{

    const {
        email,
        otp,
        newPassword,
    } = userData;

    const user = await User.findOne({ email });

    if(!user){
        return{
            success : false,
            statusCode : 404,
            message : "User not found",
        };
    }

    if(user.otp !== otp){
        return{
            success : false,
            statusCode : 400,
            message : "Invalid OTP",
        };
    }

    if(user.otpExpires < Date.now()){
        return{
            success : false,
            statusCode : 400,
            message : "OTP has expired",
        };
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);

    user.password = hashedPassword;

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return{
        success : true,
        statusCode : 200,
        message : "Password reset successfully.",
    };

};

const resendOTPService = async(userData)=>{

    const { email } = userData;

    const user = await User.findOne({ email });

    if(!user){
        return{
            success:false,
            statusCode:404,
            message:"User not found",
        };
    }

    if(user.isVerified){
        return{
            success:false,
            statusCode:400,
            message:"Email is already verified.",
        };
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmail(
        email,
        user.name,
        otp
    );

    return{
        success:true,
        statusCode:200,
        message:"OTP sent successfully.",
    };

}

module.exports = {
    signupService,
    verifyOtpService,
    loginService,
    getProfileService,
    updateProfileService,
    deleteAccountService,
    changePasswordService,
    forgotPasswordService,
    resetPasswordService,
    resendOTPService,
}