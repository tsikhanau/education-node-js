import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";
import {ObjectId} from "mongodb";
import {postRepository} from "./postRepository";

export const findPostController = async (req: Request<any, any, {id: string}>, res: Response<PostDBType | {}>) => {
    const post = await postRepository.find(new ObjectId(req.params.id));
    if(!post) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(post);
}