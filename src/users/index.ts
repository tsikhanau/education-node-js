import {Router} from 'express'
import {authMiddleware, inputCheckErrorsMiddleware} from "../posts/middlewares";
import {createUserController} from "./createUserController";
import {deleteUserController} from "./deleteUserController";
import {userInputValidator} from "./middlewares";
import {getUsersController} from "./getUsersController";

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', authMiddleware, ...userInputValidator, inputCheckErrorsMiddleware, createUserController)
usersRouter.delete('/:id', authMiddleware, deleteUserController)