import express from 'express'
import {SETTINGS} from "./settings";
import {videosRouter} from "./videos";
import {setDB} from "./db/db";
import {postsRouter} from "./posts";
import {blogsRouter} from "./blogs";
import {blogCollection, postCollection, userCollection} from "./db/mongo-db";
import {usersRouter} from "./users";
import {authService} from "./users/authService";
import {authInputValidator} from "./users/middlewares";
import {authMiddleware, inputCheckErrorsMiddleware} from "./posts/middlewares";

export const app = express()
app.use(express.json())

app.delete('/testing/all-data', (req, res) => {
    setDB();
    blogCollection.drop();
    postCollection.drop();
    userCollection.drop();
    res.status(204).json([])
})
app.post('/auth/login', ...authInputValidator, inputCheckErrorsMiddleware, authService),
app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
