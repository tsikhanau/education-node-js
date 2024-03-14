import {db} from '../db/db'
import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {postCollection} from "../db/mongo-db";

export const getPostController = async (req: Request, res: Response<PostDBType[]>) => {
    const result = postCollection.find({});
    res.status(200).json(await result.toArray() as unknown as PostDBType[]);
}