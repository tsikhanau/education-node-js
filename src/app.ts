import express from 'express'
import {SETTINGS} from "./settings";
import {videosRouter} from "./videos";
import {setDB} from "./db/db";
import {postsRouter} from "./posts";
import {blogsRouter} from "./blogs";

export const app = express()
app.use(express.json())

app.delete('/testing/all-data', (req, res) => {
    setDB();
    res.status(204).json([])
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.BLOGS, blogsRouter);