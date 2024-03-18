import {Request, Response} from 'express';
import {BlogType, InputBlogType} from "../input-output-types/blog-types";
import {blogRepository} from "./blogRepository";

export const createBlogController = async (req: Request<any, any, InputBlogType>, res: Response<BlogType | {}>) => {
    const createdInfo = await blogRepository.create(req.body)
    if(!createdInfo.id) {
        res.status(500).json({});
        return;
    }

    const newBlog = await blogRepository.find(createdInfo.id);

    res.status(201).json(newBlog);
}