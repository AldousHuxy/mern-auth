import express from 'express';
import { getAllGames } from '../controllers/gameController';

export const router = express.Router()

router.get('/', getAllGames)