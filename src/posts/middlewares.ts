import {Router, Response, Request, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'
import {blogRepository} from "../blogs/blogRepository";
import {FieldValidationError} from "express-validator/src/base";

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
        if (!blog) { new Error('no blog!') }
    }),
]

export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const e = validationResult(req)
    const errors = e.array() as FieldValidationError[]
    if (errors.length) {
        res.status(400).json(errors.map(({path, msg}) => ({id: path, msg})))
        return
    }

    next()
}