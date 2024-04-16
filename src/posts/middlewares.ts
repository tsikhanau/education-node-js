import {Response, Request, NextFunction} from 'express'
import {body, validationResult} from 'express-validator'
import {FieldValidationError} from "express-validator/src/base";
import {SETTINGS} from "../settings";
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {jwtService} from "../helpers/jwt.service";

export const postTitleInputValidator = body('title')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('incorrect length')
export const postDescriptionInputValidator = body('shortDescription')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('incorrect length')
export const postContentInputValidator = body('content')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('incorrect length')

export const postInputValidator = [
    postTitleInputValidator,
    postDescriptionInputValidator,
    postContentInputValidator,
    body('blogId').custom(async (blogId, { req }) => {
        const blog = await blogCollection.findOne({_id: new ObjectId(blogId)})
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
    const auth = req.headers.authorization as string
    if (!auth) {
        res
            .status(401)
            .json({})
        return
    }

    const buff = Buffer.from(auth.slice(6), 'base64')
    const decodedAuth = buff.toString('utf8')

    if (decodedAuth !== SETTINGS.ADMIN_AUTH || auth.slice(0, 5) !== 'Basic') {
        res
            .status(401)
            .json({})
        return
    }

    next()
}

export const authJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string
    if (!authHeader) {
        res
            .status(401)
            .json({})
        return
    }
    const auth = authHeader.split(" ");
    const token = auth[1];
    try {
        const result = await jwtService.verifyToken(token);
        // @ts-ignore
        req.userId = result.userId as string;
    } catch {
        res.status(401)
            .json({})
    }

    next()
}

