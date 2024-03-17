import {body} from 'express-validator'
import {postContentInputValidator, postDescriptionInputValidator, postTitleInputValidator} from "../posts/middlewares";

const blogNameInputValidator = body('name')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 15}).withMessage('incorrect length')
const blogDescriptionInputValidator = body('description')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 500}).withMessage('incorrect length')
const blogWebsiteUrlInputValidator = body('websiteUrl')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('incorrect length')
    .trim().isURL().withMessage('incorrect format')

export const blogInputValidator = [
    blogNameInputValidator,
    blogDescriptionInputValidator,
    blogWebsiteUrlInputValidator,
]

export const blogPostInputValidator = [
    postTitleInputValidator,
    postDescriptionInputValidator,
    postContentInputValidator,
]