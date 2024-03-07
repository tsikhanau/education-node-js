import {postRepository} from "./postRepository";
import {Request, Response} from 'express';
import {PostDBType} from "../db/posts-db-types";

export const findPostController = async (req: Request<any, any, {id: string}>, res: Response<PostDBType | {}>) => {
    const post = await  postRepository.find(+req.params.id);
    if(!post) {
        res.status(404).json({});
        return;
    }

    res.status(200).json(post);
}