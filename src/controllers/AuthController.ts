import express, { request, response } from "express";
import jwt from "jsonwebtoken";
import HashService from "../services/HashService";
import Users from "../models/users";
import PasswordResetCode from "../models/password-reset-codes";
import dotenv from "dotenv";
import { sendEmail } from "../services/NodeMailer";

dotenv.config({ path: "./env/.env" });

class AuthController {
    public static async register(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        const { name, email, password, profile_picture } = req.body;
        try {
            const existingUser = await Users.findOne({
                where: { email: email },
            });
            const isName = await Users.findOne({ where: { name: name } });
            if (existingUser) {
                res.status(400).json({
                    message: "This email has been registered",
                    statusCode: 400,
                });
                return;
            }
            if (isName) {
                res.status(400).json({
                    message: "This name already exists!",
                    statusCode: 400,
                });
                return;
            }
            const pass_hash = await HashService.hashPassword(password);
            const user = await Users.create({
                name,
                email,
                password: pass_hash,
                profile_picture,
                created_at: new Date(),
            });
            const resUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                profile_picture: user.profile_picture,
                created_at: user.created_at,
            };
            res.status(200).json({
                message: "Successfully created users",
                user: resUser,
            });
            return;
        } catch (err) {
            res.status(500).json({
                message: "Server error!",
                err,
                statusCode: 500,
            });
            return;
        }
    }

    public static async login(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter a valid email address and password",
                statusCode: 400,
            });
            return;
        }
        try {
            const user = await Users.findOne({ where: { email: email } });
            if (!user) {
                res.status(401).json({
                    message: "This account does not exist!",
                    statusCode: 401,
                });
                return;
            }
            const isPass = await HashService.comparePassword(
                password,
                user.password
            );
            if (!isPass) {
                res.status(401).json({
                    message: "The password you entered is incorrect!",
                    statusCode: 401,
                });
                return;
            }
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
                }
            );
            res.status(200).json({
                message: "Login successful!",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    profile_picture: user.profile_picture,
                    created_at: user.created_at,
                },
                token: token,
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: "Server error!",
                error,
                statusCode: 500,
            });
            return;
        }
    }

    public static async sendResetCode(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        const { mail } = req.body;
        console.log(mail);
        const generatedCode = Math.floor(10000 + Math.random() * 90000);
        try {
            const user = await Users.findOne({ where: { email: mail } });

            if (!user) {
                res.status(404).json({
                    message: "This email is not registered!",
                    statusCode: 404,
                });
                return;
            }
            const dataBoardPasswordResetCode = {
                user_id: user.id,
                code: generatedCode.toString(),
                expiry_time: new Date(Date.now() + 5 * 60 * 1000),
            };
            const findData = await PasswordResetCode.findOne({
                where: {
                    user_id: user.id,
                },
            });
            if (findData) {
                await findData.update(dataBoardPasswordResetCode);
            } else {
                await PasswordResetCode.create(dataBoardPasswordResetCode);
            }

            const propsSendMail = {
                to: mail,
                subject: "Reset Password",
                text: `Your reset password confirmation code is: ${dataBoardPasswordResetCode.code}. The code will expire in 5 minutes.`,
            };

            await sendEmail(
                propsSendMail.to,
                propsSendMail.subject,
                propsSendMail.text
            );

            res.status(200).json({
                message:
                    "Reset code sent to your email address. Please check your inbox!",
                statusCode: 200,
                toMail: mail,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error!",
                statusCode: 500,
            });
        }
    }

    public static async resetPassword(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            res.status(400).json({
                message: "Email, code, and new password are required!",
                statusCode: 400,
            });
            return;
        }
        try {
            const user = await Users.findOne({ where: { email } });
            const dataBoardPasswordResetCode =
                user &&
                (await PasswordResetCode.findOne({
                    where: {
                        user_id: user.id,
                    },
                }));
            if (dataBoardPasswordResetCode) {
                const due_date =
                    dataBoardPasswordResetCode.expiry_time.getTime();
                const codeV = parseInt(dataBoardPasswordResetCode.code);
                if (due_date < Date.now()) {
                    res.status(400).json({
                        message:
                            "The confirmation code has expired. Please request a new one.",
                        statusCode: 400,
                    });
                    return;
                }

                if (codeV !== code) {
                    res.status(401).json({
                        message: "Invalid confirmation code!",
                        statusCode: 401,
                    });
                    return;
                }

                if (!user) {
                    res.status(404).json({
                        message: "This email is not registered!",
                        statusCode: 404,
                    });
                    return;
                }
                user.password = await HashService.hashPassword(newPassword);
                await user.save();
                res.status(200).json({
                    message: "Password has been reset successfully!",
                    statusCode: 200,
                });
                await dataBoardPasswordResetCode.destroy();
            } else {
                res.status(400).json({
                    message: "Unknown Error!",
                    statusCode: 400,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error!",
                statusCode: 500,
            });
        }
    }
}

export default AuthController;
