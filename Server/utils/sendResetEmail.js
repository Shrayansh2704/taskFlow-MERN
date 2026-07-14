const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendResetPasswordEmail = async (email, account, otp) => {
    const mailOptions = {
        from: `"Todo App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password | Todo App",

        html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; padding:30px; border:1px solid #e5e7eb; border-radius:12px;">

            <h2 style="color:#2563EB; text-align:center;">
                🔐 Reset Your Password
            </h2>

            <p>Hello,</p>

            <p>
                We received a request to reset your password for your
                <b>Todo App</b> account.
            </p>

            <p>
                Use the following One-Time Password (OTP) to continue:
            </p>

            <div style="
                background:#f3f4f6;
                padding:18px;
                text-align:center;
                border-radius:8px;
                margin:25px 0;
            ">
                <span style="
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:10px;
                    color:#2563EB;
                ">
                    ${otp}
                </span>
            </div>

            <p>
                This OTP will expire in <b>10 minutes</b>.
            </p>

            <p>
                For your security, never share this OTP with anyone.
            </p>

            <hr style="margin:30px 0;">

            <p style="font-size:13px; color:#6b7280;">
                If you didn't request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
            </p>

            <p style="font-size:12px; color:#9ca3af; text-align:center;">
                © ${new Date().getFullYear()} Todo App
            </p>

        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendResetPasswordEmail;