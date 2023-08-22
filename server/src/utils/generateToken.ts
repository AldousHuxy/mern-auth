import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (res: Response, userId: Types.ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 40 * 60
    })
}