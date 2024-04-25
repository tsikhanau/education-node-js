import express from 'express'
import {SETTINGS} from "./settings";
import {videosRouter} from "./videos";
import {setDB} from "./db/db";
import {postsRouter} from "./posts";
import {blogsRouter} from "./blogs";
import {usersRouter} from "./users";
import {authService} from "./users/authService";
import {authInputValidator} from "./users/middlewares";
import {authJWTMiddleware, inputCheckErrorsMiddleware} from "./posts/middlewares";
import {getAuthMeController} from "./users/getAuthMeController";
import {blogRepository} from "./blogs/blogRepository";
import {postRepository} from "./posts/postRepository";
import {userRepository} from "./users/userReposetory";
import {commentRepository} from "./comments/commentRepository";
import {commentRouter} from "./comments";
import {registrationController} from "./auth/registrationController";
import {registrationConfirmationController} from "./auth/registrationConfirmationController";
import {
    postRegistrationConfirmationValidator, postRegistrationEmailResendingValidator, postRegistrationEmailValidator,
    postRegistrationLoginValidator,
} from "./auth/middlewares";
import {registrationEmailResendingController} from "./auth/registrationEmailResending";

export const app = express()
app.use(express.json())

app.delete('/testing/all-data', (req, res) => {
    setDB();
    blogRepository.drop();
    postRepository.drop();
    userRepository.drop();
    commentRepository.drop();
    res.status(204).json([])
});
app.post('/auth/login', ...authInputValidator, inputCheckErrorsMiddleware, authService);
app.get('/auth/me', authJWTMiddleware, getAuthMeController);
app.post('/auth/registration', postRegistrationEmailValidator, postRegistrationLoginValidator, inputCheckErrorsMiddleware, registrationController);
app.post('/auth/registration-email-resending', postRegistrationEmailResendingValidator, inputCheckErrorsMiddleware, registrationEmailResendingController);
app.post('/auth/registration-confirmation', postRegistrationConfirmationValidator, inputCheckErrorsMiddleware, registrationConfirmationController);
app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.COMMENTS, commentRouter);
