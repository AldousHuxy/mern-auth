import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res. statusCode === 2000 ? 500 : res.statusCode
    let message = err.message

    if (err.name === 'CastError' && err.kind === 'ObjectKind') {
        statusCode = 404
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}