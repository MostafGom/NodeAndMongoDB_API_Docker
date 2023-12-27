import { UserLoginData, UserRegisterData } from "../types/global";

const Joi = require('joi')

export const regsiterValidation = (data: UserRegisterData) => {
    const schema = Joi.object({
        firstname: Joi.string().required().alphanum().min(3).max(15),
        lastname: Joi.string().required().alphanum().min(3).max(15),
        email: Joi.string().required().email().max(60),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmpassword: Joi.ref('password'),
    })
    // console.log(schema.validate(data));

    return schema.validate(data);
}

export const loginValidation = (data: UserLoginData) => {
    const schema = Joi.object({
        email: Joi.string().required().email().max(60),
        password: Joi.string().required()
    })

    return schema.validate(data);
}

