import { Router } from "express";
import express from 'express';
const router: Router = express.Router()
import { verifyRefreshToken } from "../middleware/verifyTokens";
import loginController from '../controllers/authController';


router.post('/', loginController.handleLogin)
router.get('/refresh', verifyRefreshToken, loginController.handleRefreshToken)

export default router