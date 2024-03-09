import {db} from '../db/db'
import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";

export const getBlogsController = async (req: Request, res: Response<BlogDBType[]>) => {
    res.status(200).json(db.blogs);
}