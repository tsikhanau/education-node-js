
import {body} from 'express-validator'

export const commentContentValidator = body('content')
.isString().withMessage('not string')
.trim().isLength({min: 20, max: 300}).withMessage('incorrect length')