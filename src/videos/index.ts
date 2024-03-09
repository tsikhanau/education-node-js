import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findVideoController} from './findVideoController'
import {deleteVideoController} from "./deleteVideoController";
import {updateVideoController} from "./updateVideoController";
import {getPostController} from "../posts/getPostsControler";
import {createPostController} from "../posts/createPostController";
import {findPostController} from "../posts/findPostControler";
import {deletePostController} from "../posts/deletePostController";
import {updatePostController} from "../posts/updatePostController";
import {getBlogsController} from "../blogs/getBlogsControler";
import {createBlogController} from "../blogs/createPostController";
import {findBlogController} from "../blogs/findBlogControler";
import {deleteBlogController} from "../blogs/deleteBlogController";
import {updateBlogController} from "../blogs/updateBlogController";
import {inputCheckErrorsMiddleware, postInputValidator} from "../posts/middlewares";

export const videosRouter = Router()
export const postsRouter = Router()
export const blogsRouter = Router()

//
videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id', updateVideoController)

postsRouter.get('/', getPostController)
postsRouter.post('/', ...postInputValidator, inputCheckErrorsMiddleware, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', deletePostController)
postsRouter.put('/:id', ...postInputValidator, inputCheckErrorsMiddleware, updatePostController)

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', createBlogController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.delete('/:id', deleteBlogController)
blogsRouter.put('/:id', updateBlogController)
