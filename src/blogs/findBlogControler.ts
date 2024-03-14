import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogRepository} from "./blogRepository";
import {ObjectId} from "mongodb";

export const findBlogController = async (req: Request<any, any, {id: string}>, res: Response<BlogDBType | {}>) => {
    const blog = await blogRepository.find(new ObjectId(req.params.id));
    if(!blog) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(blog);
}