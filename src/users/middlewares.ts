import {body} from 'express-validator'

const userLoginValidator = body('login')
    .isString().withMessage('not string')
    .trim().isLength({min: 3, max: 10}).withMessage('incorrect length')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('incorrect format')

const userEmailValidator = body('login')
    .isString().withMessage('not string')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('incorrect format')

const userPasswordValidator = body('login')
    .isString().withMessage('not string')
    .trim().isLength({min: 6, max: 20}).withMessage('incorrect length')

export const userInputValidator = [
    userLoginValidator,
    userEmailValidator,
    userPasswordValidator
]
