import {postRepository} from "../posts/postRepository";
import {InputPostType} from "../input-output-types/blog-types";
import {Request, Response} from 'express';
import {blogCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";

export const createBlogPostController = async (req: Request<any, any, InputPostType, {blogId: string}>, res: Response) => {
    const {blogId} = req.params;
    const blog = await blogCollection.findOne({_id: new ObjectId(blogId)});
    if(!blog) {
        res.status(404).json({});
        return;
    }
    const createdInfo = await postRepository.create({...req.body, blogId});
    if(!createdInfo.id) {
        res.status(500).json({});
        return;
    }
    const newPost = await postRepository.find(createdInfo.id);
    res.status(201).json(newPost);
}