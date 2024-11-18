import express, {request, response} from "express";
import jwt from 'jsonwebtoken'
import HashService from "../services/HashService";
import Users from "../models/users";
import dotenv from "dotenv";

dotenv.config({path: './env/.env'});

class AuthController {
    public static async register(req: express.Request, res: express.Response) : Promise<void> {
        const {name, email, password, profile_picture, create_at} = req.body;
        try {
            const existingUser = await Users.findOne({where: {email: email}})
            const isName = await  Users.findOne({where: {name: name}})
            if(existingUser) {
                res.status(400).json({
                    message: "This email has been registered",
                    statusCode: 400
                });
                return;
            }
            if(isName) {
                res.status(400).json({
                    message: "This name already exists!",
                    statusCode: 400
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
            })
            res.status(200).json({message: "Successfully created users",user: user});
            return;
        }
        catch(err) {
            res.status(500).json({
                message: "Server error!", err,
                statusCode: 500
            });
            return;
        }
    }

    public static async login(req: express.Request, res: express.Response): Promise<void> {
        const {email, password} = req.body;
        try {
            const user = await Users.findOne({where: {email: email}})
            if(!user) {
                res.status(401).json({
                    message: "This account does not exist!",
                    statusCode: 401
                });
                return
            }
            const isPass = await HashService.comparePassword(password, user.password);
            if(!isPass) {
                res.status(401).json({
                    message: "The password you entered is incorrect!",
                    statusCode: 401
                });
                return
            }
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d',
            });
            res.status(200).json({
                message: "Login successful!",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    profile_picture: user.profile_picture,
                    created_at: user.created_at,
                },
                token: token
            });
            return
        }
        catch (error) {
            res.status(500).json({
                message: "Server error!", error,
                statusCode: 500
            });
            return;
        }
    }
}

export default AuthController;