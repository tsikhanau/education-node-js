import {Router} from 'express'
import {getBlogsController} from "../blogs/getBlogsControler";
import {createBlogController} from "./createBlogController";
import {findBlogController} from "../blogs/findBlogControler";
import {deleteBlogController} from "../blogs/deleteBlogController";
import {updateBlogController} from "../blogs/updateBlogController";
import {blogInputValidator, blogPostInputValidator} from "./middlewares";
import {authMiddleware, inputCheckErrorsMiddleware} from "../posts/middlewares";
import {createBlogPostController} from "./createBlogPostControleer";
export const blogsRouter = Router()

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', authMiddleware, ...blogInputValidator, inputCheckErrorsMiddleware, createBlogController)
blogsRouter.post('/:blogId/posts', authMiddleware, ...blogPostInputValidator, inputCheckErrorsMiddleware, createBlogPostController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogController)
blogsRouter.put('/:id', authMiddleware, ...blogInputValidator, inputCheckErrorsMiddleware, updateBlogController)
