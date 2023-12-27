import { NextFunction, Request, Response } from "express";

import User from '../models/User';
import createError from 'http-errors';


const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.jwtaccess.aud);
        if (user.role !== 'admin') {
            throw createError.Unauthorized('Unauthorized')
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default checkAdmin