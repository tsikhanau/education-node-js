import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogCollection} from "../db/mongo-db";

export const getBlogsController = async (req: Request, res: Response<BlogDBType[]>) => {
    const result = blogCollection.find({});
    res.status(200).json(await result.toArray() as unknown as BlogDBType[]);
}