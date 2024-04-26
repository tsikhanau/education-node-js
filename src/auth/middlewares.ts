import {body} from 'express-validator'
import {ObjectId} from "mongodb";

import {userRepository} from "../users/userReposetory";

export const postRegistrationConfirmationValidator = body('code').custom(async (code) => {
    const userId = await userRepository.findByCode(code);
    if(!userId) {throw new Error('incorrect code')}
    const userDetails = await userRepository.findRegistered(new ObjectId(userId));
    if(userDetails?.isConfirmed) {throw new Error('already applied')}
    const isExpired = (userDetails?.confirmationCodeExpirationDate || '0') < new Date().toISOString();
    if(isExpired) {throw new Error('expired')}
})

export const postRegistrationEmailResendingValidator = body('email')
    .isString().withMessage('not string')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('incorrect format')
    .custom(async (email) => {
        const user = await userRepository.findByLoginOrEmail(email);
        if(!user) {throw new Error('incorrect email')}
        if(user?.isConfirmed) {throw new Error('already applied')}
})

export const postRegistrationEmailValidator = body('email')
    .isString().withMessage('not string')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('incorrect format')
    .custom(async (email) => {
        const user = await userRepository.findByLoginOrEmail(email);
        if(user) {throw new Error('existed')}
})

export const postRegistrationLoginValidator = body('login')
    .isString().withMessage('not string')
    .trim().isLength({min: 3, max: 10}).withMessage('incorrect length')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('incorrect format')
    .custom(async (login) => {
        const user = await userRepository.findByLoginOrEmail(login);
        if(user) {throw new Error('existed')}
})

export const postRegistrationPasswordValidator = body('password')
    .isString().withMessage('not string')
    .trim().isLength({min: 6, max: 20}).withMessage('incorrect length')