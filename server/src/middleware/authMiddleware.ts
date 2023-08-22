import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';

interface IProtectRequest extends Request { user }
interface JwtPayload { userId: string }

export const protect = asyncHandler(async (req: IProtectRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

            let foundUser = await User.findById(decoded.userId).select('-password')
            req.user = foundUser
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})