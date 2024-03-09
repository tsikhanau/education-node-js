import {Request, Response} from 'express';
import {InputBlogType} from "../input-output-types/blog-types";
import {BlogDBType} from "../db/blogs-db-types";
import {blogRepository} from "./blogRepository";

export const updateBlogController = async (req: Request<any, any, InputBlogType,{id: string}>, res: Response<BlogDBType | {}>) => {
    const result = await  blogRepository.update(+req.params.id, req.body);
    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}