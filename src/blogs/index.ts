import {Router} from 'express'
import {getBlogsController} from "../blogs/getBlogsControler";
import {createBlogController} from "../blogs/createPostController";
import {findBlogController} from "../blogs/findBlogControler";
import {deleteBlogController} from "../blogs/deleteBlogController";
import {updateBlogController} from "../blogs/updateBlogController";
import {blogInputValidator} from "./middlewares";
import {authMiddleware, inputCheckErrorsMiddleware} from "../posts/middlewares";
export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', ...blogInputValidator, inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.delete('/:id', deleteBlogController)
blogsRouter.put('/:id', ...blogInputValidator, inputCheckErrorsMiddleware, updateBlogController)
