import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogCollection} from "../db/mongo-db";

export const getBlogsController = async (req: Request, res: Response<BlogDBType[]>) => {
    const data = blogCollection.find({});
    const result = await data.toArray();
    const mappedData = result.map(({name, description, websiteUrl, createdAt, isMembership, _id}) => ({
        name, description, websiteUrl, createdAt, isMembership, id: _id
    }))
    res.status(200).json(mappedData as any);
}