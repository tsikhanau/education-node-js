import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {postCollection} from "../db/mongo-db";

export const getPostController = async (req: Request, res: Response<PostDBType[]>) => {
    const data = postCollection.find({});
    const result = await data.toArray();
    const mappedData = result.map(({blogId, blogName, content, createdAt, shortDescription, _id, title}) => ({
        blogId, blogName, content, createdAt, shortDescription, title, id: _id
    }))
    res.status(200).json(mappedData as any);
}