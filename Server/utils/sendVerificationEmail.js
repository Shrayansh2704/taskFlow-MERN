const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    },
});

const sendEmail = async (email, otp)=>{
    const mailOptions = {
        from : `"Todo App"<${process.env.EMAIL_USER}>`,
        to : email,
        subject : "Verify Your Email - Todo App>",

        html : `
            <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
                <h2 style="color:#4F46E5;">Welcome to Todo App 🎉</h2>

                <p>Thank you for signing up.</p>

                <p>Your verification OTP is:</p>

                <h1 style="text-align:center; letter-spacing:8px; color:#2563EB;">
                    ${otp}
                </h1>

                <p>This OTP is valid for <b>5 minutes</b>.</p>

                <hr>

                <p style="font-size:13px;color:gray;">
                    If you didn't request this email, you can safely ignore it.
                </p>
            </div>
        `,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;