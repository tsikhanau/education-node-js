import {Response, Request, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'
import {blogRepository} from "../blogs/blogRepository";
import {FieldValidationError} from "express-validator/src/base";
import {SETTINGS} from "../settings";

const postTitleInputValidator = body('title')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('incorrect length')
const postDescriptionInputValidator = body('shortDescription')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('incorrect length')
const postContentInputValidator = body('content')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('incorrect length')

export const postInputValidator = [
    postTitleInputValidator,
    postDescriptionInputValidator,
    postContentInputValidator,
    body('blogId').custom(async (blogId, { req }) => {
        const blog = await blogRepository.find(blogId)
        if (!blog) { throw new Error('no blog!') }
    }),
]

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)
    const errors = e.array({ onlyFirstError: true }) as FieldValidationError[]
    if (errors.length) {
        res.status(400).json({errorsMessages: errors.map(({path, msg}) => ({field: path, message: msg}))})
        return
    }

    next()
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorisation'] as string
    if (!auth) {
        res
            .status(401)
            .json({})
        return
    }
    const buff = Buffer.from(auth.slice(6), 'base64')
    const decodedAuth = buff.toString('utf8')

    const buff2 = Buffer.from(SETTINGS.ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
    if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== 'Basic ') {
        res
            .status(401)
            .json({})
        return
    }

    next()
}