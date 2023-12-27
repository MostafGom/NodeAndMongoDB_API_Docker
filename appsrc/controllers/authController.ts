import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { signAccessToken, signRefreshToken } from '../helpers/jwtMethods';
import { loginValidation } from '../helpers/validation';

require('dotenv').config();

import User from '../models/User';


const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const validation = loginValidation({ email, password })
    if (validation.error) {
        return next(createError(400, { message: 'Invalid Data', details: validation.error.details[0].message }));
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        return next(createError(401, { message: 'Unauthorized user does not exist', details: 'you need to register' }));
    }

    try {
        const match = await bcrypt.compare(password, findUser.password);

        if (!match) {
            throw createError.Unauthorized('email/password not valid')
        }
        const accessToken = await signAccessToken(findUser._id.toString())
        const refreshToken = await signRefreshToken(findUser._id.toString())

        res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none" })

        res.status(200).json({
            'message': 'user logged in successfully',
            'data': { "accessToken": accessToken }
        })

    } catch (error: any) {
        console.log(error.message);

        return next(createError.InternalServerError());
        // res.status(500).json({ 'message': error.message })
    }
}

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshJwt = req.jwtrefresh
    console.log(refreshJwt);

    const findUser = await User.findById(refreshJwt);

    if (!findUser) {
        return next(createError(401, { message: 'Unauthorized user does not exist', details: 'you need to register' }));
    }

    try {
        const accessToken = await signAccessToken(findUser._id.toString())
        const refreshToken = await signRefreshToken(findUser._id.toString())

        res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none" })

        res.status(200).json({
            'message': 'new access token generated',
            'data': { "accessToken": accessToken }
        })
    } catch (error: any) {
        return next(createError.InternalServerError());
    }
}

export default {
    handleRefreshToken,
    handleLogin,
}