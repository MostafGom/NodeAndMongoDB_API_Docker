import { Router } from "express";
import express from 'express';
const router: Router = express.Router()
import path from 'path';

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

export default router