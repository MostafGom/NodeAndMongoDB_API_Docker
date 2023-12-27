import { Router } from "express";
import express from 'express';
const router: Router = express.Router()

import regsiterController from '../controllers/registerController';

router.post('/', regsiterController.handleRegister)

export default router;