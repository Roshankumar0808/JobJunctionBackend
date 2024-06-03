import express from 'express';
import { register } from '../controllers/userController.js';
import { isAuthorized } from '../middlewares/auth.js';
const router=express.Router();
router.post("/register",register);
export default router;