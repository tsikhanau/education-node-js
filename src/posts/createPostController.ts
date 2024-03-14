import {postRepository} from "./postRepository";
import {InputPostType} from "../input-output-types/post-types";
import {Request, Response} from 'express';

export const createPostController = async (req: Request<any, any, InputPostType>, res: Response) => {
    const createdInfo = await postRepository.create(req.body)
    if(!createdInfo.id) {
        res.status(500).json({});
        return;
    }
    const newPost = await postRepository.find(createdInfo.id);
    res.status(201).json(newPost);
}