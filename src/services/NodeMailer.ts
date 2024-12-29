import nodemailer from "nodemailer";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
dotenv.config();
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
