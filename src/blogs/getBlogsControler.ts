import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogCollection} from "../db/mongo-db";
import {BlogType} from "../input-output-types/blog-types";

export const getBlogsController = async (req: Request, res: Response<BlogType[]>) => {
    const data = blogCollection.find({});
    const result = await data.toArray() as unknown as BlogDBType[];
    const mappedData: BlogType[] = result.map(({name, description, websiteUrl, createdAt, isMembership, _id}) => ({
        name, description, websiteUrl, createdAt, isMembership, id: _id
    }))
    res.status(200).json(mappedData);
}