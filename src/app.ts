import express from 'express'
import {SETTINGS} from "./settings";
import {blogsRouter, postsRouter, videosRouter} from "./videos";
import {setDB} from "./db/db";

export const app = express()
app.use(express.json())

app.delete('/testing/all-data', (req, res) => {
    setDB();
    res.status(204).json([])
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.BLOGS, blogsRouter);