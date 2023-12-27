import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
require('dotenv').config()

const accessSecret = process.env.ACCESS_TOKEN_SECRET
const refreshSecret = process.env.REFRESH_TOKEN_SECRET

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'] || req.headers['Authorization']
    if (!header) {
        return next(createHttpError.Unauthorized())
    }
    const token = Array.isArray(header) ? header[0].split(' ')[1] : header.split(' ')[1]

    if (accessSecret) {
        jwt.verify(token, accessSecret, (err, payload) => {
            if (err) {
                return next(createHttpError.Unauthorized(err.message))
            }
            req.jwtaccess = payload
            next()
        })
    } else {
        return next(createHttpError.InternalServerError('Access Token Not Found'))

    }
}

export function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {

    const cookies = req.cookies
    console.log(cookies);

    if (!cookies?.jwt) {
        return next(createHttpError.Unauthorized())
    }
    const token = cookies.jwt

    if (refreshSecret) {
        jwt.verify(token, refreshSecret, async (err: any, decodedToken: any) => {
            if (err) {
                return next(createHttpError.Unauthorized())
            }
            req.jwtrefresh = decodedToken.aud
            next()
        })
    } else {
        return next(createHttpError.InternalServerError('Access Token Not Found'))

    }
}
// const findUser = await User.findById(decodedToken.audience)
// if(!findUser){
//     return next(createHttpError.Unauthorized())
// }

// const newAccessToken = await signAccessToken(findUser._id.toString())