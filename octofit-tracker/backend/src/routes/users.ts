import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from '../controllers/userController';

const router = express.Router();

// User profile routes
router.get('/:id', getUserProfile);
router.patch('/:id', updateUserProfile);
router.delete('/:id', deleteUserAccount);

export default router;