const {
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
} = require("../service/authService");


const signup = async (req, res)=>{
    try{
        const response = await signupService(req.body);
        return res.status(response.statusCode).json({
            success : response.success,
            message : response.message
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
};

const verifyOtp = async(req, res)=>{
    try{
        const response = await verifyOtpService(req.body);
        return res.status(response.statusCode).json({
            success : response.success,
            message : response.message,
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        });
    }
}

const login = async(req, res)=>{
    try{
        const response = await loginService(req.body);

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: response.success,
                message: response.message,
                needsVerification: response.needsVerification,
            });
        }
        res.cookie("token", response.token,{
            httpOnly : true,
            secure : process.env.NODE_ENV==="production",
            sameSite : "lax",
            maxAge : process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
            path : "/",
        });

        return res.status(response.statusCode).json({
            success : true,
            message : response.message,
            user : response.user,
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        });
    }
}

const logout = async(req, res)=>{
    try{
        res.clearCookie("token",{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            path : "/"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : "false",
            message : "Internal Server Error",
        });
    }
}

const getProfile = async (req, res) => {
    try {
        const response = await getProfileService(req.user);
        return res.status(response.statusCode).json({
            success: response.success,
            user: response.user,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const response = await updateProfileService(
            req.body,
            req.user
        );

        return res.status(response.statusCode).json({
            success: response.success,
            message: response.message,
            user: response.user,
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deleteAccount = async (req, res) => {

    try {

        const response = await deleteAccountService(
            req.user,
            req.body.password
        );

        if (!response.success) {
            return res.status(response.statusCode).json({
                success: false,
                message: response.message,
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

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

const changePassword = async(req, res)=>{
    try{
        const response = await changePasswordService(req.user, req.body);
        if(!response.success){
            return res.status(response.statusCode).json({
                success : false,
                message : response.message,
            });
        }

        res.clearCookie("token",{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            path : "/",
        });

        return res.status(response.statusCode).json({
            success : true,
            message : response.message,
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }

}

const forgotPassword = async(req, res)=>{
    try{
        const response = await forgotPasswordService(req.body);

        return res.status(response.statusCode).json({
            success: response.success,
            message: response.message,
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const resetPassword = async(req,res)=>{
    try{
        const response = await resetPasswordService(req.body);

        return res.status(response.statusCode).json({
            success : response.success,
            message : response.message,
        });

    }catch(err){
        console.error(err);

        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        });
    }
};

const resendOTP = async(req,res)=>{
    try{

        const response = await resendOTPService(req.body);

        return res.status(response.statusCode).json({
            success: response.success,
            message: response.message,
        });

    }catch(err){

        console.error(err);

        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        });

    }
}

module.exports = {
    signup,
    verifyOtp,
    login,
    logout,
    getProfile,
    updateProfile,
    deleteAccount,
    changePassword,
    forgotPassword,
    resetPassword,
    resendOTP,
}