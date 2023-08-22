import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userControllers';
import { protect } from '../middleware/authMiddleware';

export const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)