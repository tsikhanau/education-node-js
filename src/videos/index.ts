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

export const videosRouter = Router()
export const postsRouter = Router()
//
videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id', updateVideoController)

postsRouter.get('/', getPostController)
postsRouter.post('/', createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', deletePostController)
postsRouter.put('/:id', updatePostController)
