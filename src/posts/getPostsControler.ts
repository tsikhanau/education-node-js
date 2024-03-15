import {Request, Response} from 'express';
import {postCollection} from "../db/mongo-db";
import {PostType} from "../input-output-types/post-types";
import {PostDBType} from "../db/posts-db-types";

export const getPostController = async (req: Request, res: Response<PostType[]>) => {
    const data = postCollection.find({});
    const result = await data.toArray() as unknown as PostDBType[];
    const mappedData: PostType[] = result.map(({blogId, blogName, content, createdAt, shortDescription, _id, title}) => ({
        blogId, blogName, content, createdAt, shortDescription, title, id: _id
    }))
    res.status(200).json(mappedData);
}