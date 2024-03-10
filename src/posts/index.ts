import {Router} from 'express'
import {getPostController} from "../posts/getPostsControler";
import {createPostController} from "../posts/createPostController";
import {findPostController} from "../posts/findPostControler";
import {deletePostController} from "../posts/deletePostController";
import {updatePostController} from "../posts/updatePostController";
import {authMiddleware, inputCheckErrorsMiddleware, postInputValidator} from "../posts/middlewares";

export const postsRouter = Router()

postsRouter.get('/', getPostController)
postsRouter.post('/', authMiddleware, ...postInputValidator, inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', authMiddleware, deletePostController)
postsRouter.put('/:id', authMiddleware, ...postInputValidator, inputCheckErrorsMiddleware, updatePostController)
