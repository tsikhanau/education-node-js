import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogRepository} from "./blogRepository";

export const findBlogController = async (req: Request<any, any, {id: string}>, res: Response<BlogDBType | {}>) => {
    const post = await  blogRepository.find(+req.params.id);
    if(!post) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(post);
}