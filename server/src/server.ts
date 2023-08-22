import dotenv from 'dotenv';
import express, { json, Application, Request, Response, urlencoded } from 'express';
import { connect, connection } from 'mongoose'
import { router as userRoutes } from './routes/userRoutes';
import { logger } from './middleware/logger';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';

// Setup environment variables
dotenv.config()

// Setup express application
const app: Application = express()

// Setup mongodb connection w/ mongoose
connect(process.env.DATABASE_URL as string)
const db = connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// Middleware
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(logger)

// User Routes
app.use('/api/users', userRoutes)

// [GET] Server ready message
app.get('/api', (req: Request, res: Response) => res.send({ message: 'Server is ready' }))

app.use(notFound)
app.use(errorHandler)

// Start express server
const port: string|number = process.env.PORT || 7002
app.listen(port, () => console.log(`server started on port ${port}`))