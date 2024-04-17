import {Router} from "express";
import {findCommentController} from "./findCommentController";
import {deleteCommentController} from "./deleteCommentController";
import {authJWTMiddleware, inputCheckErrorsMiddleware} from "../posts/middlewares";
import {commentContentValidator} from "./middlewares";
import {updateCommentController} from "./updateCommentController";

export const commentRouter = Router()

commentRouter.get('/:id', findCommentController);
commentRouter.delete('/:id', authJWTMiddleware, deleteCommentController);
commentRouter.put('/:id', authJWTMiddleware, commentContentValidator, inputCheckErrorsMiddleware, updateCommentController);


