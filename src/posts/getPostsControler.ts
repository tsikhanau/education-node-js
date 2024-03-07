import {db} from '../db/db'
import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";

export const getPostController = async (req: Request, res: Response<PostDBType[]>) => {
    res.status(200).json(db.posts);
}