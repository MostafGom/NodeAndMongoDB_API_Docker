import jwt, { SignCallback } from 'jsonwebtoken';
import createError from 'http-errors';
import { logEvents } from '../middleware/logEvents';
require('dotenv').config()

const accessSecret = process.env.ACCESS_TOKEN_SECRET
const refreshSecret = process.env.REFRESH_TOKEN_SECRET

export function signAccessToken(userId: string) {
    return new Promise((resolve, reject) => {
        const payload = {}
        const options = {
            expiresIn: "15s",
            audience: userId
        }
        if (accessSecret) {

            jwt.sign(payload, accessSecret, options, (err: any, token: any) => {
                if (err) {
                    console.error(err);
                    logEvents(`${err.name} : ${err.message}`, 'errorlog.txt');
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        } else {
            reject(createError.InternalServerError('Access Token Not Found'))
        }
    })
}

export function signRefreshToken(userId: string) {
    return new Promise((resolve, reject) => {
        const payload = {}

        const options = {
            expiresIn: "1d",
            audience: userId
        }
        if (refreshSecret) {
            jwt.sign(payload, refreshSecret, options, (err, token) => {
                if (err) {
                    console.error(err);
                    logEvents(`${err.name} : ${err.message}`, 'errorlog.txt');
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        } else {
            reject(createError.InternalServerError('Access Token Not Found'))
        }
    })
}

