import { NextFunction, Request, Response } from "express";

import bcrypt from 'bcrypt';
import User from '../models/User';
import createError from 'http-errors';
import { regsiterValidation } from '../helpers/validation';
import { logEvents } from '../middleware/logEvents'

const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    const validation = regsiterValidation({ firstname, lastname, email, password, confirmpassword })

    if (validation.error) {
        // return next(createError(400, 'Invalid Data', validation.error.details[0]))
        return next(createError(400, { message: 'Invalid Data', details: validation.error.details[0] }));

    }

    const userDataObj = validation.value


    try {
        const ifUserInDB = await User.findOne({ email: userDataObj.email })

        if (ifUserInDB) {
            return next(createError(400, 'Email Already Registered'))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userDataObj.password, salt);

        const newUser = await new User({
            firstname: userDataObj.firstname,
            lastname: userDataObj.lastname,
            email: userDataObj.email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(201).json({
            'message': 'user registered',
            'data':
            {
                'userid': newUser._id, 'useremail': newUser.email,
                'firstname': newUser.firstname, 'lastname': newUser.lastname
            }
        })


    } catch (error: any) {
        let erroname = error?.name || 'Unknown Error Name'
        let erromsg = error?.message || 'Internal Server Error'
        logEvents(`${erroname} : ${erromsg}`, 'errorlog.txt')
        return createError(500, erromsg)
    }
}

export default {
    handleRegister
}
