import {Router} from 'express'
import {authMiddleware} from "../posts/middlewares";
import {createUserController} from "./createUserController";
import {deleteUserController} from "./deleteUserController";
import {userInputValidator} from "./middlewares";
import {getUsersController} from "./getUsersController";

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', authMiddleware, ...userInputValidator, createUserController)
usersRouter.delete('/:id', authMiddleware, deleteUserController)