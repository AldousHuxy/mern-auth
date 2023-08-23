import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { Game } from '../models/gameModel';

// @desc    Retrieve video games
// route    GET /api/games
// @access  Public
export const getAllGames = asyncHandler(async (req: Request, res: Response) => {
    try {
        const games = await Game.find()
        res.json(games)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})